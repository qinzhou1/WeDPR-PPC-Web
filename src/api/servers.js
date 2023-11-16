import request from '@/utils/request'

export function queryAuthServerStatus() {
  return request({
    url: '/api/v3/ppc-management/auth/status',
    method: 'get'
  })
}

export function queryManagerServerStats() {
  return request({
    url: '/api/v3/ppc-management/pms/stats',
    method: 'get'
  })
}

