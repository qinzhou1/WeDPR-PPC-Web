import request from '@/utils/request'

// /api/v3/ppc-management/pms/jobs or /api/v3/ppc-management/pms/jobs-result

/**
 * query jobs
 * @param params query filters
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryJobs(params) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs',
    method: 'get',
    params: params
  })
}

/**
 * create a new job
 * @param data
 * @property {string} userName
 * @property {string} jobTitle
 * @property {string} jobDescription
 * @property {string} jobAlgorithm
 * @property {ReceiveResultAgency} jobData.receiveResultAgency
 * @property {Array<ParticipantAgency>} jobData.participantAgencyList
 * @return {Promise<Response>} an axios promise object of response
 */
export function createJob(data) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs',
    method: 'post',
    data: data
  })
}

/**
 * run the job
 * @return {Promise<Response>} an axios promise object of response
 */
export function rerunJob(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-rerun/' + jobId,
    method: 'post'
  })
}

/**
 * query job detail by id
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryJobDetail(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs/' + jobId,
    method: 'get'
  })
}

/**
 * query job result by id
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryJobResult(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-result/' + jobId,
    method: 'get'
  })
}

/**
 * query job log by id
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryJobLog(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-log/' + jobId,
    method: 'get'
  })
}

/**
 * query job log by id
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryJobAudit(params) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-audit',
    method: 'get',
    params: params
  })
}

/**
 * query workflow by id
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryJobProgress(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-progress/' + jobId,
    method: 'get'
  })
}

/**
 * query workflow by id
 * @return {Promise<Response>} an axios promise object of response
 */
export function queryWorkflow(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-workflow/' + jobId,
    method: 'get'
  })
}

/**
 * kill the job
 * @return {Promise<Response>} an axios promise object of response
 */
export function killJob(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-kill/' + jobId,
    method: 'post'
  })
}

export function deleteJob(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs/' + jobId,
    method: 'delete'
  })
}

export function downloadJobResult(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-result-download/' + jobId,
    method: 'get'
  })
}

export function downloadModelJobResult(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-model-download/' + jobId,
    method: 'get'
  })
}

// 密文匹配模块

// 获取密文匹配列表
export function getMatchList(params) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-cem',
    method: 'get',
    params
  })
}

// 创建密文匹配
export function createMatch(data) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-cem',
    method: 'post',
    data
  })
}

// 查看匹配结果
export function getMatchJobResult(jobId) {
  return request({
    url: '/api/v3/ppc-management/pms/jobs-cem-result/' + jobId,
    method: 'get'
  })
}
