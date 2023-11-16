import request from '@/utils/request'

export function uploadDataset(data) {
  return request({
    url: '/api/v3/ppc-management/pms/data',
    method: 'post',
    data: data
  })
}

export function addAuthorization(data) {
  return request({
    url: '/api/v3/ppc-management/pms/data-auth',
    method: 'post',
    data: data
  })
}

export function deleteAuthorization(data) {
  return request({
    url: '/api/v3/ppc-management/pms/data-auth',
    method: 'delete',
    data: data
  })
}

export function listDataset(params) {
  return request({
    url: '/api/v3/ppc-management/pms/data',
    method: 'get',
    params: params
  })
}

export function queryDatasetDetail(datasetId) {
  return request({
    url: '/api/v3/ppc-management/pms/data/' + datasetId,
    method: 'get'
  })
}

export function deleteDataset(datasetId) {
  return request({
    url: '/api/v3/ppc-management/pms/data/' + datasetId,
    method: 'delete'
  })
}

export function downloadDataset(datasetId) {
  return request({
    url: '/api/v3/ppc-management/pms/data-download/' + datasetId,
    method: 'get'
  })
}

export function queryDatasetJob(params) {
  return request({
    url: '/api/v3/ppc-management/pms/data-job',
    method: 'get',
    params: params
  })
}

export function requestDatasetAuth(params) {
  return request({
    url: '/api/v3/ppc-management/pms/data-request',
    method: 'post',
    data: params
  })
}

export function execDatasetAuth(params) {
  return request({
    url: '/api/v3/ppc-management/pms/data-request',
    method: 'patch',
    data: params
  })
}
