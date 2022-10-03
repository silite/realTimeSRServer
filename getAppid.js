// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const CamClient = tencentcloud.cam.v20190116.Client;

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
// 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
const clientConfig = {
  credential: {
  },
  profile: {
    httpProfile: {
      endpoint: "cam.tencentcloudapi.com",
    },
  },
};

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new CamClient(clientConfig);
const params = {};
client.GetUserAppId(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);
