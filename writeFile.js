const fs = require("fs")

function writeLog(fileName, log) {
  fs.writeFileSync(`./${fileName}.txt`, log + '\n', {
    flag: 'a+'
  })
}

exports.writeLog = writeLog

