// Set up modules 
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

/********************************* CONSTANTS/VARIABLES ***********************************/
var RESPONSE = new Buffer( "THIS IS A MESSAGE FROM THE EDISON" );
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

 /************************* LISTENING FOR MESSAGE & SENDING REPLY ***********************/
 // Receiving a message 
 server.on("message", function (msg, rinfo) {
    console.log("Message = " + msg + " from " + rinfo.address + ":" + rinfo.port);

    // Sending a response back 
    // Buffer offset = 0 
    /*
	server.send(RESPONSE, 0, RESPONSE.length, rinfo.port, rinfo.address, function( error, byteLength ) {
		console.log( "... Sent response to " + rinfo.address + ":" + rinfo.port );
	});
*/
	server.send(RESPONSE, 0, RESPONSE.length, UDPPORT, rinfo.address, function( error, byteLength ) {
		console.log( "... Sent response to " + rinfo.address + ":" + UDPPORT);
	});
 });