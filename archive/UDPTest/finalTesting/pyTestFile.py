
# http://www.binarytides.com/python-socket-programming-tutorial/
#http://www.binarytides.com/programming-udp-sockets-in-python/
# Send UDP broadcast packets

import sys, time
from socket import *
from _thread import *

# ********************************* CONSTANTS/VARIABLES ***********************************
HOST = ''                 # Symbolic name meaning all available interfaces
UDPPORT = 10000           # Arbitrary non-privileged port
MESSAGE = "HELLO THIS IS THE PC TALKING TO THE EDISON " 
UDPDELAY = 2

# ********************************* DEFINE FUNCTIONS **************************************
#always running so what happens when you receive 

def UDPBroadcastThread(udpport, message, delay):
    while 1:
        broadcastMessage(str(message), udpport, delay)

def UDPRecieverThread(dummy):
    #UDPSock.listen(2)
    #conn, addr = UDPSock.accept()
    print ("Inside reciever thread")
    while 1: 
        data, server = UDPSock.recvfrom(4096)
        print("Data recieved: " + str(data))
        print("IP Address of Edison: " + str(server))

def broadcastMessage(messageToSend, udpport, delay):
    print("Broadcasting... " + messageToSend + "...")
    data = str.encode(messageToSend)
    #UDPSock.sendto(data, ('<broadcast>', udpport))
    UDPSock.sendto(data, ('192.168.1.120', udpport))
    #UDPSock.sendto(data, ('165.106.118.121', udpport))
    time.sleep(delay)

# ********************************* CODE BEGINS *****************************************

# Setting up the UDP broadcast socket 
UDPSock = socket(AF_INET, SOCK_DGRAM)
UDPSock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
UDPSock.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
#UDPSock.bind((HOST, UDPPORT))
#UDPSock.listen(1)

# Start threads 
#start_new_thread(UDPBroadcastThread,(UDPPORT,MESSAGE,UDPDELAY))
start_new_thread(UDPRecieverThread,("Hello",))


while 1:
    # Broadcasting the TCPPORT via UDP to all listening Edisons 
    #broadcastMessage(str(TCPPORT))

    # Wait for a TCP connection from an Edison 
    #conn, addr = TCPSock.accept()
    time.sleep(2)
    print("in while loop...")
