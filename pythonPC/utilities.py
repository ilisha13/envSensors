# Sample code to setup a local UDP listener or a specific port, and then
# display a response to any received data.

import socket

print ('-----------------------------------------------')
print ('|           Python UDP Listener               |')
print ('-----------------------------------------------')            

# Open the socket and set it to UDP
sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM) # UDP
ipAddress = input('Please enter your IP address: ')
portNum = input('Please enter the port number you want to listen on: ')

# Bind the socket. There is no error checking, so if there is no
# IP address this code will puke on you. We should add some exception
# handling code here.

#sock.bind((MY_IP, MY_PORT))
sock.bind((ipAddress, int(portNum)))


print ("Waiting for message ...")

# Now go into a while lop, waiting for a response 

while True:
    data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
    print ("received message:", data)