// Get our Datagram library and create our UDP socket; I
// think you can think of this as being somewhat akin to Java's
// java.net.DatagramSocket library.
var socket = require( "dgram" ).createSocket( "udp4" );
var net = require('net');


// Listen for message events on the socket.
socket.on(
	"message",
	function ( message, requestInfo ) {

		// Log the received message.
		console.log(
			"Message: " + message + " from " +
			requestInfo.address + ":" + requestInfo.port
		);


		var response = new Buffer( "This is sent to edison" );

		// Send a response. Note that this is entirely optional.
		// The client (ColdFusion) is not waiting for a response
		// [necessarily]. This is an independent action and will
		// not hold up the client's message.
		socket.send(
			response,
			0, // Buffer offset
			response.length,
			requestInfo.port,
			requestInfo.address,
			function( error, byteLength ) {

			console.log( "... Sent response to " + requestInfo.address + ":" + requestInfo.port );

			}
		);
	}
);


// Listen for error events on the socket. When we get an error, we
// want to be sure to CLOSE the socket; otherwise, it's possible that
// we won't be able to get it back without restarting the process.
socket.on(
	"error",
	function ( error ) {

		socket.close();

	}
);


// When the socket is configured and ready to receive data, simply
// log a confirmation to the console.
socket.on(
	"listening",
	function () {

		var address = socket.address();

		console.log( "socket listening " + address.address + ":" + address.port );

	}
);


// Start listening on the given port. Since we are not binding to
// an explicit address [just a port], Node.js will aattempt to listen
// to all addresses on the machine.
socket.bind( 10000 );