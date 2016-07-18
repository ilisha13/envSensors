import pycurl
from io import BytesIO

'''
________________________________________________________________________________________
________________________________________________________________________________________
                                    
                                    API Cheat sheet
_________________________________________________________________________________________
_________________________________________________________________________________________

************************************* Temperature *************************************
 * API Name                : getTemperature
 * Pin type                : AIO
 * Return type             : float
 * Parameters required     : ipAddress, port, , tempPin, units (celsius or fahreheit)
 * Expected Output         : temperature in celsius or fahreheit as integer 
 *

************************************** Moisture **************************************
 * API Name                : getMoisture
 * Pin type                : AIO
 * Parameters required     : ipAddress, port, moisturePin 
 * Return type             : float
 * Expected Output         : 0-300       sensor in air or dry soil
	                         300-600     sensor in humid soil
	                         600+        sensor in wet soil or submerged in water

************************************** getUVLevel **************************************
 * API Name                : getUVLevel
 * Pin type                : AIO
 * Parameters required     : ipAddress, port, uvPin, uvValue (AREF or voltage)
 * Return type             : float
 * Expected Output         : UV value in AREF or voltage 
 *

 ************************************** getPIRMotion **************************************
 * API Name                : getPIRMotion
 * Pin type                : digital
 * Parameters required     : ipAddress, port, pirMotionPin 
 * Return type             : boolean
 * Expected Output         : True or false based on if object is moving or not 
 *

 ************************************** getButtonLevel **************************************
 * API Name                : getPIRMotion
 * Pin type                : digital
 * Parameters required     : ipAddress, port, buttonPin 
 * Return type             : boolean
 * Expected Output         : True or false based on if object is button is pressed or not 
 *

************************************** getLightLevel **************************************
 * API Name                : getLightLevel
 * Pin type                : AIO
 * Parameters required     : ipAddress, port, lightPin, lightUnits (lux or raw)
 * Return type             : float
 * Expected Output         : returns either lux or raw light values  
 *

 ************************************** setLCDDisplay **************************************
 * API Name                : setLCDDisplay
 * Pin type                : I2C
 * Parameters required     : ipAddress, port, display, R, G, B
 * Return type             : string
 * Expected Output         : prints "LCD display set"
 *

 ************************************** setRelayState **************************************
 * API Name                : setRelayState
 * Pin type                : I2C
 * Parameters required     : ipAddress, port, relayPin, state (on or off)
 * Return type             : string
 * Expected Output         : prints "Relay is on" or "Relay is off"
 *

 ************************************** setBuzzer **************************************
 * API Name                : setBuzzer
 * Pin type                : digital
 * Parameters required     : state(on or off) & buzzerPin & buzzerNote (DO, RE, MI, FA, SOL, LA, TI, DO) & volume (0.0 to 1.0)
 * Return type             : string
 * Expected Output         : prints "Buzzer is on" or "Buzzer is off"
 *

 ************************************** setServo **************************************
 * API Name                : setServo
 * Pin type                : digital
 * Parameters required     : servoPin & angle (between 0 and 180)
 * Return type             : string
 * Expected Output         : prints "Buzzer is on" or "Buzzer is off"
 *

 ************************************** getFlowRate **************************************
 * API Name                : getFlowRate
 * Pin type                : digital
 * Parameters required     : flowMeterPin
 * Return type             : integer
 * Expected Output         : flow rate in litres per minute 
 *

 ************************************** getRotary **************************************
 * API Name                : getRotary
 * Pin type                : digital
 * Parameters required     : rotaryPin1, rotaryPin2 (on pin D4 for example, rotaryPin1 = 4, rotaryPin2 = 5)
 * Return type             : float
 * Expected Output         : rotary value
 *
 '''

settings = {
	'ipAddress' : '165.106.132.27',
	'port' : '3000',
	'tempUnits' : 'celsius', # default temperature unit as celsius
	'tempPin' : '0', # aio pin 0
	'moisturePin' : '1', # aio pin 1
	'uvPin' : '2', # aio pin 2
	'uvValue': 'voltage', # default UV unit as voltage
	'pirMotionPin': '5', # digital pin 5
	'buttonPin' : '2', # digital pin 2 
	'lightPin' : '3', # aio pin 3
	'lightUnits': 'lux', # default light unit as lux
	'relayPin' : '3', # digital pin 3
	'buzzerPin' : '7', # digital pin 6 
	'buzzerVol' : '0.2', # buzzer default volume
	'buzzerNote': 'DO', # buzzer default note 
	'servoPin' : '6', # digital pin 6
	'rotaryPin1' : '4', # one part of the digital pin in D4
	'rotaryPin2' : '5', # one part of the digital pin in D4
	'flowMeterPin': '8', # digital pin 8
	'R' : '0', # LCD default colour
	'G' : '0', # LCD default colour
	'B' : '0', # LCD default colour
}

def init(**kwargs):
	settings.update(kwargs)

'''
************************************* Temperature *************************************
 * API Name                : getTemperature
 * Pin type                : AIO
 * Return type             : float
 * Parameters required     : ipAddress, port, , tempPin, units (celsius or fahreheit)
 * Expected Output         : temperature in celsius or fahreheit as integer 
 *
 '''

def getTemperature(ipAddress=None, port=None, tempPin=None, tempUnits=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	tempPin = tempPin if (tempPin is not None) else settings['tempPin']
	tempUnits = tempUnits if (tempUnits is not None) else settings['tempUnits']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getTemperature?units=' + tempUnits + "&aioPin=" + tempPin)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = float(body.decode('iso-8859-1'))
	return bodyDecoded

'''
************************************** Moisture **************************************
 * API Name                : getMoisture
 * Pin type                : AIO
 * Parameters required     : ipAddress, port, moisturePin 
 * Return type             : float
 * Expected Output         : 0-300       sensor in air or dry soil
	                         300-600     sensor in humid soil
	                         600+        sensor in wet soil or submerged in water
 *
 '''

def getMoisture(ipAddress=None, port=None, moisturePin=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	moisturePin = moisturePin if (moisturePin is not None) else settings['moisturePin']
	
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getMoisture?aioPin=' + moisturePin)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = float(body.decode('iso-8859-1'))
	return bodyDecoded

'''
************************************** getUVLevel **************************************
 * API Name                : getUVLevel
 * Pin type                : AIO
 * Parameters required     : ipAddress, port, uvPin, uvValue (AREF or voltage)
 * Return type             : float
 * Expected Output         : UV value in AREF or voltage 
 *
 '''

def getUVLevel(ipAddress=None, port=None, uvPin=None, uvValue=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	uvPin = uvPin if (uvPin is not None) else settings['uvPin']
	uvValue = uvValue if (uvValue is not None) else settings['uvValue']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getUVLevel?aioPin=' + uvPin + '&value=' + uvValue)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = float(body.decode('iso-8859-1'))
	return bodyDecoded
'''
************************************** getPIRMotion **************************************
 * API Name                : getPIRMotion
 * Pin type                : digital
 * Parameters required     : ipAddress, port, pirMotionPin 
 * Return type             : boolean
 * Expected Output         : True or false based on if object is moving or not 
 *
 '''

def getPIRMotion(ipAddress=None, port=None, pirMotionPin=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	pirMotionPin = pirMotionPin if (pirMotionPin is not None) else settings['pirMotionPin']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getPIRMotion?digitalPin=' + pirMotionPin)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	if body.decode('iso-8859-1') == "Detecting moving object":
		return True
	else:
		return False 

'''
************************************** getButtonLevel **************************************
 * API Name                : getPIRMotion
 * Pin type                : digital
 * Parameters required     : ipAddress, port, buttonPin 
 * Return type             : boolean
 * Expected Output         : True or false based on if object is button is pressed or not 
 *
 '''

def getButtonLevel(ipAddress=None, port=None, buttonPin=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	buttonPin = buttonPin if (buttonPin is not None) else settings['buttonPin']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getButtonLevel?digitalPin=' + buttonPin)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = int(body.decode('iso-8859-1'))
	if bodyDecoded == 1: 
		return True 
	else: 
		return False 

'''
************************************** getLightLevel **************************************
 * API Name                : getLightLevel
 * Pin type                : AIO
 * Parameters required     : ipAddress, port, lightPin, lightUnits (lux or raw)
 * Return type             : float
 * Expected Output         : returns either lux or raw light values  
 *
 '''
def getLightLevel(ipAddress=None, port=None, lightPin=None, lightUnits=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	lightPin = lightPin if (lightPin is not None) else settings['lightPin']
	lightUnits = lightUnits if (lightUnits is not None) else settings['lightUnits']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getLightLevel?aioPin=' + lightPin + '&value=' + lightUnits)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = float(body.decode('iso-8859-1'))
	return bodyDecoded
'''
************************************** setLCDDisplay **************************************
 * API Name                : setLCDDisplay
 * Pin type                : I2C
 * Parameters required     : ipAddress, port, display, R, G, B
 * Return type             : string
 * Expected Output         : prints "LCD display set"
 *
 '''

def setLCDDisplay(display, ipAddress=None, port=None, R=None, G=None, B=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	R = R if (R is not None) else settings['R']
	G = G if (G is not None) else settings['G']
	B = B if (B is not None) else settings['B']
	message = display.replace(" ", "%20")

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/setLCDDisplay?display=' + message + '&R=' + R + '&G=' + G + '&B=' + B)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	return(body.decode('iso-8859-1'))
'''
************************************** setRelayState **************************************
 * API Name                : setRelayState
 * Pin type                : I2C
 * Parameters required     : ipAddress, port, relayPin, state (on or off)
 * Return type             : string
 * Expected Output         : prints "Relay is on" or "Relay is off"
 *
 '''
def setRelayState(state, ipAddress=None, port=None, relayPin=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	relayPin = relayPin if (relayPin is not None) else settings['relayPin']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/setRelayState?digitalPin=' + relayPin + '&state=' + state)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = body.decode('iso-8859-1')
	return bodyDecoded
'''
************************************** setBuzzer **************************************
 * API Name                : setBuzzer
 * Pin type                : digital
 * Parameters required     : state(on or off) & buzzerPin & buzzerNote (DO, RE, MI, FA, SOL, LA, TI, DO) & volume (0.0 to 1.0)
 * Return type             : string
 * Expected Output         : prints "Buzzer is on" or "Buzzer is off"
 *
 '''
def setBuzzer(state, ipAddress=None, port=None, buzzerPin=None, buzzerNote=None, buzzerVol=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	buzzerPin = buzzerPin if (buzzerPin is not None) else settings['buzzerPin']
	buzzerVol = buzzerVol if (buzzerVol is not None) else settings['buzzerVol']
	buzzerNote = buzzerNote if (buzzerNote is not None) else settings['buzzerNote']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/setBuzzer?digitalPin=' + buzzerPin + '&state=' + state + "&tone" + buzzerNote + "&volume" + buzzerVol)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = body.decode('iso-8859-1')
	return bodyDecoded

'''
************************************** setServo **************************************
 * API Name                : setServo
 * Pin type                : digital
 * Parameters required     : servoPin & angle (between 0 and 180)
 * Return type             : string
 * Expected Output         : prints "Buzzer is on" or "Buzzer is off"
 *
 '''
def setServo(angle, ipAddress=None, port=None, servoPin=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	servoPin = servoPin if (servoPin is not None) else settings['servoPin']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/setServo?digitalPin=' + servoPin + '&angle=' + angle)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = body.decode('iso-8859-1')
	return(bodyDecoded) 

'''
************************************** getFlowRate **************************************
 * API Name                : getFlowRate
 * Pin type                : digital
 * Parameters required     : flowMeterPin
 * Return type             : integer
 * Expected Output         : flow rate in litres per minute 
 *
 '''
def setBuzzer(ipAddress=None, port=None, flowMeterPin=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	flowMeterPin = flowMeterPin if (flowMeterPin is not None) else settings['flowMeterPin']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getFlowRate?digitalPin=' + flowMeterPin)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = int(body.decode('iso-8859-1'))
	return bodyDecoded

'''
************************************** getRotary **************************************
 * API Name                : getRotary
 * Pin type                : digital
 * Parameters required     : rotaryPin1, rotaryPin2 (on pin D4 for example, rotaryPin1 = 4, rotaryPin2 = 5)
 * Return type             : float
 * Expected Output         : rotary value
 *
 '''
def getRotary(ipAddress=None, port=None, rotaryPin1=None, rotaryPin2=None):
	# if parameters are not specified, use default 
	ipAddress = ipAddress if (ipAddress is not None) else settings['ipAddress']
	port = port if (port is not None) else settings['port']
	rotaryPin1 = rotaryPin1 if (rotaryPin1 is not None) else settings['rotaryPin1']
	rotaryPin2 = rotaryPin2 if (rotaryPin2 is not None) else settings['rotaryPin2']

	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, ipAddress+ ':' + port +'/getRotary?digitalPin1=' + rotaryPin1 + '&digitalPin2=' + rotaryPin2)
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	bodyDecoded = float(body.decode('iso-8859-1'))
	return(bodyDecoded) 


"""

def getDeviceServices(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/getDeviceServices')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))
"""