// There's a switch right next to aio pin 0, flip this to 5V otherwise screen will not display words. 

var LCD = require('jsupm_i2clcd');
var groveSensor = require('jsupm_grove');
var upmBuzzer = require("jsupm_buzzer");
var servoModule = require("jsupm_servo");

/************************************** displayIPAddress **************************************/

function ipAddress(req, res) {
 
 // Initialize Jhd1313m1 at 0x62 (RGB_ADDRESS) and 0x3E (LCD_ADDRESS) 
 	var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);
 
 	//to display text needs to have external power 
 
 	myLcd.setCursor(0,0);
 	myLcd.setColor(53, 39, 249);
 	myLcd.write('envisensor');  
 	myLcd.setCursor(1,0);
 	myLcd.write('10.0.0.131:3000');
   	res.send('The IP address: 10.0.0.131' + "\n" + 'port: 3000');
 };

/************************************** setLCDMessage **************************************/

function LCDScreen(req, res) {
 
 // Initialize Jhd1313m1 at 0x62 (RGB_ADDRESS) and 0x3E (LCD_ADDRESS) 
 	var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);
    var display = req.query.display
    var R = req.query.R
    var G = req.query.G
    var B = req.query.B
    
 	//to display text needs to have external power 
 
 	myLcd.setCursor(0,0);
 	myLcd.setColor(parseInt(R), parseInt(G), parseInt(B));
 	myLcd.write(display);  
   	res.send('LCDMessage set');
 };


/************************************** setRelayOn **************************************/
/*
For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-relay
*/

function relay(req, res) {
    var state = req.query.state;
    var digitalPin = req.query.digitalPin; //query for pin number 
	var relay = new groveSensor.GroveRelay(parseInt(digitalPin)); // initialising sensor on specified pin 
    
    if (state == 'on'){
        relay.on();
		res.send("Relay is on");
	}
	else if (state == 'off'){
        relay.off();
		res.send("Relay is on");
	}
	else {
		res.send ("Sorry your input was not valid")
	}
}


/************************************** Buzzer **************************************/
/*
For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-buzzer
*/

function buzzer(req, res) {
    var state = req.query.state;
    var digitalPin = req.query.digitalPin; //query for pin number 
    var tone = req.query.tone; // specify note
    var volume = req.query.volume;
    var myBuzzer = new upmBuzzer.Buzzer(parseInt(digitalPin)); // initialising sensor on specified pin
    var note = parseInt(upmBuzzer.tone);

    if (state == 'on'){
        myBuzzer.playSound(note,0);
        
		res.send("Buzzer is on and is playng note " + tone);
	}
	else if (state == 'off'){
        myBuzzer.stopSound();
		res.send("Buzzer is off");
	}
	else {
		res.send ("Sorry your input was not valid")
	}
    
}

/************************************** Servo **************************************/
/*
For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/es08a-servo
*/

function servo (req, res) {
    var digitalPin = req.query.digitalPin; //query for pin number
    var angle = req.query.angle; // query for setting angle 
    var servo = new servoModule.ES08A(parseInt(digitalPin));
    servo.setAngle(parseInt(angle));
    res.send ("Servo set to angle " + angle);
}

/************************************** initialise module functions **************************************/

module.exports.setLCDDisplay = LCDScreen;
module.exports.displayIPAddress = ipAddress;
module.exports.setRelayState = relay;
module.exports.setBuzzer = buzzer;
module.exports.setServo = servo;