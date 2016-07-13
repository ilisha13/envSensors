// sensors that you just want to get a reading from 


//var express = require('express');

var groveSensor = require('jsupm_grove')
var grove_moisture = require('jsupm_grovemoisture');
var UVSensor = require('jsupm_guvas12d');
var grove_motion = require('jsupm_biss0001');
var rotaryEncoder = require("jsupm_rotaryencoder");
var LCD = require('jsupm_i2clcd');

/************************************** readTemperature **************************************/


function helloTest(req,res) {
	var input = req.query.input;	
	res.send('Hello, this is what you have typed: ' + input);
};

/************************************** readTemperature **************************************/
/*
Plug temperature sensor into AIO pin 0. 

When user types in the IP address of the respective edison into a browswer with the correct
port and accompanies this wih /readTemperatureC or /readTemperatureF, the temerature in either 
celsius or fahrenheit is returned. 

For example: http://165.106.xxx.xx:3000/readTemperature. 

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-temperature-sensor
*/
function temperaure(req, res) {
	// Create the temperature sensor object using AIO pin 0
	// If you want to change the pin number, modify this line.
	var input = req.query.input
	var temp = new groveSensor.GroveTemp(0);
	var celsius = temp.value();
	var fahrenheit = celsius * 9.0/5.0 + 32.0;
	var outputC = "The temperature is " + celsius;
	var outputF = "The temperature is " + fahrenheit;

	if (input == 'celsius'){
		res.send(outputC)
	}
	else if (input == 'fahrenheit'){
		res.send(outputF);
	}
	else {
		res.send ("Sorry your input was not valid")
	}
}

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
function moisture(req, res) {

	// Moisture sensor in AIO pin 1 
	// If you want to change the pin number, modify this line.
	var myMoistureObj = new grove_moisture.GroveMoisture(1);

	// Values (approximate):
	// 0-300,   sensor in air or dry soil
	// 300-600, sensor in humid soil
	// 600+,    sensor in wet soil or submerged in water
	// Read the value every second and print the corresponding moisture level

	var moisture_val = parseInt(myMoistureObj.value());
	var output = "Moisture value: " + moisture_val;
	res.send(output);
}

/************************************** readUVLevel **************************************/
/*
Plug UV sensor into AIO pin 2 

Returns UV value
Eg. http://165.106.xxx.xx:3000/readUVLevel 

For more information, please visit: 
//https://software.intel.com/en-us/iot/hardware/sensors/grove-uv-sensor
*/

function uvLevel(req, res) {
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
}

/************************************** readPIRMotion **************************************/
/*
Plug motion sensor into Digital pin 4 

Detects motion.

For example: http://165.106.xxx.xx:3000/readPIRMotion

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/biss0001-motion-sensor
*/

function pirMotion(req, res) {

	// Instantiate a Grove Motion sensor on GPIO pin D4
	var myMotionObj = new grove_motion.BISS0001(4);
	var output;
	if (myMotionObj.value())
		output = "Detecting moving object";
	else
		output = "No moving objects detected";

  	res.send(output);
}

/************************************** readEncoder **************************************/
/*
Plug encoder into Digital pins 2 & 3

This is a rotary encoder. I gives you the position the rotary is turned. 

For example: http://165.106.xxx.xx:3000/readEncoder 

For more information, please visit: 
https://software.intel.com/en-us/iot/hardware/sensors/grove-rotary-encoder
*/

function rotaryEncoder(req, res) {
	var rotaryEncoder = require("jsupm_rotaryencoder");
	// Instantiate a Grove Rotary Encoder, using signal pins D2 and D3
	var myRotaryEncoder = new rotaryEncoder.RotaryEncoder(2, 3);

	var output = "Position: " + myRotaryEncoder.position();

  	res.send(output);
}

function button(req, res) {

	// Create the button object using GPIO pin 0
	var button = new groveSensor.GroveButton(0);
	var output = button.name() + " value is " + button.value()
  	res.send(output);
}

/************************************** initialise module functions **************************************/

module.exports.hello = helloTest;
module.exports.getTemperature = temperature;
module.exports.getMoisture = moisture;
module.exports.getUVLevel = uvLevel;
module.exports.getPirMotion = pirMotion;
module.exports.getrotaryEncoder = rotaryEncoder;
module.exports.buttonLevel = button;




