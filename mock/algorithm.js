const Mock = require('mockjs')

module.exports = [
  {
    url: '/api/v3/ppc-management/pms/default-algorithms',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data: {
            total: 3,
            'pageStatus': false,
            'content': [{
              ownerAgencyId: 'PPC',
              ownerAgencyName: 'PPC',
              ownerUserName: 'PPC',
              algorithmId: 'a-1001',
              algorithmTitle: '匿综查询',
              algorithmVersion: '1',
              algorithmType: 'PPC_AYS',
              algorithmDescription: '系统算法',
              inputCount: '1'
            },
            {
              ownerAgencyId: 'PPC',
              ownerAgencyName: 'PPC',
              ownerUserName: 'PPC',
              algorithmId: 'a-1002',
              algorithmTitle: '隐私求交',
              algorithmVersion: '1',
              algorithmType: 'PPC_PSI',
              algorithmDescription: '系统算法',
              inputCount: '2+'
            },
            {
              ownerAgencyId: 'PPC',
              ownerAgencyName: 'PPC',
              ownerUserName: 'PPC',
              algorithmId: 'a-1003',
              algorithmTitle: 'XGBoost',
              algorithmVersion: '1',
              algorithmType: 'PPC_XGB',
              algorithmDescription: '系统算法',
              inputCount: '3'
            }
          ]
          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/algorithms$',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data: {
            total: 100,
            'pageStatus': false,
            'content|10': [{
              ownerAgencyId: '@pick([\'1001\',\'1002\',\'1003\',\'1004\'])',
              ownerAgencyName: '我是一个机构',
              ownerUserName: '@pick([\'admin\',\'tom\'])',
              algorithmId: '@pick([\'001\',\'002\',\'003\',\'004\'])',
              algorithmTitle: '@pick([\'add\',\'sub\',\'mul\',\'div\'])',
              algorithmVersion: '1',
              algorithmType: '@pick([\'PPC_SQL\',\'PPC_MPC\',\'PPC_TRAIN\',\'PPC_PREDICT\',\'PPC_PSI\'])',
              algorithmDescription: 'description-description-description',
              createTime: '@integer(1609408825014, 1609408925014)',
              inputCount: '@pick([\'2\', \'2+\'])'
            }]
          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/algorithms/',
    type: 'get',
    response: _ => {
      return {
        ...Mock.mock({
          errorCode: 0,
          message: 'message-message-message',
          data: {
            algorithmVersion: '1.0',
            ownerUserName: '@pick([\'admin\',\'tom\'])',
            createTime: '@integer(1609408825014, 1609408925014)',
            ownerAgencyId: '@pick([\'1001\',\'1002\',\'1003\',\'1004\'])',
            ownerAgencyName: '我是一个机构',
            algorithmId: '@pick([\'001\',\'002\',\'003\',\'004\'])',
            algorithmTitle: '@pick([\'finance\',\'evidence\'])',
            algorithmType: '@pick([\'PPC_SQL\',\'PPC_MPC\',\'PPC_TRAIN\',\'PPC_PREDICT\',\'PPC_PSI\'])',
            algorithmDescription: 'description-description-description',
            sqlModule: 'select * from t_test_table;',
            mpcModule: 'select * from t_test_table;',
            mpcModelModule: 'This is mpc model module',
            inputCount: '@pick([\'2\', \'2+\'])',
            algorithmSubtype: '逻辑回归',
            participantAgency: '1001'

          }
        })
      }
    }
  },
  {
    url: '/api/v3/ppc-management/pms/algorithms',
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
    url: '/api/v3/ppc-management/pms/algorithms',
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
    url: '/api/v3/ppc-management/pms/algorithms-job$',
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
]
