const fs = require("fs")

function writeLog(log) {
  fs.writeFileSync('./log.txt', log + '\n', {
    flag: 'a+'
  })
}

exports.writeLog = writeLog

