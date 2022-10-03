const ws = require('ws')
const { start, stop, getStatus } = require('./start.js')

let gatherSocket
let speechRecognizer
function startServer() {
  const server = new ws.Server({
    port: 12345,
  });

  server.on('connection', (socket, req) => {
    gatherSocket = socket
    speechRecognizer = start()

    socket.on('message', (data) => {
      const res = data instanceof String ? JSON.parse(data) : data
      switch (res.type) {
        case 'start':
          speechRecognizer = start()
          break
        case 'stop':
          stop()
          break
        default:
          if (getStatus())
            speechRecognizer.write(data)
      }
    })

    socket.on('close', () => {
      stop()
    })

    socket.on('error', (error) => {
      stop()
      startServer()
    })
  })

}

startServer()
