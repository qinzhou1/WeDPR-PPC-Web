
const TokenKey = 'auth-token'
const UsernameKey = 'auth-user'
const PubKey = 'auth-pub'
const AgencyId = 'auth-agency-id'
const AgencyName = 'auth-agency-name'
const UserRole = 'auth-user-role'
const Permissions = 'auth-permissions'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUsername() {
  return localStorage.getItem(UsernameKey)
}

export function setUsername(username) {
  return localStorage.setItem(UsernameKey, username)
}

export function removeUsername() {
  return localStorage.removeItem(UsernameKey)
}

export function isUserFirstTimeUse(username) {
  // not first time
  if (localStorage.getItem(username)) {
    return false
  } else {
    localStorage.setItem(username, '1')
    return true
  }
}

export function getPubKey() {
  return localStorage.getItem(PubKey)
}

export function setPubKey(pub) {
  return localStorage.setItem(PubKey, pub)
}

export function removePubKey() {
  return localStorage.removeItem(PubKey)
}

export function getAgencyId() {
  return localStorage.getItem(AgencyId)
}

export function setAgencyId(id) {
  return localStorage.setItem(AgencyId, id)
}

export function removeAgencyId() {
  return localStorage.removeItem(AgencyId)
}

export function isLoginAgencyId(id) {
  return getAgencyId() === id
}

export function getAgencyName() {
  return localStorage.getItem(AgencyName)
}

export function setAgencyName(name) {
  return localStorage.setItem(AgencyName, name)
}

export function removeAgencyName() {
  return localStorage.removeItem(AgencyName)
}

export function getUserRole() {
  return localStorage.getItem(UserRole)
}

export function setUserRole(role) {
  return localStorage.setItem(UserRole, role)
}

export function removeUserRole() {
  return localStorage.removeItem(UserRole)
}

export function getPermissions() {
  return localStorage.getItem(Permissions)
}

export function setPermissions(permissions) {
  return localStorage.setItem(Permissions, permissions)
}

export function removePermissions() {
  return localStorage.removeItem(Permissions)
}
