var LCD = require('jsupm_i2clcd');


/************************************** setLCDMessage **************************************/
/*
Plug LCD screen into I2C

Displays "envisensor" on the screen.

Requires external power or the text will not be displayed. 

For example: http://165.106.xxx.xx:3000/setLCDMessage 

*/

function LCDScreen(req, res) {
	var input = req.query.input;
	// Initialize Jhd1313m1 at 0x62 (RGB_ADDRESS) and 0x3E (LCD_ADDRESS) 
	var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);
	//to display text needs to have external power 
	myLcd.setCursor(0,0);
	// RGB Blue
	//myLcd.setColor(53, 39, 249);
	// RGB Red
	myLcd.setColor(255, 0, 0);
	myLcd.write(input);  
}

/************************************** setRelayOn **************************************/
/*
Plug relay into digital pin 5

Turns relay on and returns "Relay is on". 

For example: http://165.106.xxx.xx:3000/setRelayOn
For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-relay
*/
function relayOn(req, res) {

	// Create the relay switch object using GPIO pin 5
	var relay = new groveSensor.GroveRelay(5);
	relay.on();
  	res.send('Relay is on');
}

/************************************** setRelayOff **************************************/
/*
Plug relay into digital pin 5

Turns relay off and returns "Relay is on". 

For example: http://165.106.xxx.xx:3000/setRelayOff

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-relay
*/

function relayOff(req, res) {

	// Create the relay switch object using GPIO pin 5
	var relay = new groveSensor.GroveRelay(5);
	relay.off();
  	res.send('Relay is off');
}

/************************************** initialise module functions **************************************/

module.exports.setLCDDisplay = LCDScreen;
module.exports.setRelayOn = relayOn;
module.exports.setRelayOff = relayOff;