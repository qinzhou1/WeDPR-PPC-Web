const Mock = require('mockjs')

module.exports = [{
        url: '/api/v3/ppc-management/pms/jobs-ays$',
        type: 'get',
        response: _ => {
            return {
                ...Mock.mock({
                    errorCode: 0,
                    message: 'message-message-message',
                    data: {
                        total: 50,
                        pageStatus: false,
                        'content|5': [{
                            receiverId: '@pick([\'1001\',\'1002\'])',
                              agencyId: '@pick([\'1001\',\'1002\'])',
                              agencyName: '@pick([\'company1\',\'company2\'])',
                              datasetId: '@id',
                              jobId: '@id',
                              datasetTitle: '@pick([\'age\',\'finance\',\'evidence\'])',
                              loadingIndex: '@pick([0, 1, 2])',
                              recordCount: 10,
                              columnCount: 10,
                              datasetFields: 'id name age',
                            createTime: '@integer(1609408825014, 1609408925014)',
                            jobCreator: '@pick([\'admin\',\'tom\'])',
                            searchField: '@pick([\'age\',\'id\',\'name\'])',
                        }]
                    }
                })
            }
        }
    },
    {
      url: '/api/v3/ppc-management/pms/jobs-ays/',
      type: 'get',
      response: _ => {
          return {
              ...Mock.mock({
                  errorCode: 0,
                  message: 'message-message-message',
                  data: {
                      jobId: '@id',
                      'detail|5': [{
                        searchId: '@pick([\'1001\',\'1002\'])',
                        searchDetail: '@pick([\'age: 20 name: zhangsan\',\'true\'])',
                        obfuscationList: '[1609408825014, 1609408825015, 1609408825016, 1609408825017, 1609408825018]',
                      }]
                  }
              })
          }
      }
  },
      {
        url: '/api/v3/ppc-management/pms/jobs-ays$',
        type: 'post',
        response: _ => {
            return {
                ...Mock.mock({
                    errorCode: 0,
                    message: 'message-message-message',
                    data: {jobId: "j-12345", detail: [{searchId: "1001", searchDetail:"found", obfuscationList: ["123456"]}]}
                })
            }
        }
    },
]