const Mock = require('mockjs')

module.exports = [
  {
    url: '/api/v3/ppc-management/pms/agency',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data: {
            total: 100,
            pageStatus: false,
            'content|5': [
              {
                agencyId: '@id',
                agencyName: '@pick([\'company1\',\'company2\',\'company3\',\'company4\'])',
                agencyPublicKey: '0x1111111',
                agencyDescription: "一个机构",
                isComputationProvider: '@pick([true, false])',
                gatewayUrl: '127.0.0.1:5840',
                managementUrl: '127.0.0.1:5860',
              }
            ]
          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/agency',
    type: 'delete',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message'
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/agency',
    type: 'post',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message'
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/agency',
    type: 'patch',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message'
        })
      }
    }
  }
]
