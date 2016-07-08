// Set up modules 
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

/********************************* CONSTANTS/VARIABLES ***********************************/
var responseBuffer = new Buffer( "THIS IS A MESSAGE FROM THE EDISON" );
var UDPPORT = 10000;

/********************************* BINDING TO UDPPORT ***********************************/
 server.bind(UDPPORT);

/************************************* LISTENING *****************************************/
//Listens on port 10000 for message. Logs message into the console, and logs client 
// who sends messages to this port 

 server.on("listening", function () {
   var address = server.address();
   console.log("server listening " + address.address + ":" + address.port);
 });

 /************************* MAIN CODE ***********************/
setInterval(function () { 
	server.send(responseBuffer, 0, responseBuffer.length, UDPPORT, '10.0.0.152', function( error, byteLength ) {
		console.log( "... Sent message to " + '10.0.0.152' + ":" + UDPPORT);
		console.log("This is the error code: " + error);
	});
    console.log('2 seconds passed'); 
}, 2000);

/*
socket.send(msg, [offset, length,] port, address[, callback])#

msg <Buffer> | <String> | <Array> Message to be sent
offset <Number> Integer. Optional. Offset in the buffer where the message starts.
length <Number> Integer. Optional. Number of bytes in the message.
port <Number> Integer. Destination port.
address <String> Destination hostname or IP address.
callback <Function> Called when the message has been sent. Optional.

*/