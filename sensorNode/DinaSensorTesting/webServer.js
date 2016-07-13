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

// Load Express module 
var express = require('express');
var app = express();
var sensorFunctions = require('./sensorFunctions')

/************************************** TEST **************************************/

app.get('/', sensorFunctions.hello); 

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										 Sensors  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

app.get('/getTemperature', sensorFunctions.getTemperature); 
app.get('/getMoisture', sensorFunctions.getMoisture); 
app.get('/getUVLevel', sensorFunctions.getUVLevel);
app.get('/getPirMotion', sensorFunctions.getPirMotion);
app.get('/getrotaryEncoder', sensorFunctions.getrotaryEncoder);
app.get('/buttonLevel', sensorFunctions.buttonLevel);

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										 Actuators  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

app.get('/setLCDDisplay', sensorFunctions.setLCDDisplay);
app.get('/setRelayOn', sensorFunctions.setRelayOn);
app.get('/setRelayOff', sensorFunctions.setRelayOff);
/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										 Robotics  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */


/************************************** listen **************************************/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});