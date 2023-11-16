<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="show-box" @click="jumpToAgencyPage()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.agencyCount") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/agency.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ agencyCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-box" @click="jumpToJobPage()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.jobCount") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/job_total.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ jobCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <!-- </el-row>
    <el-row :gutter="10" style="margin-top: 10px"> -->
      <el-col :span="6">
        <div class="show-box" @click="jumpToJobPage()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.initiatedJobs") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/job_init.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ jobInitiatorCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-box" @click="jumpToJobPage()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.jobFinishCount") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/job_done.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ jobFinishCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="6">
        <div class="show-box" @click="jumpToDataPage()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.myDatasets") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/data_self.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ myDatasetCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-box" @click="jumpToDataPage2()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.datasets") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/data_total.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ datasetCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <!-- </el-row>
    <el-row :gutter="10" style="margin-top: 10px"> -->
      <el-col :span="6">
        <div class="show-box" @click="jumpToAlgorithmPage()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.myAlgorithms") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/algo_self.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ myAlgorithmCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-box" @click="jumpToAlgorithmPage2()">
          <el-card>
            <el-row>
              <el-col :span="16">
                <el-row>
                  <div style="font-size: 15px; font-weight: bolder">
                    {{ $t("homepage.algorithms") }}
                  </div>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 50px; height: 50px; float: right"
                  :src="require('@/assets/algo_total.svg')"
                  fit="fill"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-button type="text">
                <div
                  style="
                    margin-top: 40px;
                    font-size: 32px;
                    font-weight: bolder;
                    display: inline-block;
                  "
                >
                  {{ algorithmCount }}
                </div>
              </el-button>
              <div style="margin-left: 3px; display: inline-block">
                {{ $t("homepage.unit") }}
              </div>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 20px">
      <el-col :span="24">
        <el-card style="overflow-y: auto">
          <el-table
            ref="serverTable"
            :data="serversInfo"
            fit
            stripe
            style="width: 100%"
            tooltip-effect="light"
          >
            <el-table-column
              show-overflow-tooltip
              prop="name"
              :label="$t('homepage.serviceName')"
            />
            <el-table-column
              show-overflow-tooltip
              prop="description"
              :label="$t('homepage.serviceDescription')"
            />
            <el-table-column :label="$t('homepage.serviceStatus')">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status | tagFilter"
                  align="center"
                  effect="light"
                  style="width: 90px"
                >{{ scope.row.status | textFilter(that) }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  queryAuthServerStatus,
  queryManagerServerStats
} from '@/api/servers'

export default {
  name: 'Homepage',
  components: {},
  filters: {
    tagFilter(status) {
      if (typeof status === 'undefined' || status === null) {
        return 'danger'
      } else if (status === 0) {
        return 'success'
      } else {
        return 'danger'
      }
    },
    textFilter(status, that) {
      if (typeof status === 'undefined' || status === null) {
        return that.$t('status.abnormal')
      } else if (status === 0) {
        return that.$t('status.normal')
      } else {
        return that.$t('status.abnormal')
      }
    }
  },
  props: {},
  data() {
    return {
      that: this,
      jobCount: 0,
      jobInitiatorCount: 0,
      jobFinishCount: 0,
      agencyCount: 0,
      datasetCount: 0,
      myDatasetCount: 0,
      algorithmCount: 0,
      myAlgorithmCount: 0,
      serversInfo: [
        {
          name: null,
          description: null,
          status: null
        }
      ]
    }
  },
  created() {
    this.fetchServersStatus()
  },
  methods: {
    jumpToAgencyPage() {
      this.$router.push({ path: '/agency/index' })
    },
    jumpToJobPage() {
      this.$router.push({ path: '/job/compute/index' })
    },
    jumpToDataPage() {
      this.$router.push({ path: '/dataset/index' })
    },
    jumpToDataPage2() {
      this.$router.push({
        path: '/dataset/index',
        query: { tabActiveName: 'all' }
      })
    },
    jumpToAlgorithmPage() {
      this.$router.push({ path: '/algorithm/index' })
    },
    jumpToAlgorithmPage2() {
      this.$router.push({
        path: '/algorithm/index',
        query: { tabActiveName: 'all' }
      })
    },
    fetchServersStatus() {
      this.serversInfo = []
      this.fetchAuthServerStatus()
      this.fetchManagerServerStats()
    },
    fetchAuthServerStatus() {
      queryAuthServerStatus().then(response => {
        var serverInfo = {}
        serverInfo.name = this.$t('homepage.serviceNames.authService')
        serverInfo.status = -1

        if (!response) {
          serverInfo.description = '[ errorCode:  500 ] ' + this.$t('common.nullResponse')
        } else if (response.errorCode !== 0) {
          serverInfo.description = '[ errorCode: ' + response.errorCode + ' ] ' + response.message
        } else {
          serverInfo.description = response.data
          serverInfo.status = 0
        }
        this.serversInfo.push(serverInfo)
      })
    },
    fetchManagerServerStats() {
      queryManagerServerStats().then(response => {
        var serverInfo = {
          name: this.$t('homepage.serviceNames.managerService'),
          status: -1
        }

        var issInfo = {
          name: '同步服务',
          description: '基于区块链同步机构间非隐私信息',
          status: -1
        }

        if (!response) {
          serverInfo.description = '[ errorCode:  500 ] ' + this.$t('common.nullResponse')
        } else if (response.errorCode !== 0) {
          serverInfo.description = '[ errorCode: ' + response.errorCode + ' ] ' + response.message
        } else {
          serverInfo.description = response.data.serverDescription
          serverInfo.status = response.data.serverStatus
          issInfo.status = 0

          this.jobCount = response.data.jobCount
          this.jobInitiatorCount = response.data.jobInitiatorCount
          this.jobFinishCount = response.data.jobFinishCount
          this.agencyCount = response.data.agencyCount
          this.datasetCount = response.data.datasetCount
          this.myDatasetCount = response.data.myDatasetCount
          this.algorithmCount = response.data.algorithmCount
          this.myAlgorithmCount = response.data.myAlgorithmCount
        }
        this.serversInfo.push(serverInfo)
        this.serversInfo.push(issInfo)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.show-box {
  cursor: pointer;
  border: 1px solid #fcfcfc;
  border-radius: 4px;
  &:hover {
    border: 1px solid rgb(198, 226, 255);
    border-radius: 4px;
    transition: 0.1s;
  }
}

table {
  td {
    line-height: 20px;
    font-size: 14px;
    min-width: 180px;
    vertical-align: top;
    border-radius: 4px;
  }
}
</style>
