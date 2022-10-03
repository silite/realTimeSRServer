const { SpeechRecognizer } = require('./speechrecognizer.js')
const { params } = require('./params.js')
const { writeLog } = require('./writeFile')

let startFlag = false
let logFileName = ''

function init() {
  const speechRecognizer = new SpeechRecognizer(params)
  // 开始识别(此时连接已经建立)
  speechRecognizer.OnRecognitionStart = (res) => {
    console.log('开始识别',)
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
    console.log('识别结束',)
  }
  // 识别错误
  speechRecognizer.OnError = (res) => {
    console.log('识别失败', res)
  }

  global.speechRecognizer = speechRecognizer
}

exports.start = () => {
  init()
  global.speechRecognizer.start()
}

exports.stop = () => {
  global.speechRecognizer.stop()
  global.speechRecognizer && delete global.speechRecognizer
  startFlag = false
}

exports.getStatus = () => startFlag
