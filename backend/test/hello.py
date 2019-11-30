import socketio
import random

# standard Python
sio = socketio.Client()
sio.connect('http://isaiah-7m2s.localhost.run')
# sio.connect('http://localhost:9000')

# asyncio
# sio = socketio.AsyncClient()

def emit():
    sio.emit('python', random.randint(0, 4))

@sio.on('process')
def on_message(data):
    # print('I received a message!')
    emit()

emit()
