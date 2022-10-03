const fs = require("fs")

function writeLog(dir, fileName, log) {
  fs.mkdir(`./${dir}`, () => {})
  fs.writeFileSync(`./${dir}/${fileName}.txt`, ' ' + log + '\n', {
    flag: 'a+'
  })
}

exports.writeLog = writeLog
