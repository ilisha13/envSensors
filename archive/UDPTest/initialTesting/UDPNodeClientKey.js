var keypress = require('keypress');

/*
var PORT = 10000;
var HOST = '10.0.0.152';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');
 
// make `process.stdin` begin emitting "keypress" events 
keypress(process.stdin);
var client = dgram.createSocket('udp4');

process.stdin.on('keypress', function (ch, key) {

	message = new Buffer(key.name);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    //client.close();
	});

  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
  	client.close();

    process.stdin.pause();
  }
});
*/


var PORT = 10000;
var HOST = '10.0.0.152';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');
// make `process.stdin` begin emitting "keypress" events 
keypress(process.stdin);
 
// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {

	message = key.name;
	//messageInText = String.fromCharCode(message);

	console.log("this is message:", message);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    //client.close();
	});


	
  //console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
  	client.close();
    process.stdin.pause();
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();