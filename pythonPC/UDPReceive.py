# Sample code to setup a local UDP listener or a specific port, and then
# display a response to any received data.

import socket
MY_IP = '10.0.0.152' #add your IP address or change to local host
MY_PORT = 10000

# Open the socket and set it to UDP
sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM) # UDP

# Bind the socket. There is not error checking, so if there is no
# IP address this code will puke on you. We should add some exception
# handling code here.

sock.bind((MY_IP, MY_PORT))

# Now go into a while lop, waiting for a response 

while True:
    data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
    print ("received message:", data)