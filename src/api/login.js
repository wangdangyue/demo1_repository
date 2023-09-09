import request from '@/utils/request'
// 用于存放所有登录相关的接口请求

// 1.获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getMsgCode = (code, key, mo) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: code,
      captchaKey: key,
      mobile: mo

    }
  })
}

// 登录
export const codeLogin = (mobile, code) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile: mobile,
      partyData: {},
      smsCode: code
    }
  })
}
