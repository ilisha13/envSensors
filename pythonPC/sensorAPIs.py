import pycurl
from io import BytesIO

def getTemperature(scale, ipAddress, port):
	if scale == 'celcius':

		buffer = BytesIO()
		c = pycurl.Curl()
		c.setopt(c.URL, ipAddress+ ':' + port +'/readTemperatureF')
		c.setopt(c.WRITEDATA, buffer)
		c.perform()
		c.close()
		body = buffer.getvalue()
		# Body is a byte string.
		# We have to know the encoding in order to print it to a text file
		# such as standard output.
		print(body.decode('iso-8859-1'))

	else: 

		buffer = BytesIO()
		c = pycurl.Curl()
		c.setopt(c.URL, 'ipAddress:port/readTemperatureC')
		c.setopt(c.WRITEDATA, buffer)
		c.perform()
		c.close()
		body = buffer.getvalue()
		# Body is a byte string.
		# We have to know the encoding in order to print it to a text file
		# such as standard output.
		print(body.decode('iso-8859-1'))

def getMoisture(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/readMoisture')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def getUVLevel(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/readUVLevel')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def getPIRMotion(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/readPIRMotion')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def getEncoderValue(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/readEncoder')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def getButtonLevel(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/readButtonLevel')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def getUVLevel(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/readUVLevel')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def getLCDMessage(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/setLCDMessage')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def setRelayOn(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/setRelayOn')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def setRelayOff(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/setRelayOff')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def setBuzzerSong(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/setBuzzerSong')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def setBuzzerOn(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/setBuzzerOn')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

def setBuzzerOff(scale, ipAddress, port):
	buffer = BytesIO()
	c = pycurl.Curl()
	c.setopt(c.URL, 'ipAddress:port/setBuzzerOff')
	c.setopt(c.WRITEDATA, buffer)
	c.perform()
	c.close()
	body = buffer.getvalue()
	# Body is a byte string.
	# We have to know the encoding in order to print it to a text file
	# such as standard output.
	print(body.decode('iso-8859-1'))

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