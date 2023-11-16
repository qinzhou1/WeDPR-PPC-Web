import { login, logout } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getPubKey,
  removePubKey,
  setUsername,
  removeUsername,
  getUsername,
  getAgencyId,
  setAgencyId,
  removeAgencyId,
  getAgencyName,
  setAgencyName,
  removeAgencyName,
  getUserRole,
  setUserRole,
  removeUserRole,
  getPermissions,
  setPermissions,
  removePermissions
} from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { rsa_encode } from '@/utils/rsa'
import { ErrorCode } from '@/utils/errorcode'
import 'intro.js/introjs.css'
import 'intro.js/themes/introjs-modern.css'
import '@/styles/intro.scss'
import { decode } from 'jsonwebtoken'

import globalVue from '../../main'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getUsername(),
    agencyId: getAgencyId(),
    agencyName: getAgencyName(),
    role: getUserRole(),
    permissions: getPermissions(),
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AGENCY_ID: (state, agencyId) => {
    state.agencyId = agencyId
  },
  SET_AGENCY_NAME: (state, agencyName) => {
    state.agencyName = agencyName
  },
  SET_USER_ROLE: (state, role) => {
    state.role = role
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, loginParams) {
    const { username } = loginParams
    return new Promise((resolve, reject) => {
      // rsa encode parameters
      var pub = getPubKey()
      // var params = { username: username.trim(), password: password }
      var encoded = rsa_encode(JSON.stringify(loginParams), pub)

      login(encoded).then(response => {
        if (typeof response.errorCode !== 'undefined' &&
          response.errorCode !== 0) {
          var errorCode = response.errorCode
          if (
            errorCode === ErrorCode.InvalidParameters
          ) {
            Message.error({ message: globalVue.$t('user.message.invalidParameters'), center: true })
          } else if (
            errorCode === ErrorCode.AccountNotExist
          ) {
            Message.error({ message: globalVue.$t('user.message.accountError'), center: true })
          } else if (
            errorCode === ErrorCode.ImageAuthTokenExpired
          ) {
            Message.error({ message: globalVue.$t('user.message.expiredAuthCode'), center: true })
          } else if (
            errorCode === ErrorCode.ImageAuthTokenNotExist ||
            errorCode === ErrorCode.ImageAuthTokenNotMatch
          ) {
            Message.error({ message: globalVue.$t('user.message.authTokenNotMatch'), center: true })
          } else if (
            errorCode === ErrorCode.LoginTimeLimitation
          ) {
            Message.error({ message: response.message, center: true })
          } else if (
            (errorCode === ErrorCode.AccountOrPasswordIncorrect)
          ) {
            Message.error({ message: globalVue.$t('user.message.accountError'), center: true })
          } else if (
            errorCode === ErrorCode.UndefinedError
          ) {
            Message.error({ message: globalVue.$t('common.undefinedError'), center: true })
          } else {
            Message.error({ message: globalVue.$t('common.undefinedError'), center: true })
          }

          reject()
        } else {
          var token = response.data
          var decodedToken = decode(token.replace('Bearer ', ''))

          if (decodedToken.userName !== username) {
            Message.error({ message: globalVue.$t('user.message.tokenError') + ': ' + decodedToken.userName, center: true })
            reject()
          } else {
            commit('SET_TOKEN', token)
            commit('SET_NAME', username)
            setToken(token)
            setUsername(username)
            setAgencyId(decodedToken.agencyId)
            setAgencyName(decodedToken.agencyName)
            setUserRole(decodedToken.role)
            setPermissions(decodedToken.permissions.split('|'))
            // success
            resolve()
          }
        }
      }).catch(error => {
        Message({
          type: 'error',
          message: globalVue.$t('user.message.loginError') + ': ' + error
        })
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removePubKey()
        removeToken()
        removeUsername()
        removeAgencyId()
        removeAgencyName()
        removeUserRole()
        removePermissions()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        removeToken()
        removeUsername()
        removeAgencyId()
        removeAgencyName()
        removeUserRole()
        removePermissions()
        resetRouter()
        commit('RESET_STATE')
        reject(error)
      })
    })
  },

  resetAll({ commit }) {
    return new Promise(resolve => {
      removePubKey()
      removeToken()
      removeUsername()
      removeAgencyId()
      removeAgencyName()
      removeUserRole()
      removePermissions()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUsername()
      removeAgencyId()
      removeAgencyName()
      removeUserRole()
      removePermissions()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

