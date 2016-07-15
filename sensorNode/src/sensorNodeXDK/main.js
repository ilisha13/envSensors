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
var actuatorFunctions = require('./actuatorFunctions');
var roboticsFunction = require('./roboticsFunction');
var cameraFunction = require('./cameraFunction');

/************************************** setUp **************************************/

//app.get('/', actuatorFunctions.displayIPAddress);

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

/************************************* Temperature *************************************/
/* API Name                : getTemperature
 * Parameters required     : units (celsius or fahrenheit) & aioPin 
 * Example URL             : http://localhost:3000/getTemperature?units="celsius"&aioPin=0
 * Expected Output         : temperature in celsius or fahreheit
 */

app.get('/getTemperature', sensorFunctions.getTemperature); 

/************************************** Moisture **************************************/
/* API Name                : getMoisture
 * Parameters required     : aioPin 
 * Example URL             : http://localhost:3000/getTemperature?units="celsius"&aioPin=0
 * Expected Output         : 0-300       sensor in air or dry soil
	                         300-600     sensor in humid soil
	                         600+        sensor in wet soil or submerged in water
 */
app.get('/getMoisture', sensorFunctions.getMoisture); 

/**************************************** UVLevel ****************************************/
/* API Name                : getUVLevel
 * Parameters required     : value (AREF or voltage) & aioPin 
 * Example URL             : http://localhost:3000/getUVLevel?value=AREF&aioPin=0
 * Expected Output         : AREF value or voltage value (higher means more UV) 
 */
app.get('/getUVLevel', sensorFunctions.getUVLevel);

/*************************************** PirMotion ***************************************/
/* API Name                : getPirMotion
 * Parameters required     : digitalPin 
 * Example URL             : http://localhost:3000/getPirMotion?digitalPin=4
 * Expected Output         : Detecting moving object    or
                             No moving objects detected
 */
app.get('/getPirMotion', sensorFunctions.getPirMotion);

/************************************* Rotary Encoder ************************************/
/* API Name                : getRotaryEncoder
 * Parameters required     : digitalPin1 & digitalPin2 (look at the small pins)
 * Example URL             : http://localhost:3000/getTemperature?units="celsius"&aioPin=0
 * Expected Output         : rotary position
 */
app.get('/getRotary', sensorFunctions.getRotaryEncoder);

/**************************************** Button  ****************************************/
/* API Name                : getButtonLevel
 * Parameters required     : digitalPin 
 * Example URL             : http://localhost:3000/getButtonLevel?digitalPin=3
 * Expected Output         : 1 or 0 
 */
app.get('/getButtonLevel', sensorFunctions.buttonLevel);

/************************************* Light Sensor **************************************/
/* API Name                : getLightSensorLevel
 * Parameters required     : value (lux or raw) & aioPin 
 * Example URL             : http://localhost:3000/getTemperature?value="lux"&aioPin=0
 * Expected Output         : raw value or lux 
 */
app.get('/getLightLevel', sensorFunctions.lightSensorVal);

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
										 Actuators  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

/************************************** LCDDisplay **************************************/
/* API Name                : setLCDDisplay
 * Parameters required     : display, R, G, B (colours)
 * Example URL             : http://localhost:3000/setLCDDisplay?message=hello&R=255&G=0&B=0
 * Expected Output         : "hello" on the LCD screen and red backlight
 * Notes                   : LCD Display requires external power. On the Arduino sheild, 
                             ensure the switch next to AIO Pin 0 is flipped to 5V 
 */

app.get('/setLCDDisplay', actuatorFunctions.setLCDDisplay);

/***************************************** Relay *****************************************/
/* API Name                : setRelayState
 * Parameters required     : state (on or off) & digitalPin 
 * Example URL             : http://localhost:3000/setRelayState?state=on&digitalPin=5
 * Expected Output         : relay is turned on or off 
 */
app.get('/setRelayState', actuatorFunctions.setRelayState);

/************************************** Buzzer **************************************/
/* API Name                : setBuzzer
 * Parameters required     : state(on or off) & digitalPin & tone (DO, RE, MI, FA, SOL, LA, TI, DO) & volume (0.0 to 1.0)
 * Example URL             : http://localhost:3000/setBuzzer?state=on&digitalPin=6&tone=DO&volume=0.5
 * Expected Output         : turns buzzer on or off
 */
app.get('/setBuzzer', actuatorFunctions.setBuzzer);
/*____

/************************************** Servo **************************************/
/* API Name                : setServo
 * Parameters required     : angle(between 0 and 180) & digitalPin 
 * Example URL             : http://localhost:3000/setServo?angle=0&digitalPin=6
 * Expected Output         : turns servo on or off
 */
app.get('/setServo', actuatorFunctions.setServo);
/*__
_________________________________________________________________________________
  _____________________________________________________________________________________
										  Robotics  
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

app.get('/robotFunc1', roboticsFunction.robotFunc1);
app.get('/robotFunc2', roboticsFunction.robotFunc2);

/*_____________________________________________________________________________________
  _____________________________________________________________________________________
                                            Camera   
  _____________________________________________________________________________________
  _____________________________________________________________________________________   */

app.get('/cameraFunc1', cameraFunction.cameraFunc1);
app.get('/cameraFunc2', cameraFunction.cameraFunc2);

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