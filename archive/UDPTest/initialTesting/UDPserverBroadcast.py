# Send UDP broadcast packets

MYPORT = 10000

import sys, time
from socket import *

s = socket(AF_INET, SOCK_DGRAM)
s.bind(('', 0))
s.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

#always running so what happens when you recieve 
while 1:
	#message, address = s.recvfrom(10000)

	if (s.recvfrom(MYPORT) != null, null): 
		message, address = s.recvfrom(MYPORT)
		print ("Got message from %s: %s" % (address, message))
        s.sendto("Hello from server", address)
        print ("Listening for broadcasts...")
    else : 
    	data = str.encode(repr(time.time()) + ' discovering edison' + '\n')
    	s.sendto(data, ('<broadcast>', MYPORT))
    	time.sleep(2)


    # inside while loop check whether recieving on socket

# listen for the message 
