import signal
import sys
from muselsl import muse
import socketio
import asyncio
import os
from time import sleep

#constants
endpoint="isaiah-5orh.localhost.run"
museAddr="00:55:DA:B3:38:DF"

#global
count = 0
myMuse = 0
sio = socketio.Client()

def connectServer():
    sio.connect('http://{}'.format(endpoint))

def emit(data):
    sio.emit('floats', data.tolist())
    """for item in data:
        print(str(item)+",", end="")
    print("\n", end="")"""

def getMuseData(data, timestamps):
    emit(data)

def signal_handler(signal, frame):
    global myMuse
    print("Closing socket, closing bluetooth, and disconnecting")
    sio.disconnect()
    myMuse.disconnect()
    sleep(5)
    sys.exit(0)

def main():
    global myMuse
    signal.signal(signal.SIGINT, signal_handler)
    os.system("firefox http://{}/ &".format(endpoint))
    connectServer()
    myMuse = muse.Muse("{}".format(museAddr), callback_eeg=getMuseData)
    myMuse.connect()
    myMuse.start()
    print("Streaming to server...")
    while True:
        pass

if __name__ == "__main__":
    main()    

    
