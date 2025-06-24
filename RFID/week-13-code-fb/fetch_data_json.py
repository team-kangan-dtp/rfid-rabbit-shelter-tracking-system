import network
import time
import urequests

ssid = "CyFi"
password = "SecurityA40"

station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)

while not station.isconnected():
    print("Connecting...")
    time.sleep(1)

print("Connected!", station.ifconfig())

response = urequests.get('http://jsonplaceholder.typicode.com/albums/1')
data = response.json()
response.close()
print(data)