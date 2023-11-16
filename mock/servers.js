const Mock = require('mockjs')

module.exports = [
  {
    url: '/api/v3/ppc-management/auth/status',
    type: 'get',
    response: _ => {
      return {
          errorCode:0,
          message:'success',
          data:'管理机构用户，并为各角色分配权限'
      }
    }
  },

  {
    url: '/api/v3/ppc-management/pms/stats',
    type: 'get',
    response: _ => {
      return {
        errorCode: 0,
        message: 'success',
        data: {
          serverStatus: 0,
          serverDescription: '管理服务',
          jobCount: 10,
          jobInitiatorCount: 2,
          jobFinishCount: 5,
          agencyCount: 4,
          datasetCount: 6,
          myDatasetCount: 3,
          algorithmCount: 8,
          myAlgorithmCount: 7
        }
      }
    }
  }
]
