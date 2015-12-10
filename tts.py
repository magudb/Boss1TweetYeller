import pyttsx
import sys

message = sys.argv[1]
engine = pyttsx.init()
engine.say(message)
engine.runAndWait()
print 'Boss1 said ', message
