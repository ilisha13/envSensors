var dgram = require('dgram');
var responseBuffer = new Buffer( "THIS IS A MESSAGE FROM THE EDISON" );
var client = dgram.createSocket('udp4');
client.send(responseBuffer, 0, responseBuffer.length, 10000, '10.0.0.152', (err) => {
	console.log("Sent message")
  client.close();
});