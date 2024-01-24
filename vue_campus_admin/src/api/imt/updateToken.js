import request from '@/utils/request'

// 发送验证码
export function sendCode(mobile) {
  return request({
    url: '/imt/user/updateTokenSendCode',
    method: 'get',
    params: { mobile: mobile}
  })
}

// 查询I茅台用户列表
export function login(mobile, code) {
  return request({
    url: '/imt/user/updateTokenLogin',
    method: 'get',
    params: { mobile: mobile, code: code}
  })
}
