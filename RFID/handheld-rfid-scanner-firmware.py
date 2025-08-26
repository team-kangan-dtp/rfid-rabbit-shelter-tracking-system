from machine import Pin, SPI, I2C, ADC, PWM
from mfrc522 import MFRC522
from ssd1306 import SSD1306_I2C
import time
import network
import urequests
import sys
import ntptime
import gc
import ujson
from micropython import const

# ---------------------------------------------------
# Configuration
# ---------------------------------------------------
# WiFi credentials
ssid = 'CyFi'
password = 'SecurityA40'

# Supabase details
SUPABASE_URL = "http://10.52.126.2:8000" #"http://a824-115-124-9-69.ngrok-free.app"
API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQxNzc0MDAwLCJleHAiOjIwMDAwMDAwMDB9.F_gyMhCfM6RuvLkwJn-BK62Wev2nRZAKdej6r43fT9Q"

headers = {
	"apikey": API_KEY,
	"Authorization": "Bearer " + API_KEY,
	"Content-Type": "application/json"
}

# Use const for memory efficiency
AUTH_TIMEOUT = const(30)  # How long until the user is logged out in seconds
PIX_RES_X = const(128)
PIX_RES_Y = const(64)

# String constants
MSG_SCAN_ACCESS_CARD = "Scan access card"
MSG_TO_BEGIN_SCANNING = "to begin scanning"
MSG_READY_TO_SCAN = "Ready to scan"


# ---------------------------------------------------
# Global variables for authentication
# ---------------------------------------------------
last_activity_time = 0 # Time of last successful authentication or scan
user_id = "" # SYSTEM: user ID
user_rfid = "" # SYSTEM: user RFID tag
user_authenticated = False # SYSTEM: Flag to track user authentication status


# ---------------------------------------------------
# Hardware initialization
# ---------------------------------------------------

# Initialize OLED display
i2c_dev = I2C(1,scl=Pin(27),sda=Pin(26))  # start I2C on I2C1 (GPIO 26/27)
i2c_addr = i2c_dev.scan() # get I2C address
if not i2c_addr:
	print('No I2C Display Found') 
	sys.exit() # exit routine if no dev found
else:
	print("I2C Address      : {}".format(hex(i2c_addr[0]))) # I2C device address
	print("I2C Configuration: {}".format(i2c_dev)) # print I2C params


oled = SSD1306_I2C(PIX_RES_X, PIX_RES_Y, i2c_dev) # oled controller

def display_message(line1, line2=None, duration=0):
	"""Helper function to display messages on the OLED."""
	oled.fill(0)
	oled.text(line1, 0, 10)
	if line2 is not None:
		oled.text(line2, 0, 30)
	else:
		# Clear the second line if it's not used
		oled.fill_rect(0, 30, PIX_RES_X, 20, 0)
	oled.show()
	if duration > 0:
		time.sleep(duration)

# Connect to WiFi
station = network.WLAN(network.STA_IF)
station.active(True)
if not station.isconnected():
	station.connect(ssid, password)
	display_message("Connecting to", "WiFi...")
	while not station.isconnected():
		print("Connecting to WiFi...")
		time.sleep(1)
print("Connected:", station.ifconfig())
display_message("WiFi Connected!", duration=2)

# Initialize RFID reader
rdr = MFRC522(sck=18, mosi=19, miso=16, rst=22, cs=5)


# Set up buzzer PWM
buzzer = PWM(Pin(28))  # Pin 28 for buzzer
buzzer.freq(1000)  # Set initial frequency
buzzer.duty_u16(0)  # Start with buzzer off

# Set up red and green LEDs
red_led = Pin(2, Pin.OUT)
green_led = Pin(3, Pin.OUT)

# Function to set status of LEDs
def set_leds(red=False, green=False):
	"""Set the status of red and green LEDs."""
	red_led.value(1 if red else 0)
	green_led.value(1 if green else 0)

# Function to play a sound on the buzzer
def play_sound(frequency=1000, duration=500):
	"""Play a sound on the buzzer."""
	buzzer.freq(frequency)
	buzzer.duty_u16(512)  # Set duty cycle to 50%
	time.sleep_ms(duration)
	buzzer.duty_u16(0)  # Stop the buzzer

set_leds(red=True)

# ---------------------------------------------------
# Software initialization
# ---------------------------------------------------

# Synchronize time with NTP server
try:
	display_message("Syncing time...")
	ntptime.host = "time.google.com"  # Set the NTP server
	ntptime.settime()
	print("Time synchronized")
except Exception as e:
	print("Time sync failed:", e)
	display_message("Time sync failed", duration=2)


# ---------------------------------------------------
# Main program logic
# ---------------------------------------------------

# Helper function to get current time in ISO 8601 format
def get_iso_timestamp():
	t = time.localtime()
	# Using f-string for slightly better performance and readability
	return f"{t[0]:04d}-{t[1]:02d}-{t[2]:02d}T{t[3]:02d}:{t[4]:02d}:{t[5]:02d}Z"

# Generic function to handle Supabase requests
def supabase_request(method, url, payload=None):
	res = None
	gc.collect()  # Free up memory before the request
	try:
		if method.upper() == 'POST':
			res = urequests.post(url, headers=headers, data=ujson.dumps(payload))
		else: # Default to GET
			res = urequests.get(url, headers=headers)

		status_code = res.status_code
		print(f"Request to {url} finished with status: {status_code}")

		if not (200 <= status_code < 300):
			display_message("HTTP error", f"Code: {status_code}", duration=2)
			return None

		# For successful POST with no content or GET with empty content
		if status_code == 204 or res.content is None or len(res.content) == 0:
			return True if method.upper() == 'POST' else []

		# Directly parse from content bytes to avoid creating a string copy with .text
		json_data = ujson.loads(res.content)
		return json_data

	except Exception as e:
		print(f"Request failed: {e}")
		display_message("Request failed", duration=2)
		return None
	finally:
		if res:
			res.close()
		gc.collect() # Free up memory after the request is handled

# Function to authenticate user by RFID tag
def authenticate_user(rfid_str):
	"""Authenticate user by RFID tag. Returns (user_id, rfid_str) on success, else (None, None)."""
	url = f"{SUPABASE_URL}/rest/v1/user?rfid_tag=eq.{rfid_str}&select=id,first_name"
	data = supabase_request("GET", url)
	if data and isinstance(data, list) and len(data) > 0:
		user_id = data[0].get('id')
		first_name = data[0].get('first_name', 'there')
		print(f"Found user ID: {user_id}, Name: {first_name}")
		return user_id, first_name, rfid_str
	print("No matching user found.")
	display_message("User not found", duration=2)
	return None, None, None

# Function to query Supabase animal table for matching RFID
def get_animal_by_rfid(rfid_str):
	"""Query Supabase animal table for matching RFID"""
	url = f"{SUPABASE_URL}/rest/v1/animal?rfid_tag=eq.{rfid_str}&select=id,name,species,breed"
	data = supabase_request("GET", url)
	if data and isinstance(data, list) and len(data) > 0:
		animal_id = data[0].get('id')
		name = data[0].get('name', 'No Name')
		species = data[0].get('species', 'No species')
		breed = data[0].get('breed', 'No breed')
		print(f"Found animal ID: {animal_id}")
		return {
			'animal_id': animal_id,
			'name': name,
			'species': species,
			'breed': breed
		}
	
	print("No matching animal found.")
	display_message("Animal not found", duration=2)
	return None

# Function to log RFID scan in Supabase
def log_scan(animal_id, rfid_tag = None):
	"""Insert a new row in rfid_scan_log"""
	global user_id
	url = f"{SUPABASE_URL}/rest/v1/rfid_log"
	payload = {
		"animal_id": animal_id,
		"rfid_tag": rfid_tag,
		"user_id": user_id,
		"scan_time": get_iso_timestamp()
	}
	success = supabase_request("POST", url, payload)
	if success:
		print("Scan logged successfully.")
		set_leds(green=True)
		play_sound(1000, 500)  # Play success sound
		display_message("Scan logged!", duration=1)
	else:
		print("Failed to log scan.")
		# The error message is already displayed by supabase_request

# ---------------------------------------------------
# Core loop functions
# ---------------------------------------------------

# The main loop to scan for RFID tags and process them
def main_loop():
	"""Main loop to scan for RFID tags and process them."""
	global user_authenticated, last_activity_time, user_id, user_rfid

	# Initial state message
	set_leds(red=True)
	print("Scan your access card to begin...")
	display_message(MSG_SCAN_ACCESS_CARD, MSG_TO_BEGIN_SCANNING)

	while True:
		gc.collect() # Collect garbage at the start of the loop
		# Check for authentication timeout
		if user_authenticated and (time.time() - last_activity_time > AUTH_TIMEOUT):
			user_authenticated = False
			user_id = ""
			user_rfid = ""
			print("Authentication timed out.")
			display_message("Session expired", MSG_SCAN_ACCESS_CARD, duration=2)
			set_leds(red=True)

			# After timeout, go back to initial state message
			display_message(MSG_SCAN_ACCESS_CARD, MSG_TO_BEGIN_SCANNING)

		# Probe for RFID tags
		(status, tag_type) = rdr.request(rdr.REQIDL)

		# If a tag is detected, read its UID
		if status == rdr.OK:
			(status, uid) = rdr.anticoll(rdr.PICC_ANTICOLL1)

			# If UID is successfully read, process it
			if status == rdr.OK:
				rfid_str = ''.join(map(str, uid))
				print("Scanned RFID:", rfid_str)
	
				display_message("Loading...")
				
				# If user is not authenticated, attempt to authenticate
				if not user_authenticated:
					auth_user_id, auth_user_first_name, auth_user_rfid = authenticate_user(rfid_str)

					# If authentication is successful, set user_id and user_authenticated
					if auth_user_id:
						user_id = auth_user_id
						user_rfid = auth_user_rfid # Store user's RFID
						user_authenticated = True
						last_activity_time = time.time() # Reset activity timer
						print("User authenticated successfully.")
						set_leds(green=True)
						play_sound(500, 500)  # Play success sound
						display_message(f"Hi {auth_user_first_name}", MSG_READY_TO_SCAN, duration=2)
					else:
						print("User authentication failed.")
						set_leds(red=True)

						# Message already displayed by authenticate_user
						display_message(MSG_SCAN_ACCESS_CARD, MSG_TO_BEGIN_SCANNING)
					continue # Wait for next scan
				
				# If user is authenticated, proceed to allow scans
				if user_authenticated:
					# Reset activity timer on any scan while authenticated
					last_activity_time = time.time()

					# Check if the scanned tag is the user's own tag again (logout)
					if rfid_str == user_rfid:
						print("Same user tag scanned. Logging out.")
						set_leds(red=False, green=False)
						display_message("Logging out...", duration=1)
						user_authenticated = False
						user_id = ""
						user_rfid = ""
						set_leds(red=True)
						display_message(MSG_SCAN_ACCESS_CARD, MSG_TO_BEGIN_SCANNING)
						continue
					
					# If authenticated, check if the scanned tag matches an animal
					set_leds(red=True)
					animal = get_animal_by_rfid(rfid_str)
					if animal:
						display_message("Animal found", f"ID: {animal['animal_id']}", duration=1)
						display_message("Logging scan...")
						log_scan(animal['animal_id'])
						display_message("Name: " + animal['name'],
									   	"Species: " + animal['species'],
										duration=5
						)
					else:
						# Explicitly handle case where animal is not found
						display_message("Animal tag not found, logging empty scan", duration=2)
						log_scan(None, rfid_tag=rfid_str)


					# Reset for next scan
					set_leds(green=True)
					print("\nScan an animal RFID tag...")
					display_message(MSG_READY_TO_SCAN, "an animal tag.")


if __name__ == "__main__":
	try:
		main_loop()
	except KeyboardInterrupt:
		print("Program stopped.")
		display_message("Program stopped.")
	finally:
		# Optional: Clean up resources
		station.disconnect()
		station.active(False)
		oled.poweroff()
		set_leds(red=False, green=False)
		buzzer.deinit()  # Stop the buzzer
		print("Cleaned up resources.")
