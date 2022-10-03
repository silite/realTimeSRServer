const { CryptoJS } = require('./lib/cryptojs')

const config = {
}

exports.params = {
  signCallback: (signStr) => {
    function toUint8Array(wordArray) {
      // Shortcuts
      const words = wordArray.words;
      const sigBytes = wordArray.sigBytes;

      // Convert
      const u8 = new Uint8Array(sigBytes);
      for (let i = 0; i < sigBytes; i++) {
        u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      }
      return u8;
    }

    function Uint8ArrayToString(fileData) {
      let dataString = '';
      for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
      }
      return dataString;
    }
    const secretKey = config.secretKey;
    const hash = CryptoJS.HmacSHA1(signStr, secretKey);
    const bytes = Uint8ArrayToString(toUint8Array(hash));
    const buffer = Buffer.from(bytes, "binary")
    return buffer.toString('base64')
  }, // 鉴权函数 用户提供鉴权函数，不传则为null
  // 用户参数
  secretid: config.secretId,
  appid: config.appId,
  // 实时识别接口参数
  engine_model_type: '16k_zh', // 引擎
  voice_format: 1,
  needvad: 1,
  convert_num_mode: 1,
  filter_punc: 1,
  word_info: 0,
}
