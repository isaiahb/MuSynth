import numpy as np
# import matplotlib.pyplot as plt
import os
import sys
import socketio

# standard Python
sio = socketio.Client()
sio.connect('http://localhost:9000')


def openBuf(location):
    buf = open(location, 'r')
    return buf

def getData(data):
    """data = buf.read()
    data = data.split(",")[:-1]
    data = np.array(data)"""
    print("waiting on data")
    # data = list()
    # for i in range(213): #read in almost 1 second of data
    #     data.append(sys.stdin.readline())

    # for i, datum in enumerate(data):
    #     data[i] = datum.split(",")[:-1]
    #     for j, item in enumerate(data[i]):
    #         datagood.append(float(data[i][j]))
    data = np.array(data)
    print(np.shape(data))
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

# def main():
#     eyefreqs = [8.0,10.0,12.0,15.0]
#     output = [0, 0, 0, 0]
#     while True:
#         data = getData()
#         for i, eyefreq in enumerate(eyefreqs):
#             output[i] = getStats(data, 256, eyefreq)
#         print("Strongest signal is: {} Hz ".format(eyefreqs[np.argmax(output)]))

# if __name__ == "__main__":
#     main()

def emit(data):
    sio.emit('python', data)

@sio.on('process')
def on_message(data):
    print('I received a message!')
    eyefreqs = [8.0,10.0,12.0,15.0]
    output = [0, 0, 0, 0]
    data = getData(data)
    for i, eyefreq in enumerate(eyefreqs):
        output[i] = getStats(data, 256, eyefreq)
	# 
    emit(str(np.argmax(output)))


print("Wew")