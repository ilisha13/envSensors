# testing sensorAPIs.py

import sensorAPIs as s 

# set variables 
s.init(
	ipAddress = '165.106.132.27',
	port = '3000',
	temperaturePin = '0', # aio pin 0
	moisturePin = '1', # aio pin 1
	uvPin = '2', # aio pin 2
	pirMotionPin = '5', # digital pin 5
	buttonPin = '2', # digital pin 2 
	lightPin = '3', # aio pin 3
	relayPin = '3', # digital pin 3
	buzzerPin = '6', # digital pin 6 
	servoPin = '7', # digital pin 4 
)
# Temperature 
print("The temperature in celsius is" , s.getTemperature())
print(s.getMoisture())
print(s.getUVLevel())
print(s.getPIRMotion())
print(s.getLightLevel())
print(s.getButtonLevel())
print(s.setLCDDisplay("Hello"))
print(s.setBuzzer("off"))
print(s.setRelayState("on"))
print(s.setServo("90"))
print(s.getRotary())


#print("The temperature in fahrenheit is", s.getTemperature(ipAddress, units='fahrenheit'))

# Moisture 
#print("The moisture level is" ,s.getMoisture(ipAddress, port, moisturePin))

# UV Level 
#print("The UV level is", s.getUVLevel(ipAddress, port, uvPin, 'AREF'), "in AREF")
#print("The UV level is " + str(s.getUVLevel(ipAddress, port, uvPin, 'voltage')) + " in voltage")

# Object motion 
#if s.getPIRMotion(ipAddress, port, pirMotionPin) == True :
	#print ("The object is moving")
#else: 
	#print ("The object is not moving")

# Is button pressed? 

#if s.getButtonLevel(ipAddress, port, buttonPin) == True: 
	#print ("button is pressed")
#else:
	#print ("button is not pressed")

# Light level 

#print("The light level is " + str(s.getLightLevel(ipAddress, port, lightPin, 'lux')) + " in lux")
#print("The light level is " + str(s.getLightLevel(ipAddress, port, lightPin, 'raw')) + " in raw")

# Set LCD message 

#s.setLCDDisplay(ipAddress, port, 'Hello hello', '255', '0', '0')

# s.setRelayState(ipAddress, port, relayPin, "off")

#s.setBuzzer(ipAddress, port, buzzerPin, "off", "DO", "0.5")
#s.setServo(ipAddress, port, servoPin, "180")