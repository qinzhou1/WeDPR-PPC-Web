import request from '@/utils/request'

/**
 * @param data
 * @property {string} agencyId
 * @property {string} agencyName
 * @property {string} agencyPublicKey
 * @property {string} agencyDescription
 * @property {bool} isComputationProvider
 * @property {string} gatewayUrl
 */
export function registerAgency(data) {
  return request({
    url: '/api/v3/ppc-management/pms/agency',
    method: 'post',
    data: data
  })
}

/**
 * @param data
 * @property {string} agencyId
 * @property {string} agencyName
 * @property {string} agencyPublicKey
 * @property {string} agencyDescription
 * @property {bool} isComputationProvider
 * @property {string} gatewayUrl
 */
export function updateAgency(data) {
  return request({
    url: '/api/v3/ppc-management/pms/agency',
    method: 'patch',
    data: data
  })
}

/**
 * @param params
 * @property {string} agencyId
 * @property {string} agencyName
 * @property {string} gatewayUrl
 * @property {string} agencyPublicKey
 * @property {bool} isComputationProvider
 */
export function listAgencies(params) {
  return request({
    url: '/api/v3/ppc-management/pms/agency',
    method: 'get',
    params: params
  })
}

export function deleteAgency(agencyId) {
  return request({
    url: '/api/v3/ppc-management/pms/agency',
    method: 'delete',
    data: {
      agencyId: agencyId
    }
  })
}
