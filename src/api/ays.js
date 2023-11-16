import request from '@/utils/request'

/**
 * query jobs
 * @param params query filters
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryAysJobs(params) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-ays',
    method: 'get',
    params: params
  })
}

// export function queryAysData(params) {
//   return request({
//     url: '/api/v3/ppc-management/pms/data',
//     method: 'get',
//     params: params
//   })
// }

export function queryAysJobsResult(job_id) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-ays/' + job_id,
    method: 'get'
  })
}

export function createAysJob(data) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-ays',
    method: 'post',
    data: data
  })
}
