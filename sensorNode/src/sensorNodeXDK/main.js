/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting


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
var sensorFunctions = require('./sensorFunctions');

/************************************** hello **************************************/
/* API Name                : hello
 * Parameters required     : message
 * Example URL             : http://localhost:3000/hello?message="anything"
 * Expected Output         : Message sent is: anything 
 */

app.get('/hello', sensorFunctions.hello); 

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										                  Sensors  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

/********** Temperature *********/
/* API Name                : getTemperature
 * Parameters required     : units (celsius or fahrenheit)
 * Example URL             : http://localhost:3000/getTemperature?units="celsius"
 * Expected Output         : "The temperature is 40
 */

app.get('/getTemperature', sensorFunctions.getTemperature); 



app.get('/getMoisture', sensorFunctions.getMoisture); 
app.get('/getUVLevel', sensorFunctions.getUVLevel);
app.get('/getPirMotion', sensorFunctions.getPirMotion);
//app.get('/getrotaryEncoder', sensorFunctions.getrotaryEncoder);
app.get('/buttonLevel', sensorFunctions.buttonLevel);
app.get('/lightSensorLevel', sensorFunctions.lightSensorVal);

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										 Actuators  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

//app.get('/setLCDDisplay', sensorFunctions.setLCDDisplay);
//app.get('/setRelayOn', sensorFunctions.setRelayOn);
//app.get('/setRelayOff', sensorFunctions.setRelayOff);
/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										 Robotics  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

//app.get('/robotFunc1', sensorFunctions.robotFunc1);
//app.get('/robotFunc2', sensorFunctions.robotFunc2);

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
                     Camera   
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

//app.get('/cameraFunc1', sensorFunctions.cameraFunc1);
//app.get('/cameraFunc2', sensorFunctions.cameraFunc2);

/************************************** listen **************************************/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



/************************************** getBoardDetails  **************************************/

/* API Name                : getBoardDetails
 * Parameters required     : parameterType ("BoardIP", "BoardName" , "")
 * Example URL             : http://localhost:3000/getBoardDetails?unitType="BoardIP"
 " Sample Response          : 192.168.1.2 

switch (parameterType) {
    case "BoardIP":
        response = "192.1sssss;
        break; 
    case BoardName:
        text = "Intel Edison;
        break; 
    default: 
        text = "Looking forward to the Weekend";
}

res.send("response")


 */