<template>
  <div v-loading="viewLoading">
    <el-tabs v-model="tabsValue" type="card" @tab-click="handleTabClick">
      <el-tab-pane :label="$t('job.jobDetail.basicInfo')" name="BASIC">
        <el-row type="flex">
          <el-col :span="24">
            <el-form label-position="right" label-width="120px" class="form">
              <el-form-item :label="$t('job.jobTitle')" size="medium">
                <span>{{ jobDetail.jobTitle }}</span>
              </el-form-item>
              <el-form-item :label="$t('job.jobId')" size="medium">
                <span>{{ jobDetail.jobId }}</span>
              </el-form-item>
              <el-form-item :label="$t('common.jobCreator')" size="medium">
                <span>{{ jobDetail.jobCreator }}</span>
              </el-form-item>
              <el-form-item
                :label="$t('job.initiatedAgencyName')"
                size="medium"
              >
                <span>{{ jobDetail.initiatedAgencyName }}</span>
              </el-form-item>
              <el-form-item :label="$t('job.initiatedAgencyId')" size="medium">
                <span>{{ jobDetail.initiatedAgencyId }}</span>
              </el-form-item>
              <el-form-item
                :label="$t('job.receivedResultAgencyName')"
                size="medium"
              >
                <span>{{ jobresultreceiverlist[0] }}</span>
              </el-form-item>

              <el-form-item :label="$t('job.createTime')" size="medium">
                <span>{{ jobDetail.createTime | formatDate }}</span>
              </el-form-item>

              <div v-if="showResult">
                <el-form-item :label="$t('job.jobResult.elapsedTime')">
                  <span>{{ jobResult.elapsedTime }}s</span>
                </el-form-item>
                <el-form-item
                  v-if="jobResult.trafficVolume > 0"
                  :label="$t('job.jobResult.trafficVolume')"
                >
                  <span>{{ jobResult.trafficVolume }}MB</span>
                </el-form-item>
                <el-form-item :label="$t('job.jobResult.outputFileLink')">
                  <div>
                    <el-button
                      type="text"
                      @click="downloadFile(jobid, 'mpc_result.csv')"
                    >{{ "mpc_result.csv" }}</el-button>
                  </div>
                </el-form-item>
              </div>
              <el-form-item :label="$t('algorithm.algorithmId')" size="medium">
                <el-link
                  type="primary"
                  target="_blank"
                  @click="goToAlgorithm()"
                >{{ jobDetail.jobAlgorithm.algorithmId }}</el-link>
              </el-form-item>
              <!-- <el-form-item
                  :label="$t('job.jobDetail.algorithmTitle')"
                  size="medium"
                >
                  <span>{{ jobDetail.jobAlgorithm.algorithmTitle }}</span>
                </el-form-item> -->
              <el-form-item
                :label="$t('algorithm.algorithmVersion')"
                size="medium"
              >
                <span>{{ jobDetail.jobAlgorithm.algorithmVersion }}</span>
              </el-form-item>
              <el-form-item
                :label="$t('algorithm.algorithmType')"
                size="medium"
              >
                <template>
                  <span>{{ jobDetail.jobAlgorithm.algorithmType }}</span>
                </template>
              </el-form-item>
              <el-form-item :label="$t('job.jobDescription')">
                <el-input
                  v-model="jobDetail.jobDescription"
                  :autosize="{ minRows: 1, maxRows: 5 }"
                  type="textarea"
                  readonly
                  style="margin-bottom: 10px"
                />
              </el-form-item>
              <el-form-item :label="$t('job.jobPriority')">
                <span>
                  {{ jobDetail.jobPriority | jobPriorityFilter(that) }}
                </span>
              </el-form-item>
              <el-form-item v-if="progress >= 0" :label="$t('job.jobStatus')">
                <el-tag
                  effect="light"
                  align="center"
                  :type="jobstatus | jobStatusTagFilter"
                >{{ jobstatus | jobStatusTextFilter(that) }}</el-tag>
              </el-form-item>
              <el-form-item
                v-if="progress >= 0"
                :label="$t('job.jobDetail.progress')"
              >
                <el-row>
                  <el-col :span="22">
                    <div style="margin-top: 10px">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="22"
                        :percentage="progress"
                        :status="progressStatus"
                      />
                    </div>
                  </el-col>
                  <el-col :offset="1" :span="1">
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="$t('job.index.killJob')"
                      placement="top"
                    >
                      <el-button
                        v-if="progress >= 0"
                        type="danger"
                        size="mini"
                        icon="el-icon-close"
                        circle
                        @click.stop="onClickKill"
                      />
                    </el-tooltip>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="24">
            <el-card shadow="never" style="margin-top: 10px">
              <div slot="header" class="clearfix">
                <span>
                  <b>{{ $t("job.jobDetail.dataset") }}</b>
                </span>
              </div>
              <el-table
                :data="jobDetail.jobDatasetProviderList"
                fit
                stripe
                tooltip-effect="light"
              >
                <el-table-column
                  show-overflow-tooltip
                  prop="datasetId"
                  :label="$t('dataset.datasetId')"
                ><template slot-scope="scope">
                  <el-link
                    type="primary"
                    target="_blank"
                    @click="goToDataset(scope.row.datasetId)"
                  >{{ scope.row.datasetId }}
                  </el-link>
                </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="datasetTitle"
                  :label="$t('dataset.datasetTitle')"
                />
                <el-table-column
                  show-overflow-tooltip
                  prop="agencyId"
                  :label="$t('agency.agencyId')"
                />
                <el-table-column
                  prop="loadingIndex"
                  sortable
                  :label="$t('algorithm.sourceIndex')"
                />
              </el-table>
            </el-card>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-button v-if="isOwner()" type="danger" @click="onDeleteJob()">{{
            $t("job.deleteJob")
          }}</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-if="showLog" name="LOG" :label="$t('job.jobDetail.log')">
        <div v-if="jobDetail.logText">
          <el-input
            v-model="jobDetail.logText"
            :autosize="{ minRows: 10, maxRows: 25 }"
            type="textarea"
            style="margin-bottom: 10px"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="showWorkflow"
        name="FLOW"
        :label="$t('job.jobDetail.workflowView')"
      >
        <div v-if="workflowView">
          <el-image
            style="width: 100%; height: 100%"
            :src="workflowView"
            :preview-src-list="srcList"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="showAudit"
        name="AUDIT"
        :label="$t('job.jobDetail.audit')"
      >
        <div v-if="jobDetail.audit">
          <el-form label-position="right" class="form">
            <el-form-item :label="$t('job.jobId')" size="medium">
              <span>{{ jobDetail.jobId }}</span>
            </el-form-item>
            <el-form-item :label="$t('job.jobTitle')" size="medium">
              <span>{{ jobDetail.jobTitle }}</span>
            </el-form-item>
          </el-form>
          <el-table
            :data="jobDetail.audit.jobAuditInfoList"
            fit
            stripe
            tooltip-effect="light"
          >
            <el-table-column
              show-overflow-tooltip
              prop="agencyId"
              :label="$t('agency.agencyId')"
            />
            <el-table-column
              show-overflow-tooltip
              prop="agency_name"
              :label="$t('agency.agencyName')"
            />
            <el-table-column
              show-overflow-tooltip
              prop="userRole"
              :label="$t('user.userRole')"
            />
            <el-table-column align="center" :label="$t('job.jobStatus')">
              <template slot-scope="scope">
                <el-tag
                  effect="light"
                  align="center"
                  :type="scope.row.jobStatus | jobStatusTagFilter()"
                >{{ scope.row.jobStatus | jobStatusTextFilter(that) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="input_dataset_hash"
              :label="$t('job.jobDetail.inputDatasetHash')"
            />
            <el-table-column
              show-overflow-tooltip
              prop="psi_input_hash"
              :label="$t('job.jobDetail.psiInputHash')"
            />
            <el-table-column
              show-overflow-tooltip
              prop="psi_output_hash"
              :label="$t('job.jobDetail.psiOutputHash')"
            />
            <el-table-column
              v-if="jobalgorithmtype !== 'PPC_PSI'"
              show-overflow-tooltip
              prop="mpc_result_hash"
              :label="$t('job.jobDetail.mpcResultHash')"
            />
            <el-table-column
              :label="$t('job.jobDetail.updateTime')"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | formatDate }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="showResult" :label="$t('job.jobResult.title')">
        <ai-result v-if="jobalgorithmtype === 'PPC_TRAIN'" :jobid="jobid" />
        <base-result v-if="jobalgorithmtype !== 'PPC_TRAIN'" :jobid="jobid" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { queryJobDetail, queryJobResult, downloadJobResult, queryJobAudit, queryJobLog, queryJobProgress, queryWorkflow, killJob, deleteJob } from '@/api/job'
import { downloadAs } from '@/utils/download'
import { getAgencyName, getAgencyId, getUsername, getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS } from '@/utils/permission'
import { downloadAsFile } from '@/utils/download'
import { Base64 } from 'js-base64'
import BaseResult from '@/views/job/compute/baseResult'
import AiResult from '@/views/job/compute/aiResultNew'

export default {
  name: 'JobDetail',
  components: {
    BaseResult,
    AiResult
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, null)
    },
    jobPriorityFilter(jobPriority, that) {
      if (jobPriority === 0) {
        return that.$t('job.highPriority')
      } else if (jobPriority === 1) {
        return that.$t('job.mediumPriority')
      } else {
        return that.$t('job.lowPriority')
      }
    },
    jobStatusTagFilter(status) {
      if (typeof status === 'undefined' || status === null) {
        return 'info' // UNKNOWN
      } else if (status === 'WAITING') {
        return 'info' // NOT_STARTED
      } else if (status === 'RUNNING') {
        return '' // RUNNING
      } else if (status === 'SUCCEED') {
        return 'success' // SUCCESS
      } else if (status === 'FAILED') {
        return 'danger' // FAILURE
      } else {
        return 'info'
      }
    },
    jobStatusTextFilter(status, that) {
      if (typeof status === 'undefined' || status === null) {
        return that.$t('status.abnormal')
      } else if (status === 'WAITING') {
        return that.$t('status.waiting')
      } else if (status === 'RUNNING') {
        return that.$t('status.running')
      } else if (status === 'SUCCEED') {
        return that.$t('status.success')
      } else if (status === 'FAILED') {
        return that.$t('status.failure')
      } else {
        return that.$t('status.abnormal')
      }
    }
  },
  props: {
  },
  data() {
    return {
      that: this,
      timer: null,
      viewLoading: true,
      tabsValue: 'BASIC',
      showLog: false,
      showAudit: false,
      showWorkflow: false,
      showResult: false,
      srcList: [],
      progress: -1,
      workflowView: null,
      progressStatus: 'success',
      jobDetail:
        {
          ownerUserName: null,
          jobId: null,
          jobTitle: null,
          jobAlgorithm: {},
          createTime: null,
          jobDescription: null,
          initiatedAgencyName: null,
          dataset: [{
            ownerAgencyId: null,
            datasetId: null,
            datasetTitle: null,
            authStatus: null
          }],
          audit: {
            jobId: null,
            jobTitle: null,
            jobAuditInfoList: [{
              agencyId: null,
              agency_name: null,
              userName: null,
              userRole: null,
              jobStatus: null,
              input_dataset_hash: null,
              psi_input_hash: null,
              psi_output_hash: null,
              mpc_result_hash: null,
              createTime: null,
              updateTime: null
            }]
          }
        },
      jobid: '',
      jobalgorithmtype: '',
      jobstatus: 'WAITING',
      jobcreeator: '',
      jobresultreceiverlist: [''],
      jobResult: {}
    }
  },
  created() {
    this.onCreate()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    goToDataset(datasetId) {
      this.$router.push({
        path: '/dataset/detail',
        query: {
          datasetId: datasetId
        }
      })
    },
    goToAlgorithm() {
      this.$router.push({
        path: '/algorithm/detail',
        query: {
          algorithmId: this.jobDetail.jobAlgorithm.algorithmId,
          algorithmVersion: this.jobDetail.jobAlgorithm.algorithmVersion
        }
      })
    },
    loadAgencyName() {
      return getAgencyName()
    },
    onCreate() {
      const { jobId } = this.$route.query
      this.jobid = jobId
      this.fetchDetail()
    },
    isOwner() {
      return this.jobcreeator === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS)
    },
    onDeleteJob() {
      this.$confirm(this.$t('job.deleteChecking'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        deleteJob(this.jobid).then(response => {
          if (handleOptResponseMsgBox(this, response, true)) {
            this.$router.go(-1)
          }
        })
      })
    },
    handleTabClick() {
      if (this.tabsValue === 'LOG' && !this.jobDetail.logText) {
        this.fetchLog()
      } else if (this.tabsValue === 'AUDIT' && !this.jobDetail.audit) {
        this.fetchAudit()
      } else if (this.tabsValue === 'FLOW' && !this.workflowView) {
        this.fetchWorkflow()
      }
    },
    ableShowResult() {
      if (this.jobstatus === 'SUCCEED' && this.jobresultreceiverlist[0] === getAgencyId()) {
        return this.jobcreeator === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS)
      }
      return false
    },
    downloadFromUrl(url, asFileName) {
      downloadAs(url, asFileName)
    },
    enableShowMore(status) {
      if (this.jobcreeator === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS)) {
        this.showLog = true
      }
      if (status === 'SUCCEED') {
        this.showAudit = true
      }
      this.showWorkflow = true
    },
    fetchLog() {
      queryJobLog(this.jobid).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobDetail.logText = response.data.logText
        this.$forceUpdate()
      })
    },
    fetchAudit() {
      const params = { jobId: this.jobid }
      queryJobAudit(params).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobDetail.audit = response.data
        this.$forceUpdate()
      })
    },
    fetchWorkflow() {
      queryWorkflow(this.jobid).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        var srcPrefix = response.data.srcPrefix
        var encodedImage = response.data.encodedImage
        this.workflowView = srcPrefix + encodedImage
        this.srcList = [this.workflowView]
      })
    },
    fetchDetail() {
      this.viewLoading = true
      queryJobDetail(this.jobid).then(response => {
        this.viewLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        const { jobAlgorithm = {}, jobStatus, jobCreator, jobResultReceiverList } = response.data
        this.jobalgorithmtype = jobAlgorithm.algorithmType
        this.jobstatus = jobStatus
        this.jobcreeator = jobCreator
        this.jobresultreceiverlist = [...jobResultReceiverList]
        this.jobDetail = response.data
        this.fetchJobProgress()
        this.showResult = this.ableShowResult()
        this.showResult && this.fetchResult()
        if (this.jobstatus === 'SUCCEED' || this.jobstatus === 'FAILED') {
          this.enableShowMore(this.jobstatus)
        }
      }).catch(_ => {
        this.viewLoading = false
      })
    },
    fetchJobProgress() {
      var needFetch = false
      if (this.jobstatus === 'WAITING' || this.jobstatus === 'RUNNING' || this.jobstatus === 'SUCCEED') {
        needFetch = true
        this.progressStatus = 'success'
      } else if (this.jobstatus === 'FAILED') {
        needFetch = true
        this.progressStatus = 'exception'
      }
      if (needFetch) {
        this.queryJobProgressPolling()
      }
    },
    fetchResult() {
      queryJobResult(this.jobid).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobResult = response.data.jobPlanetResult
      })
    },
    downloadFile(jobId, fileName) {
      downloadJobResult(jobId).then(response => {
        downloadAsFile(Base64.decode(response.data), fileName)
      })
    },
    queryJobProgressPolling() {
      this.timer = setInterval(() => {
        queryJobProgress(this.jobid).then(response => {
          if (!handleFetchResponseMsgBox(this, response, false)) {
            clearTimeout(this.timer)
            return
          }

          this.jobstatus = response.data.jobStatus
          if (this.jobstatus === 'SUCCEED') {
            this.progressStatus = 'success'
            this.showResult = this.ableShowResult()
            clearTimeout(this.timer)
            this.enableShowMore('SUCCEED')
          } else if (this.jobstatus === 'FAILED') {
            this.progressStatus = 'exception'
            clearTimeout(this.timer)
            this.enableShowMore('FAILED')
          }

          if (!response.data.jobUnits) {
            this.progress = 0
            return
          }

          this.countPencentage(response.data.jobUnits)
        }).catch(_ => {
          clearTimeout(this.timer)
        })
      }, 700)
    },
    countPencentage(jobUnits) {
      var total = jobUnits.length
      if (total === 0) {
        this.progress = 0
        return
      }

      var num = 0
      for (const i in jobUnits) {
        if (jobUnits[i].status !== 'NOT_STARTED') {
          num += 1
        }
      }
      this.progress = parseInt(num / total * 100)
    },
    onClickKill() {
      this.$confirm(this.$t('job.index.confirmKill'), this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        killJob(this.jobDetail.jobId).then(response => {
          handleOptResponseMsgBox(this, response, true, this.$t('job.index.killTip'))
        })
      })
    }
  }
}

</script>

  <style lang="scss" scoped>
  body {
    margin: 0;
  }
.el-tab-pane{
  padding: 0 20px;
  box-sizing: border-box;
}
  .form {
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-input {
      margin-right: 10px;
      width: 100%;
    }
  }
  </style>

