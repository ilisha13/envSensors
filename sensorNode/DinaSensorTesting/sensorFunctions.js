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
function readTemp(req, res) {
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


/************************************** initialise module functions **************************************/

module.exports.hello = helloTest;
module.exports.getTemperature = readTemp;