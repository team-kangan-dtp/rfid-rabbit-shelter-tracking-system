import network
import urequests
import time

# WiFi credentials
ssid = 'CyFi'
password = 'SecurityA40'

station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)

while not station.isconnected():
    print("Connecting...")
    time.sleep(1)

print("Connected:", station.ifconfig())

def post_to_supabase():
    url = "http://10.52.126.2:8000//rest/v1/animal"
    data = {}

    headers = {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQxNzc0MDAwLCJleHAiOjIwMDAwMDAwMDB9.F_gyMhCfM6RuvLkwJn-BK62Wev2nRZAKdej6r43fT9Q",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQxNzc0MDAwLCJleHAiOjIwMDAwMDAwMDB9.F_gyMhCfM6RuvLkwJn-BK62Wev2nRZAKdej6r43fT9Q",
        "Content-Type": "application/json"
    }

    try:
        response = urequests.get(url, json=data, headers=headers)
        print("Recieved:", response.json())
        response.close()
    except Exception as e:
        print("Error:", e)

post_to_supabase()