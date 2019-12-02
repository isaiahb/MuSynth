import socketio
import random

# standard Python
sio = socketio.Client()
sio.connect('http://isaiah-7m2s.localhost.run')
# sio.connect('http://localhost:9000')

# asyncio
# sio = socketio.AsyncClient()

def emit(data):
    sio.emit('python', data)

@sio.on('process')
def on_message(data):
    # print('I received a message!')
    emit(random.randint(0, 4))
