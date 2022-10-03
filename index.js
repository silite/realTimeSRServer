const ws = require('ws')
const { start, stop, getStatus } = require('./start.js')

function startServer() {
  const server = new ws.Server({
    port: 12345,
  });

  server.on('connection', (socket, req) => {
    global.gatherSocket = socket

    socket.on('message', (data) => {
      let res
      try {
        res = JSON.parse(data.toString())
      } catch (e) {
        res = {}
      }
      switch (res.type) {
        case 'start':
          start()
          break
        case 'stop':
          stop()
          break
        default:
          if (getStatus())
            global.speechRecognizer && global.speechRecognizer.write(data)
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
