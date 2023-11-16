import request from '@/utils/request'

/**
 * login
 * @param {string} data - encoded login params
 * @return {Promise<Response>} an axios promise object of response
 */
export function login(data) {
  return request({
    url: '/api/v3/ppc-management/auth/login',
    method: 'post',
    data: {
      version: '1',
      data: data
    }
  })
}

/**
 * logout
 * @return {Promise<Response>} an axios promise object of response
 */
export function logout() {
  return request({
    url: '/api/v3/ppc-management/auth/logout',
    method: 'post',
    data: {}
  })
}

/**
 * register
 * @param {string} data - encoded register params
 * @return {Promise<Response>} an axios promise object of response
 */
export function register(data) {
  return request({
    url: '/api/v3/ppc-management/auth/register',
    method: 'post',
    data: {
      version: '1',
      data: data
    }
  })
}

/**
 * changePassword
 * @param {string} data - encoded changePassword params
 * @return {Promise<Response>} an axios promise object of response
 */
export function changePassword(data) {
  return request({
    url: '/api/v3/ppc-management/auth/change-password',
    method: 'post',
    data: {
      version: '1',
      data: data
    }
  })
}

/**
 * deleteAccount
 * @param {string} data - encoded deleteAccount params
 * @return {Promise<Response>} an axios promise object of response
 */
export function deleteAccount(data) {
  return request({
    url: '/api/v3/ppc-management/auth/delete-account',
    method: 'post',
    data: {
      version: '1',
      data: data
    }
  })
}

/**
 * get a auth code for login/register
 * @return {Promise<Response>} an axios promise object of response
 */
export function authCode() {
  return request({
    url: '/api/v3/ppc-management/auth/image-code',
    method: 'get'
  })
}

/**
 * get a pubKey for login/register
 * @return {Promise<Response>} an axios promise object of response
 */
export function authPub() {
  return request({
    url: '/api/v3/ppc-management/auth/pub',
    method: 'get'
  })
}

/**
 * generate invitation code
 * @param {string} data - genInvitationCode params
 * @property {string} availableTimes
 * @return {Promise<Response>} an axios promise object of response
 */
export function genInvitationCode(data) {
  return request({
    url: '/api/v3/ppc-management/auth/invitation-code',
    method: 'post',
    data: {
      version: '1',
      data: data
    }
  })
}

export function isNeedMailAuth() {
  return request({
    url: '/api/v3/ppc-management/auth/need-mail-auth',
    method: 'get'
  })
}

export function sendMailCode(username, email) {
  return request({
    url: '/api/v3/ppc-management/auth/mail-code',
    method: 'post',
    data: {
      version: '1',
      data: {
        username: username,
        email: email
      }
    }
  })
}

