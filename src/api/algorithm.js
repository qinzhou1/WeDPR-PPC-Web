import request from '@/utils/request'

export function listAlgorithms(params) {
  return request({
    url: '/api/v3/ppc-management/pms/algorithms',
    method: 'get',
    params: params
  })
}

export function queryAlgorithmDetail(algorithmId, algorithmVersion) {
  return request({
    url: '/api/v3/ppc-management/pms/algorithms/' + algorithmId,
    method: 'get',
    params: {
      algorithmVersion: algorithmVersion
    }
  })
}

export function uploadAlgorithm(data) {
  return request({
    url: '/api/v3/ppc-management/pms/algorithms',
    method: 'post',
    data: data
  })
}

export function deleteAlgorithm(algorithmId, algorithmVersion) {
  return request({
    url: '/api/v3/ppc-management/pms/algorithms',
    method: 'delete',
    data: {
      algorithmId: algorithmId,
      algorithmVersion: algorithmVersion
    }
  })
}

export function queryAlgorithmJob(params) {
  return request({
    url: '/api/v3/ppc-management/pms/algorithms-job',
    method: 'get',
    params: params
  })
}

export function listOriginAlgorithms() {
  return request({
    url: '/api/v3/ppc-management/pms/default-algorithms',
    method: 'get'
  })
}
