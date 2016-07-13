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
var functions = require('sensorFunctions.js')

/************************************** helloWorld sample **************************************/
//This is just a tester function when nothing else is called 


app.get('/', helloTest()); 

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
