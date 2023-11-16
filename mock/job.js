const Mock = require('mockjs')

module.exports = [{
  url: '/api/v3/ppc-management/pms/jobs$',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          total: 100,
          pageStatus: false,
          'content|10': [{
            jobId: '@id',
            jobTitle: '@pick([\'add\',\'sub\',\'mul\',\'div\'])',
            jobCreator: '@pick([\'admin\',\'tom\'])',
            jobDescription: 'description-description-description',
            jobPriority: '@pick([0, 1, 2])',
            createTime: '@integer(1609408825014, 1609408925014)',
            jobStatus: '@pick([\'SUCCEED\', \'FAILED\', \'RUNNING\', \'WAITING\'])',
            jobAlgorithmType: '@pick([\'PPC_SQL\',\'PPC_MPC\',\'PPC_TRAIN\',\'PPC_PREDICT\',\'PPC_PSI\'])',
            initiatedAgencyId: '@pick([\'1001\',\'1002\'])',
            initiatedAgencyName: '@pick([\'company1\',\'company2\'])',
            jobResultReceiverList: ['1002']
          }]
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs$',
  type: 'post',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: 'j-12345'
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-rerun',
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
  url: '/api/v3/ppc-management/pms/jobs-result/',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          jobPlanetResult: {
            outputMetricsGraphs: [{
              metricsName: 'ROC',
              metricsData: 'https://ftp.bmp.ovh/imgs/2021/05/e2ac09b33e8b2ae1.png'
            },
            {
              metricsName: 'K-S',
              metricsData: 'https://ftp.bmp.ovh/imgs/2021/05/e2ac09b33e8b2ae1.png'
            },
            {
              metricsName: 'ERROR',
              metricsData: ''
            }
            ],
            outputPreview: {
              columns: [
                'id',
                'name',
                'age'
              ],
              'data|10': [
                [
                  '1',
                  'bob',
                  '11'
                ]
              ]
            },
            trafficVolume: '@pick([0, 10, 20])',
            elapsedTime: '@integer(1609408825014, 1609408925014)'
          }
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-log/',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          'logText|200': 'this is a log\n'
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-audit',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          jobId: 'j1',
          jobTitle: 'jt',
          jobAuditInfoList: [{
            agencyId: '1001',
            agency_name: 'company1',
            userName: 'alice',
            userRole: 'DATA_PROVIDER',
            jobStatus: 'SUCCEED',
            input_dataset_hash: 'inputDatasetHash',
            psi_input_hash: 'psiInputHash',
            psi_output_hash: 'psiOutputHash',
            mpc_result_hash: 'mpcResultHash',
            createTime: 1651907407000,
            updateTime: 1651907407000
          },
          {
            agencyId: '1002',
            agency_name: 'company2',
            userName: 'bob',
            userRole: 'DATA_PROVIDER',
            jobStatus: 'SUCCEED',
            input_dataset_hash: 'inputDatasetHash',
            psi_input_hash: 'psiInputHash',
            psi_output_hash: 'psiOutputHash',
            mpc_result_hash: 'mpcResultHash',
            createTime: 1651907407000,
            updateTime: 1651907407000
          }
          ]
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs/',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          ownerUserName: '@pick([\'alice\',\'bob\',\'oscar\',\'tom\'])',
          jobId: '@id',
          jobTitle: '@pick([\'add\',\'sub\',\'mul\',\'div\'])',
          jobCreator: '@pick([\'admin\',\'tom\'])',
          jobStatus: '@pick([\'SUCCEED\', \'FAILED\', \'RUNNING\', \'WAITING\'])',
          jobDescription: 'description-description-description',
          jobPriority: '@pick([0, 1, 2])',
          initiatedAgencyId: '@pick([\'1001\',\'1002\',\'1003\'])',
          initiatedAgencyName: '@pick([\'company1\',\'company2\',\'company3\'])',
          jobResultReceiverList: ['1002'],
          createTime: '@integer(1609408825014, 1609408925014)',
          jobAlgorithm: {
            algorithmId: '@id',
            algorithmVersion: '0.1',
            algorithmType: '@pick([\'PPC_SQL\',\'PPC_MPC\',\'PPC_TRAIN\',\'PPC_PREDICT\',\'PPC_PSI\'])',
            algorithmTitle: '@pick([\'mpc\',\'2pc\',\'zk\',\'hom\'])'
          },
          'jobDatasetProviderList|10': [{
            agencyId: '@id',
            datasetId: '@id',
            datasetTitle: '@pick([\'a\',\'b\',\'c\',])',
            loadingIndex: '@pick([0, 1, 2])'
          }]
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-progress/',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          'jobStatus': '@pick([\'SUCCEED\', \'FAILED\', \'RUNNING\', \'WAITING\'])',
          'jobUnits|10': [{
            unitId: '@id',
            status: '@pick([\'NOT_STARTED\',\'SUCCESS\',\'TIMEOUT\',\'FAILURE\'])'
          }]
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-workflow/',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: {
          'srcPrefix': 'https://ftp.bmp.ovh/imgs/2021/05/',
          'encodedImage': 'e2ac09b33e8b2ae1.png'
        }
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-kill/',
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
  url: '/api/v3/ppc-management/pms/jobs/',
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
  url: '/api/v3/ppc-management/pms/jobs-result-download/',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        errorCode: 0,
        message: 'message-message-message',
        data: 'aWQseDAseDEseDIseDMseDQKMSwxMCwxMSwxMiwxMywxNAoyLDIwLDIxLDIyLDIzLDI0CjMsMzAsMzEsMzIsMzMsMzQKNCw0MCw0MSw0Miw0Myw0NAo1LDUwLDUxLDUyLDUzLDU0CjYsNjAsNjEsNjIsNjMsNjQ='
      })
    }
  }
},
{
  url: '/api/v3/ppc-management/pms/jobs-cem',
  type: 'get',
  response: _ => {
    return {
      ...Mock.mock({
        'errorCode': 0,
        'message': 'success',
        'data': {
          'total': 40,
          'isLastPage': true,
          'content': [
            {
              'jobCreator': 'amet fugiat quis officia',
              'jobTitle': 'occaecat deserunt exercitation',
              'jobStatus': 'officia',
              'createTime': -83149572.36753178,
              'matchFields': [
                {
                  'fieldName': 'elit quis sunt',
                  'plainValue': 'commodo incididunt est',
                  'cipherValue': 'et irure'
                },
                {
                  'fieldName': 'consectetur',
                  'plainValue': 'labore',
                  'cipherValue': 'dolore Duis ex'
                },
                {
                  'fieldName': 'enim',
                  'plainValue': 'amet quis est consequat reprehenderit',
                  'cipherValue': 'sint tempor est commodo'
                },
                {
                  'fieldName': 'veniam',
                  'plainValue': 'est nostrud ea',
                  'cipherValue': 'laboris'
                },
                {
                  'fieldName': 'sed',
                  'plainValue': 'dolore aute',
                  'cipherValue': 'labore'
                }
              ],
              'initiatedAgencyId': 'laborum occaecat aliqua',
              'jobDatasetProviderAgencyName': 'mollit',
              'jobAlgorithmVersion': 'velit',
              'initiatedAgencyName': 'sed laboris',
              'jobId': 'dolore est labore adipisicing fugiat',
              'jobAlgorithmTitle': 'Ut non commodo dolore',
              'jobAlgorithmId': 'fugiat',
              'jobDatasetList': [
                {
                  'datasetId': 'nulla aliqua anim',
                  'datasetTitle': 'laboris ullamco ea velit'
                },
                {
                  'datasetId': 'aute culpa',
                  'datasetTitle': 'id esse ea'
                },
                {
                  'datasetId': 'consectetur',
                  'datasetTitle': 'enim'
                },
                {
                  'datasetId': 'in eu consequat nostrud',
                  'datasetTitle': 'amet dolor irure'
                }
              ],
              'jobDescription': 'sit',
              'jobPriority': -49867840.51354829,
              'jobAlgorithmType': 'occaecat sint ut id',
              'jobDatasetProviderAgencyId': 'fugiat'
            },
            {
              'initiatedAgencyName': 'incididunt in enim',
              'jobAlgorithmType': 'nisi laboris reprehenderit proident',
              'jobDatasetProviderAgencyName': 'nisi laborum',
              'jobAlgorithmId': 'et Duis ut non sit',
              'jobPriority': -32834949.89841689,
              'createTime': -84886351.72916737,
              'jobStatus': 'sit nostrud consectetur est veniam',
              'jobDatasetProviderAgencyId': 'officia aliquip',
              'jobDescription': 'do magna veniam',
              'matchFields': [
                {
                  'fieldName': 'labore',
                  'plainValue': 'ut in labore quis aliqua',
                  'cipherValue': 'occaecat non quis'
                },
                {
                  'fieldName': 'occaecat elit proident sed',
                  'plainValue': 'id enim consequat consectetur',
                  'cipherValue': 'commodo ullamco'
                },
                {
                  'fieldName': 'dolor do nisi nulla ad',
                  'plainValue': 'mollit est ut nisi',
                  'cipherValue': 'amet eu'
                },
                {
                  'fieldName': 'quis',
                  'plainValue': 'commodo id et mollit deserunt',
                  'cipherValue': 'et eiusmod velit esse officia'
                }
              ],
              'jobId': 'sint laboris enim voluptate amet',
              'jobAlgorithmVersion': 'esse culpa',
              'jobDatasetList': [
                {
                  'datasetId': 'minim ut nisi',
                  'datasetTitle': 'Excepteur culpa ullamco Ut ad'
                }
              ],
              'jobTitle': 'aliquip velit tempor',
              'jobAlgorithmTitle': 'in',
              'jobCreator': 'ullamco dolor',
              'initiatedAgencyId': 'cupidatat occaecat'
            },
            {
              'jobDescription': 'laborum non proident aliqua do',
              'jobDatasetList': [
                {
                  'datasetId': 'eu fugiat dolor est elit',
                  'datasetTitle': 'quis amet culpa'
                }
              ],
              'jobCreator': 'consequat culpa et amet',
              'jobAlgorithmTitle': 'commodo magna officia consequat',
              'initiatedAgencyId': 'ipsum fugiat',
              'jobStatus': 'dolore incididunt mollit consectetur elit',
              'jobTitle': 'velit deserunt incididunt sint occaecat',
              'initiatedAgencyName': 'nisi mollit',
              'jobDatasetProviderAgencyName': 'do sed Duis mollit',
              'matchFields': [
                {
                  'fieldName': 'commodo incididunt dolor sit',
                  'plainValue': 'Lorem dolore',
                  'cipherValue': 'id'
                },
                {
                  'fieldName': 'Duis',
                  'plainValue': 'mollit',
                  'cipherValue': 'id labore'
                },
                {
                  'fieldName': 'ut',
                  'plainValue': 'cupidatat sunt',
                  'cipherValue': 'occaecat'
                },
                {
                  'fieldName': 'irure sunt Excepteur occaecat deserunt',
                  'plainValue': 'qui',
                  'cipherValue': 'esse labore ea'
                }
              ],
              'createTime': 80586615.1332067,
              'jobPriority': 23458374.90778564,
              'jobDatasetProviderAgencyId': 'sint fugiat aute non',
              'jobAlgorithmType': 'proident occaecat quis do',
              'jobAlgorithmVersion': 'cillum aliquip',
              'jobAlgorithmId': 'minim',
              'jobId': 'est ea non'
            },
            {
              'createTime': -48514527.315698296,
              'initiatedAgencyId': 'Lorem in sint sed aliquip',
              'initiatedAgencyName': 'consequat consectetur',
              'jobDatasetProviderAgencyId': 'sunt aute Lorem',
              'jobPriority': 10437425.172638059,
              'jobDatasetList': [
                {
                  'datasetId': 'culpa elit exercitation sed',
                  'datasetTitle': 'eiusmod'
                },
                {
                  'datasetId': 'Ut sint pariatur culpa Excepteur',
                  'datasetTitle': 'adipisicing Ut cillum'
                },
                {
                  'datasetId': 'sit',
                  'datasetTitle': 'sit ea eu qui'
                },
                {
                  'datasetId': 'velit esse',
                  'datasetTitle': 'enim mollit commodo'
                },
                {
                  'datasetId': 'dolore cillum fugiat Ut proident',
                  'datasetTitle': 'fugiat elit do proident'
                }
              ],
              'matchFields': [
                {
                  'fieldName': 'Ut cupidatat sint aute',
                  'plainValue': 'esse ipsum',
                  'cipherValue': 'ullamco mollit'
                }
              ],
              'jobCreator': 'adipisicing nostrud proident',
              'jobAlgorithmId': 'cupidatat',
              'jobAlgorithmVersion': 'nulla amet in culpa occaecat',
              'jobDescription': 'non ex in voluptate',
              'jobId': 'nostrud',
              'jobAlgorithmTitle': 'irure in cupidatat dolor',
              'jobStatus': 'sint',
              'jobDatasetProviderAgencyName': 'in aliqua culpa commodo',
              'jobAlgorithmType': 'minim culpa magna dolor fugiat',
              'jobTitle': 'irure amet culpa velit'
            },
            {
              'jobCreator': 'dolor',
              'jobDescription': 'Excepteur aliqua tempor eiusmod',
              'jobDatasetProviderAgencyName': 'in',
              'createTime': -95515190.4900767,
              'jobPriority': 74850686.24611518,
              'initiatedAgencyId': 'Duis anim incididunt quis deserunt',
              'jobAlgorithmType': 'dolor',
              'jobAlgorithmTitle': 'id ex amet',
              'jobTitle': 'cillum sunt voluptate adipisicing magna',
              'jobDatasetProviderAgencyId': 'Ut sint tempor Duis',
              'jobAlgorithmId': 'incididunt minim Lorem dolore',
              'jobStatus': 'quis nostrud enim non',
              'jobAlgorithmVersion': 'proident voluptate aliquip commodo',
              'jobDatasetList': [
                {
                  'datasetId': 'quis ad',
                  'datasetTitle': 'reprehenderit pariatur magna cillum sed'
                },
                {
                  'datasetId': 'do sed qui in mollit',
                  'datasetTitle': 'fugiat minim'
                },
                {
                  'datasetId': 'elit',
                  'datasetTitle': 'ut'
                },
                {
                  'datasetId': 'esse minim',
                  'datasetTitle': 'magna'
                },
                {
                  'datasetId': 'reprehenderit',
                  'datasetTitle': 'officia laboris minim ipsum'
                }
              ],
              'initiatedAgencyName': 'consequat incididunt sit cillum ut',
              'matchFields': [
                {
                  'fieldName': 'do consectetur',
                  'plainValue': 'nulla minim Duis',
                  'cipherValue': 'labore ad nisi'
                },
                {
                  'fieldName': 'do',
                  'plainValue': 'proident velit',
                  'cipherValue': 'ullamco adipisicing veniam quis culpa'
                }
              ],
              'jobId': 'dolor tempor'
            }
          ]
        }
      })
    }
  }
}
]
