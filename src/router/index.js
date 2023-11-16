import Vue from 'vue'
import Router from 'vue-router'
import VueI18n from 'vue-i18n' // language

import { getPermissions } from '../utils/auth'
import {
  check_permission,
  PermissionGroup,
  AgencyGroup,
  DataGroup,
  AlgoGroup,
  JobGroup
} from '../utils/permission'

Vue.use(Router)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.getItem('languageSet') || 'zh',
  messages: {
    zh: require('../language/zh'),
    en: require('../language/en')
  }
})
var thatVue = new Vue({ i18n })

var permissions = getPermissions()

var hiddenAgencyPage = true
if (
  check_permission(
    permissions,
    PermissionGroup.AGENCY_GROUP,
    AgencyGroup.WRITE_AGENCY
  )
) {
  hiddenAgencyPage = false
}

var hiddenDataPage = true
if (
  check_permission(permissions, PermissionGroup.DATA_GROUP, DataGroup.LIST_DATA)
) {
  hiddenDataPage = false
}

var hiddenAlgoPage = true
if (
  check_permission(permissions, PermissionGroup.ALGO_GROUP, AlgoGroup.LIST_ALGO)
) {
  hiddenAlgoPage = false
}

var hiddenJobPage = true
if (
  check_permission(permissions, PermissionGroup.JOB_GROUP, JobGroup.LIST_JOB)
) {
  hiddenJobPage = false
}

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    name: 'Register',
    hidden: true
  },
  {
    path: '/changePassword',
    component: () => import('@/views/register/changePassword'),
    name: 'ChangePassword',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    name: 'Homepage',
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/homepage/index'),
        meta: {
          title: thatVue.$t('index.homepage'),
          keepAlive: false,
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/agency',
    component: Layout,
    name: 'AgencyManager',
    redirect: '/agency/index',
    children: [
      {
        path: 'index',
        hidden: hiddenAgencyPage,
        component: () => import('@/views/agency/index'),
        meta: {
          title: thatVue.$t('index.agencyManager'),
          icon: 'el-icon-s-platform'
        }
      }
    ]
  },
  {
    path: '/dataset',
    component: Layout,
    name: 'DatasetManager',
    redirect: '/dataset/index',
    children: [
      {
        name: 'DatasetIndex',
        path: 'index',
        hidden: hiddenDataPage,
        component: () => import('@/views/dataset/index'),
        meta: {
          title: thatVue.$t('index.datasetManager'),
          icon: 'el-icon-s-grid'
        }
      },
      {
        path: 'detail',
        hidden: true,
        component: () => import('@/views/dataset/detail'),
        meta: {
          bread: [
            {
              title: '数据管理',
              path: 'index'
            },
            {
              title: '数据详情',
              path: 'detail'
            }
          ],
          title: '数据详情',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: 'auth',
        hidden: true,
        component: () => import('@/views/dataset/auth'),
        meta: {
          title: thatVue.$t('index.authManager'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/dataset/auth'
        }
      },
      {
        path: 'requestAuth',
        hidden: true,
        component: () => import('@/views/dataset/requestAuth'),
        meta: {
          title: thatVue.$t('index.requestAuth'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/dataset/requestAuth'
        }
      },
      {
        path: 'job',
        hidden: true,
        component: () => import('@/views/dataset/job'),
        meta: {
          title: thatVue.$t('index.datasetJob'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/dataset/job'
        }
      }
    ]
  },
  {
    path: '/algorithm',
    component: Layout,
    name: 'AlgorithmManager',
    redirect: 'algorithm/index',
    children: [
      {
        name: 'AlgorithmIndex',
        path: 'index',
        hidden: hiddenAlgoPage,
        component: () => import('@/views/algorithm/index'),
        meta: {
          title: thatVue.$t('index.algorithmManager'),
          icon: 'el-icon-connection'
        }
      },
      {
        path: 'detail',
        hidden: true,
        component: () => import('@/views/algorithm/detail'),
        meta: {
          bread: [
            {
              title: '算法管理',
              path: 'index'
            },
            {
              title: '算法详情',
              path: 'detail'
            }
          ],
          title: '算法详情',
          icon: 'el-icon-s-operation'
        }
      },
      {
        path: 'job',
        hidden: true,
        component: () => import('@/views/algorithm/job'),
        meta: {
          title: thatVue.$t('index.algorithmJob'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/algorithm/job'
        }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: hiddenJobPage,
    name: 'jobControl',
    meta: {
      title: thatVue.$t('index.jobControl'),
      icon: 'el-icon-s-operation',
      breadcrumb: false
    },
    children: [
      {
        name: 'JobIndex',
        path: 'compute/index',
        hidden: hiddenJobPage,
        component: () => import('@/views/job/compute/index'),
        meta: {
          title: thatVue.$t('index.jobManager'),
          icon: 'el-icon-s-operation'
        }
      },
      {
        name: 'JobNew',
        path: 'compute/new',
        hidden: true,
        component: () => import('@/views/job/compute/new'),
        meta: {
          title: thatVue.$t('index.newJob'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/job/compute/index'
        }
      },
      {
        name: 'JobAys',
        path: 'ays/index',
        hidden: hiddenJobPage,
        component: () => import('@/views/job/ays/index'),
        meta: {
          title: thatVue.$t('index.JobAys'),
          icon: 'el-icon-s-operation'
        }
      },
      {
        name: 'aysNew',
        path: 'ays/new',
        hidden: true,
        component: () => import('@/views/job/ays/new'),
        meta: {
          title: thatVue.$t('index.aysNew'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ays/index'
        }
      },
      {
        name: 'aysDataDetail',
        path: 'ays/dataDetail',
        hidden: true,
        component: () => import('@/views/job/ays/dataDetail'),
        meta: {
          title: thatVue.$t('ays.data.index'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ays/index'
        }
      },
      {
        name: 'aysDataJob',
        path: 'ays/dataJob',
        hidden: true,
        component: () => import('@/views/job/ays/dataJob'),
        meta: {
          title: thatVue.$t('ays.job.index'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ays/index'
        }
      },
      {
        name: 'aysJobResult',
        path: 'ays/result',
        hidden: true,
        component: () => import('@/views/job/ays/result'),
        meta: {
          title: thatVue.$t('ays.result.index'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ays/index'
        }
      },
      {
        name: 'JobPsi',
        path: 'psi/index',
        hidden: hiddenJobPage,
        component: () => import('@/views/job/psi/index'),
        meta: {
          title: thatVue.$t('index.jobPsi'),
          keepAlive: false,
          icon: 'el-icon-s-operation'
        }
      },
      {
        name: 'psiNew',
        path: 'psi/new',
        hidden: true,
        component: () => import('@/views/job/psi/new'),
        meta: {
          title: thatVue.$t('index.newJob'),
          keepAlive: false,
          icon: 'el-icon-s-operation',
          activeMenu: '/job/psi/index'
        }
      },
      // 建模预测
      {
        name: 'combineModelSet',
        path: 'combineModelSet',
        hidden: hiddenJobPage,
        component: () => import('@/views/job/model/combineModelSet/index'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combineModelSet'),
              path: 'combineModelSet'
            }
          ],
          title: thatVue.$t('index.combineModelSet'),
          icon: 'el-icon-s-operation'
        }
      },
      {
        name: 'combineModelSetDetail',
        path: 'combineModelSetDetail',
        hidden: true,
        component: () => import('@/views/job/model/detail/detail'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combineModelSet'),
              path: 'combineModelSet'
            },
            {
              title: thatVue.$t('index.combineModelSetDetail'),
              path: 'combineModelSetDetail'
            }
          ],
          title: thatVue.$t('index.combineModelSetDetail'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combineModelSet'
        }
      },
      {
        name: 'combineModelSetCreate',
        path: 'combineModelSetCreate',
        hidden: true,
        component: () => import('@/views/job/model/combineModelSet/create'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combineModelSet'),
              path: 'combineModelSet'
            },
            {
              title: thatVue.$t('index.combineModelSetCreate'),
              path: 'combineModelSetCreate'
            }
          ],
          title: thatVue.$t('index.combineModelSetCreate'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combineModelSet'
        }
      },
      {
        name: 'combineModelSetResult',
        path: 'combineModelSetResult',
        hidden: true,
        component: () => import('@/views/job/compute/result'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combineModelSet'),
              path: 'combineModelSet'
            },
            {
              title: thatVue.$t('index.combineModelSetResult'),
              path: 'combineModelSetResult'
            }
          ],
          title: thatVue.$t('index.combineModelSetResult'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combineModelSet'
        }
      },
      {
        name: 'combineModelSetParamSet',
        path: 'combineModelSetParamSet',
        hidden: true,
        component: () => import('@/views/job/model/combineModelSet/paramSet'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combineModelSet'),
              path: 'combineModelSet'
            },
            {
              title: thatVue.$t('index.combineModelSetParamSet'),
              path: 'combineModelSetParamSet'
            }
          ],
          title: thatVue.$t('index.combineModelSetParamSet'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combineModelSet'
        }
      },
      {
        name: 'combinePredict',
        path: 'combinePredict',
        hidden: hiddenJobPage,
        component: () => import('@/views/job/model/combinePredict/index'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combinePredict'),
              path: 'combinePredict'
            }
          ],
          title: thatVue.$t('index.combinePredict'),
          icon: 'el-icon-s-operation'
        }
      },
      {
        name: 'combinePredictDetail',
        path: 'combinePredictDetail',
        hidden: true,
        component: () => import('@/views/job/model/detail/detail'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combinePredict'),
              path: 'combinePredict'
            },
            {
              title: thatVue.$t('index.combinePredictDetail'),
              path: 'combinePredictDetail'
            }
          ],
          title: thatVue.$t('index.combinePredictDetail'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combinePredict'
        }
      },
      {
        name: 'combinePredictCreate',
        path: 'combinePredictCreate',
        hidden: true,
        component: () => import('@/views/job/model/combinePredict/create'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combinePredict'),
              path: 'combinePredict'
            },
            {
              title: thatVue.$t('index.combinePredictCreate'),
              path: 'combinePredictCreate'
            }
          ],
          title: thatVue.$t('index.combinePredictCreate'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combinePredict'
        }
      },
      {
        name: 'combinePredictResult',
        path: 'combinePredictResult',
        hidden: true,
        component: () => import('@/views/job/compute/result'),
        meta: {
          bread: [
            {
              title: thatVue.$t('index.combinePredict'),
              path: 'combinePredict'
            },
            {
              title: thatVue.$t('index.combinePredictResult'),
              path: 'combinePredictResult'
            }
          ],
          title: thatVue.$t('index.combinePredictResult'),
          icon: 'el-icon-s-operation',
          activeMenu: '/job/combinePredict'
        }
      },
      {
        name: 'ciphertextMatch',
        path: 'ciphertextMatch',
        hidden: hiddenJobPage,
        component: () => import('@/views/job/ciphertextMatch'),
        meta: {
          bread: [],
          title: '密文匹配',
          icon: 'el-icon-s-operation'
        }
      },
      {
        name: 'createCiphertextMatch',
        path: 'createCiphertextMatch',
        hidden: true,
        component: () => import('@/views/job/ciphertextMatch/create'),
        meta: {
          bread: [
            {
              title: '密文匹配',
              path: 'ciphertextMatch'
            },
            {
              title: '新建匹配',
              path: 'createCiphertextMatch'
            }
          ],
          title: '新建匹配',
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ciphertextMatch'
        }
      },
      {
        name: 'ciphertextMatchDetail',
        path: 'ciphertextMatchDetail',
        hidden: true,
        component: () => import('@/views/job/ciphertextMatch/detail/detail'),
        meta: {
          bread: [
            {
              title: '密文匹配',
              path: 'ciphertextMatch'
            },
            {
              title: '匹配详情',
              path: 'createCiphertextMatch'
            }
          ],
          title: '匹配详情',
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ciphertextMatch'
        }
      },
      {
        name: 'matchResult',
        path: 'matchResult',
        hidden: true,
        component: () => import('@/views/job/compute/result'),
        meta: {
          bread: [
            {
              title: '密文匹配',
              path: 'ciphertextMatch'
            },
            {
              title: '匹配结果',
              path: 'createCiphertextMatch'
            }
          ],
          title: '匹配结果',
          icon: 'el-icon-s-operation',
          activeMenu: '/job/ciphertextMatch'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
