const { SpeechRecognizer } = require('./speechrecognizer.js')
const { params } = require('./params.js')
const speechRecognizer = new SpeechRecognizer(params)
const { writeLog } = require('./writeFile')

let startFlag = false
let logFileName = ''

// 开始识别(此时连接已经建立)
speechRecognizer.OnRecognitionStart = (res) => {
  console.log('开始识别', )
  logFileName = (new Date()).toLocaleString().split('/').join('-').split(':').join('.')
  startFlag = true
}
// 一句话开始
speechRecognizer.OnSentenceBegin = (res) => {
  // console.log('一句话开始', )
}

function splitLrc(str) {
  if ((str || '').length > 40) {
    const splitList = str.split('，')
    splitList.shift()
    return splitLrc(splitList.join('，'))
  } else {
    return str
  }
}

// 识别变化时
speechRecognizer.OnRecognitionResultChange = (res) => {
  const lrc = res?.result?.voice_text_str
  const reduceRes = splitLrc(lrc)
  console.log(reduceRes)
}
// 一句话结束
speechRecognizer.OnSentenceEnd = (res) => {
  const lrc = res?.result?.voice_text_str
  const reduceRes = splitLrc(lrc)
  logFileName && writeLog(logFileName, reduceRes)
  console.log(reduceRes)
}
// 识别结束
speechRecognizer.OnRecognitionComplete = (res) => {
  console.log('识别结束', )
}
// 识别错误
speechRecognizer.OnError = (res) => {
  console.log('识别失败', res)
}

exports.start = () => {
  speechRecognizer.start()
  return speechRecognizer
}

exports.stop = () => {
  speechRecognizer.stop()
  startFlag = false
}

exports.getStatus = () => startFlag
