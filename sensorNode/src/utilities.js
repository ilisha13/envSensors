
var dgram = require('dgram');
var util = require('util');
var prompt = require('prompt'); /* NPM Module to handle keyboard input. npm install prompt */
 
/* Setup the Socket for UDP and set up the message buffer as well */
var client = dgram.createSocket('udp4');

console.log('-----------------------------------------------');
console.log('|           Node  UDP Sender                  |');
console.log('-----------------------------------------------');          

/* Get user input */
prompt.start();

prompt.get(['ipAddress', 'portNum', 'message'], function (err, result) {
    if (err) { return onPromptErr(err); }
    console.log('ipAddress: ' + result.ipAddress);
    console.log('portNum  : ' + result.portNum);
    console.log('message  " ' + result.message);
    console.log('message length = ' + result.message.length);
    
    /* Now send the message out */

    client.send(result.message, 0, result.message.length , result.portNum, result.ipAddress, function (err, data) {
        if (err) {
            /* We got a send error */
            console.log("Error = ", err);
            client.close();
        }
        else {
            /* Successfully sent! */
            console.log('Message sent to ', result.ipAddress, ' on port # ', result.portNum);
            client.close();
        }
    });
}); 

/********************  Functions **************************/

function onPromptErr(err) {
    console.log(err);
    return 1;
}


 
