const Mock = require('mockjs')

module.exports = [
  {
    url: '/api/v3/ppc-management/pms/data$',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data: {
            total: 50,
            pageStatus: false,
            'content|5': [
              {
                datasetId: '@id',
                datasetTitle: '@pick([\'finance\',\'evidence\'])',
                ownerAgencyId: '@pick([\'1001\',\'1002\',\'1003\',\'1004\'])',
                ownerAgencyName: '@pick([\'company1\', \'company2\', \'company3\', \'company4\'])',
                ownerUserName: '@pick([\'admin\',\'tom\'])',
                datasetDescription: 'demo',
                createTime: '@integer(1609408825014, 1609408925014)',
                isAuthorized: '@pick([true,false])',
                datasetAuthority: [{authorizedAgencyId: '1002', authorizationDate: 1619408825014, algorithmId: 'a-1001'}, {authorizedAgencyId: '1003', authorizationDate: 1619408825014, algorithmId: 'a-1002'}],
                datasetAuthorityRequest: [{authorizedAgencyId: "1002", algorithmId: "a-1001", authorizationDate: 1657850780820}],
                recordCount: 10,
                columnCount: 10,
                datasetFields: 'id name age',
              }
            ]
          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/data/',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data:
          {
            datasetId: '@id',
            datasetTitle: '@pick([\'finance\',\'evidence\'])',
            ownerAgencyId: '@pick([\'1001\',\'1002\',\'1003\',\'1004\'])',
            ownerAgencyName: '我是一个机构',
            ownerUserName: '@pick([\'admin\',\'tom\'])',
            datasetDescription: 'description-description-description',
            datasetFields: 'id name age',
            rowCount: 10,
            columnCount: 10,
            datasetSize: 100,
            createTime: '@integer(1609408825014, 1609408925014)',
            datasetHash: '0xaabbccddeeff',
            datasetAuthority: [{authorizedAgencyId: '1001', authorizationDate: 1609408825014, algorithmId: "a-1111"}, {authorizedAgencyId: '1002', authorizationDate: 1609408825014, algorithmId: "PPC_ALGO_ALL"}, {authorizedAgencyId: '1003', authorizationDate: 1609408825014, algorithmId: "a-222"}, {authorizedAgencyId: '1002', authorizationDate: 1609408825014, algorithmId: "a-233"}],
            // datasetAuthority: [{authorizedAgencyId: '1001', authorizationDate: 1609408825014, algorithmId: "a-1111"}, {authorizedAgencyId: '1002', authorizationDate: 1609408825014, algorithmId: "PPC_ALGO_ALL"}, {authorizedAgencyId: '1003', authorizationDate: 1609408825014, algorithmId: "a-222"}, {authorizedAgencyId: '1002', authorizationDate: 1609408825014, algorithmId: "a-233"}],
            // datasetAuthorityRequest: [{authorizedAgencyId: '1002', authorizationDate: 1609408825014, algorithmId: "a-2222"}, {authorizedAgencyId: '1003', authorizationDate: 1609408825014, algorithmId: "PPC_ALGO_ALL"}, {authorizedAgencyId: '1004', authorizationDate: 1609408825014, algorithmId: "PPC_ALGO_ALL"}],  
            // datasetAuthorityRequest: [{authorizedAgencyId: "1002", algorithmId: "a-1001", authorizationDate: 1657850780820}],        
            // datasetAuthority: [],
            datasetAuthorityRequest: [{authorizedAgencyId: "1002", authorizationDate: 1657850780820, algorithmId: "a-1001"}],

            // datasetAuthorityRequest: [],          
            dataDetail: {
              columns: [
                'id',
                'name',
                'age'
              ],
              data: [
                [
                  '1',
                  '嘻嘻',
                  '11'
                ],
                [
                  '2',
                  '哈哈',
                  '66'
                ],
                [
                  '3',
                  'jerry',
                  '99'
                ]
              ]
            }
          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/data',
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
    url: '/api/v3/ppc-management/pms/data/',
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
    url: '/api/v3/ppc-management/pms/data-auth',
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
    url: '/api/v3/ppc-management/pms/data-auth',
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
    url: '/api/v3/ppc-management/pms/data-download/',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
            errorCode: 0,
            message: 'success',
            data: 'aWQseDAseDEseDIseDMseDQKMSwxMCwxMSwxMiwxMywxNAoyLDIwLDIxLDIyLDIzLDI0CjMsMzAsMzEsMzIsMzMsMzQKNCw0MCw0MSw0Miw0Myw0NAo1LDUwLDUxLDUyLDUzLDU0CjYsNjAsNjEsNjIsNjMsNjQ='
        })
        }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/data-job$',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data: {
            total: 20,
            pageStatus: false,
            'content|10': [
              {
                jobId: '@id',
                jobTitle: '@pick([\'finance\',\'evidence\'])',
                jobDescription: 'demo',
                jobCreator: '@pick([\'admin\',\'tom\'])',
                jobAlgorithmType: '@pick([\'PPC_SQL\',\'PPC_MPC\',\'PPC_TRAIN\',\'PPC_PREDICT\',\'PPC_PSI\'])',
                initiatedAgencyId: '@pick([\'1001\',\'1002\',\'1003\',\'1004\'])',
                initiatedAgencyName: '@pick([\'company1\', \'company2\', \'company3\', \'company4\'])',
                createTime: '@integer(1609408825014, 1609408925014)',
                jobStatus: '@pick([\'SUCCEED\', \'FAILED\', \'RUNNING\', \'WAITING\'])',
                jobResultReceiverList: [ '1002' ],
    
              }
            ]
          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/data-request',
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
    url: '/api/v3/ppc-management/pms/data-request',
    type: 'patch',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message'
        })
      }
    }
  },
]
