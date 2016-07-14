// sensors that you just want to get a reading from 


var groveSensor = require('jsupm_grove')
var grove_moisture = require('jsupm_grovemoisture');
var UVSensor = require('jsupm_guvas12d');
var grove_motion = require('jsupm_biss0001');
var rotaryEncoder = require("jsupm_rotaryencoder");
var LCD = require('jsupm_i2clcd');

/************************************** robotFunction1 **************************************/


function robotFunction1(req,res) {
	var input = req.query.input;	
	res.send('robot function 1 ' + input);
};

/************************************** robotFunction2 **************************************/

function robotFunction2(req,res) {
	var input = req.query.input;	
	res.send('robot function 2 ' + input);
};

/************************************** export functions **************************************/

module.exports.robotFunc1 = robotFunction1;
module.exports.robotFunc2 = robotFunction2;

