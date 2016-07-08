
// add comments to each line 


var dgram = require("dgram");
//set up server code to listen and recieve messages from broadcast client 
 var server = dgram.createSocket("udp4");

 server.on("message", function (msg, rinfo) {
   console.log("server got: " + msg + " from " +
     rinfo.address + ":" + rinfo.port);
 });

 server.on("listening", function () {
   var address = server.address();
   console.log("server listening " + address.address + ":" + address.port);

   // Add client code to send a response back to the UDP broadcaster, sending the Name of the device
   // IP Address and Port Number

 });

 server.bind(10000);