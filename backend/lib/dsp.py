import numpy as np
# import matplotlib.pyplot as plt
import os
import sys
import socketio

# standard Python
sio = socketio.Client()
sio.connect('musynth.herokuapp.com')

processId = sys.argv[1]
print(processId)

def openBuf(location):
    buf = open(location, 'r')
    return buf

def getData(data):
    # print("waiting on data")
    data = np.array(data)
    return data

def calculatePSD(array,sample_f):
    ps = np.abs(np.fft.fft(array))**2

    time_step = 1 / sample_f 
    freqs = np.fft.fftfreq(array.size, time_step)
    idx = np.argsort(freqs)

    return freqs[idx], ps[idx], idx

def getStats(array, sample_f, eyefreq):
    freq, psd, idx = calculatePSD(array, sample_f = sample_f)
    psd = psd[freq>1]
    freq = freq[freq>1]
    avg = np.average(psd)
    id1 = np.where(freq>(eyefreq-0.5))
    id2 = np.where(freq>(eyefreq+0.5))
    psdband = psd[id1[0][0]:id2[0][0]]
    maxval = np.max(psdband)
    maxindex = np.where(psd == maxval)
    divide = maxval/avg
    
    return divide


def emit(data):
    sio.emit('python', data)


@sio.on('process'+processId)
def on_message(data):
    eyefreqs = [8.0,10.0,12.0,15.0]
    output = [0, 0, 0, 0]
    data = getData(data)
    for i, eyefreq in enumerate(eyefreqs):
        output[i] = getStats(data, 256, eyefreq)

    emit(str(np.argmax(output)))

