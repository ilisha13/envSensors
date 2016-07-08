/*
 * Author: Ilisha Ramachandran <iramachand@brynmawr.edu>
 *
 * Projcet Title: Intel Edison Environmental Sensing Unit 
 *
 * Institution: Bryn Mawr College 
 *
 * PORT 3000 
 *
 * Eg. http://165.106.xxx.xx:3000/
 *
 * Code taken and modified from https://software.intel.com/en-us/iot/hardware/sensors/
 */

/*************************************** NOTES *********************************************/
// register (what sensors on what ports)
// discovery 
// handshaking
// json  
// configure 
// camera

// Load Grove modules
var groveSensor = require('jsupm_grove')
var grove_moisture = require('jsupm_grovemoisture');
var UVSensor = require('jsupm_guvas12d');
var grove_motion = require('jsupm_biss0001');
var rotaryEncoder = require("jsupm_rotaryencoder");
var LCD = require('jsupm_i2clcd');

// Load Express module 
var express = require('express');
var app = express();

/************************************** helloWorld sample **************************************/
//This is just a tester function when nothing else is called 

app.get('/', function (req, res) {
  res.send('Hello! Welcome to the Intel Edison Environmental Sensing Unit');
});

/************************************** readTemperature **************************************/
/*
Plug temperature sensor into AIO pin 0. 

When user types in the IP address of the respective edison into a browswer with the correct
port and accompanies this wih /readTemperatureC or /readTemperatureF, the temerature in either 
celsius or fahrenheit is returned. 

For example: http://165.106.xxx.xx:3000/readTemperatureC. 

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-temperature-sensor
*/

app.get('/readTemperatureC', function (req, res) {
	// Create the temperature sensor object using AIO pin 0
	// If you want to change the pin number, modify this line. 
	var temp = new groveSensor.GroveTemp(0);
	var celsius = temp.value();
	var fahrenheit = celsius * 9.0/5.0 + 32.0;
	var output = "The temperature is " + celsius 
  	res.send(output);
});

app.get('/readTemperatureF', function (req, res) {
	// Create the temperature sensor object using AIO pin 0
	// If you want to change the pin number, modify this line. 
	var temp = new groveSensor.GroveTemp(0);
	var celsius = temp.value();
	var fahrenheit = celsius * 9.0/5.0 + 32.0;
	var output = "The temperature is " + fahrenheit 
  	res.send(output);
});

/************************************** readMoisture **************************************/
/*
Plug moisture sensor into AIO pin 1 

When user types in the IP address of the respective edison into a browswer with the correct
port, and accompanies this wih /readMoisture, the moisture value and whether it is wet, moist,
or dry is returned. 

For example: http://165.106.xxx.xx:3000/readMoisture. 

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-moisture-sensor
*/

app.get('/readMoisture', function (req, res) {

	// Moisture sensor in AIO pin 1 
	// If you want to change the pin number, modify this line.
	var myMoistureObj = new grove_moisture.GroveMoisture(1);

	// Values (approximate):
	// 0-300,   sensor in air or dry soil
	// 300-600, sensor in humid soil
	// 600+,    sensor in wet soil or submerged in water
	// Read the value every second and print the corresponding moisture level

	var result;
	var moisture_val = parseInt(myMoistureObj.value());

	if (moisture_val >= 0 && moisture_val < 300)
		result = "Dry";
	else if (moisture_val >= 300 && moisture_val < 600)
		result = "Moist";
	else
		result = "Wet";
		
	var output = "Moisture value: " + moisture_val + ", " + result;

	res.send(output);
});

/************************************** readLightLevel **************************************/

app.get('/readLightLevel', function (req, res) {
  	res.send('readLightLevel');
});

/************************************** readUVLevel **************************************/
/*
Plug UV sensor into AIO pin 2 

Returns UV value
Eg. http://165.106.xxx.xx:3000/readUVLevel 

For more information, please visit: 
//https://software.intel.com/en-us/iot/hardware/sensors/grove-uv-sensor
*/

app.get('/readUVLevel', function (req, res) {
	// Instantiate a UV sensor on analog pin A0
	var myUVSensor = new UVSensor.GUVAS12D(2);

	// analog voltage, usually 3.3 or 5.0
	var g_GUVAS12D_AREF = 5.0;
	var g_SAMPLES_PER_QUERY = 1024;

	var output = "AREF: " + g_GUVAS12D_AREF + ", Voltage value (higher means more UV): " + roundNum(myUVSensor.value(g_GUVAS12D_AREF, g_SAMPLES_PER_QUERY), 6);
	
	function roundNum(num, decimalPlaces){
		var extraNum = (1 / (Math.pow(10, decimalPlaces) * 1000));
		return (Math.round((num + extraNum) * (Math.pow(10, decimalPlaces))) / Math.pow(10, decimalPlaces));
	}

  	res.send(output);
});

/************************************** readPIRMotion **************************************/
/*
Plug motion sensor into Digital pin 4 

Detects motion.

For example: http://165.106.xxx.xx:3000/readPIRMotion

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/biss0001-motion-sensor
*/

app.get('/readPIRMotion', function (req, res) {

	// Instantiate a Grove Motion sensor on GPIO pin D4
	var myMotionObj = new grove_motion.BISS0001(4);
	var output;
	if (myMotionObj.value())
		output = "Detecting moving object";
	else
		output = "No moving objects detected";

  	res.send(output);
});

/************************************** readEncoder **************************************/
/*
Plug encoder into Digital pins 2 & 3

This is a rotary encoder. I gives you the position the rotary is turned. 

For example: http://165.106.xxx.xx:3000/readEncoder 

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-rotary-encoder
*/


app.get('/readEncoder', function (req, res) {var rotaryEncoder = require("jsupm_rotaryencoder");

	// Instantiate a Grove Rotary Encoder, using signal pins D2 and D3
	var myRotaryEncoder = new rotaryEncoder.RotaryEncoder(2, 3);

	var output = "Position: " + myRotaryEncoder.position();

  	res.send(output);
});

/************************************** readButtonLevel **************************************/
/*
Plug button into Digital pin 0

Simple button. Returns whether the button is pressed or not.  

For example: http://165.106.xxx.xx:3000/readButtonLevel 

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-button
*/

app.get('/readButtonLevel', function (req, res) {

	// Create the button object using GPIO pin 0
	var button = new groveSensor.GroveButton(0);
	var output = button.name() + " value is " + button.value()
  	res.send(output);
});

/************************************** setLCDMessage **************************************/
/*
Plug LCD screen into I2C

Displays "envisensor" on the screen.

Requires external power or the text will not be displayed. 

For example: http://165.106.xxx.xx:3000/setLCDMessage 

*/

app.get('/setLCDMessage', function (req, res) {

	// Initialize Jhd1313m1 at 0x62 (RGB_ADDRESS) and 0x3E (LCD_ADDRESS) 
	var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);

	//to display text needs to have external power 

	myLcd.setCursor(0,0);
	// RGB Blue
	//myLcd.setColor(53, 39, 249);
	// RGB Red
	myLcd.setColor(255, 0, 0);
	myLcd.write('envisensor');  
	myLcd.setCursor(1,2);
	myLcd.write('envisensor');
  	res.send('LCDMessage set');
});

/************************************** setRelayOn **************************************/
/*
Plug relay into digital pin 5

Turns relay on and returns "Relay is on". 

For example: http://165.106.xxx.xx:3000/setRelayOn
For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-relay
*/

app.get('/setRelayOn', function (req, res) {

	// Create the relay switch object using GPIO pin 5
	var relay = new groveSensor.GroveRelay(5);
	relay.on();
  	res.send('Relay is on');
});

/************************************** setRelayOff **************************************/
/*
Plug relay into digital pin 5

Turns relay off and returns "Relay is on". 

For example: http://165.106.xxx.xx:3000/setRelayOff

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-relay
*/

app.get('/setRelayOff', function (req, res) {

	// Create the relay switch object using GPIO pin 5
	var relay = new groveSensor.GroveRelay(5);
	relay.off();
  	res.send('Relay is off');
});

/************************************** setBuzzerSong **************************************/
/*
Plug buzzer into digital pin 6

Plays simple tones on the buzzer. 

For example: http://165.106.xxx.xx:3000/setBuzzerSong

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-buzzer
*/

app.get('/setBuzzerSong', function (req, res) {

var upmBuzzer = require("jsupm_buzzer");// Initialize on GPIO 6
var myBuzzer = new upmBuzzer.Buzzer(6);
var chords = [];
chords.push(upmBuzzer.DO);
chords.push(upmBuzzer.RE);
chords.push(upmBuzzer.MI);
chords.push(upmBuzzer.FA);
chords.push(upmBuzzer.SOL);
chords.push(upmBuzzer.LA);
chords.push(upmBuzzer.SI);
chords.push(upmBuzzer.DO);
chords.push(upmBuzzer.SI);
var chordIndex = 0;

// Print sensor name
console.log(myBuzzer.name());

function melody()
{
    if (chords.length != 0)
    {
        //Play sound for one second
        console.log( myBuzzer.playSound(chords[chordIndex], 1000000) );
        chordIndex++;
        //Reset the sound to start from the beginning. 
        if (chordIndex > chords.length - 1)
			chordIndex = 0;
    }
}
setInterval(melody, 100);

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});
  	res.send('Buzzer is playing notes');
});

/************************************** setBuzzerOn **************************************/
/*
Plug buzzer into digital pin 6

Turns the buzzer on. 

For example: http://165.106.xxx.xx:3000/setBuzzerOn

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-buzzer
*/

app.get('/setBuzzerOn', function (req, res) {

	var upmBuzzer = require("jsupm_buzzer"); // Initialize on GPIO 6
	var myBuzzer = new upmBuzzer.Buzzer(6);

	myBuzzer.playSound(upmBuzzer.DO,0);
	res.send('Buzzer is on');
});

/************************************** setBuzzerOff **************************************/
/*
Plug buzzer into digital pin 6

Turns the buzzer off. 

For example: http://165.106.xxx.xx:3000/setBuzzerOff

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-buzzer
*/

app.get('/setBuzzerOff', function (req, res) {
	var upmBuzzer = require("jsupm_buzzer");// Initialize on GPIO 5
	var myBuzzer = new upmBuzzer.Buzzer(5);

	myBuzzer.stopSound();

  	res.send('Buzzer is off');
});

/************************************** getDeviceServices **************************************/
//Shows all available services of this device 

app.get('/getDeviceServices', function (req, res) {
	var text = 
	'{"availableSensors":[' +
	'{"sensorName":"readTemperature"},' +
	'{"sensorName":"readMoisture"},' +
	'{"sensorName":"readLightLevel"},' +
	'{"sensorName":"readUVLevel"},' +
	'{"sensorName":"readPIRMotion"},' +
	'{"sensorName":"readEncoder"},' +
	'{"sensorName":"readButtonLevel"},' +
	'{"sensorName":"setRelayOn"},' +
	'{"sensorName":"setRelayOff"},' +
	'{"sensorName":"setBuzzerSong"},' +
	'{"sensorName":"setBuzzerOn"},' +
	'{"sensorName":"setBuzzerOff"}]}';

	obj = JSON.parse(text);
	list = 'Sensors below: \n '+ (obj.availableSensors[0].sensorName) + '\n ' + 
	obj.availableSensors[1].sensorName + '\n ' + 
	obj.availableSensors[2].sensorName + '\n ' + 
	obj.availableSensors[3].sensorName + '\n ' + 
	obj.availableSensors[4].sensorName + '\n ' + 
	obj.availableSensors[5].sensorName + '\n ' + 
	obj.availableSensors[6].sensorName + '\n ' + 
	obj.availableSensors[7].sensorName + '\n ' + 
	obj.availableSensors[8].sensorName + '\n ' + 
	obj.availableSensors[9].sensorName + '\n ' + 
	(obj.availableSensors[10].sensorName) + '\n ' + 
	(obj.availableSensors[11].sensorName);

	res.send(list);
});

/************************************** listeningPort **************************************/

// Lisetning on port 3000. Change number below if you want to change the port: 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



