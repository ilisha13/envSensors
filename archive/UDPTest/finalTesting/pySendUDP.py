import socket

UDP_IP = '10.0.0.152'
UDP_PORT = 10000
MESSAGE = "Hello from Edisons!"

print ("UDP target IP:", UDP_IP)
print ("UDP target port:", UDP_PORT)
print ("message:", MESSAGE)

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto(str.encode(MESSAGE), (UDP_IP, UDP_PORT))