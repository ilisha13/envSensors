import socket
import sys

# Create a UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

server_address = ('localhost', 10000)
message = 'Hello from Ilisha computer'

try:

    # Send data
    print ("sending")
    sent = sock.sendto(str.encode(message), server_address)

    # Receive response
    print ('waiting to receive')
    data, server = sock.recvfrom(4096)
    data = data.decode('utf-8')
    print ('received "%s"' % data)

finally:
    print ('closing socket')
    sock.close()