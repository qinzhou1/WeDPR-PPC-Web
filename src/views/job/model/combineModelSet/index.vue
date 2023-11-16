<template>
  <div>
    <el-card>
      <el-row>
        <controller-form
          ref="controller-from"
          :controller="controllerData"
          @search-click="onSearch"
          @create-click="onCreate"
        >
          <template slot="keyFilter">
            <el-form inline class="demo-form-inline" size="medium">
              <el-form-item :label="$t('job.jobTitle')">
                <el-autocomplete
                  v-model="controllerData.keyFilterData.jobTitle"
                  :fetch-suggestions="fetchAgencySuggestions"
                  :placeholder="$t('job.jobTitleTip')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onSearch"
                />
              </el-form-item>

              <el-form-item :label="$t('algorithm.algorithmType')">
                <el-select
                  v-model="controllerData.keyFilterData.jobAlgorithmSubtype"
                  clearable
                  style="width: 250px"
                  :placeholder="$t('job.jobModelTypeTips')"
                >
                  <el-option v-for="item in algorithmTypes" :key="item.value" :value="item.value" :label="$t(item.label)" />
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </controller-form>
      </el-row>
      <el-row>
        <el-table
          ref="jobTable"
          v-loading="jobsLoading"
          tooltip-effect="light"
          :data="jobs"
          fit
          stripe
          style="width: 100%"
        >
          <el-table-column
            show-overflow-tooltip
            prop="jobId"
            :label="$t('job.jobId')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="jobTitle"
            :label="$t('job.jobTitle')"
          />
          <el-table-column
            prop="jobAlgorithmSubtype"
            :label="$t('algorithm.algorithmType')"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ $t( algorithmTypesObj[scope.row.jobAlgorithmSubtype]) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jobCreator"
            width="120px"
            :label="$t('common.jobCreator')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="initiatedAgencyId"
            width="120px"
            :label="$t('job.initiatedAgencyId')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="initiatedAgencyName"
            width="120px"
            :label="$t('job.initiatedAgencyName')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="jobResultReceiverList[0]"
            width="120px"
            :label="$t('job.receivedResultAgencyName')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="jobDescription"
            :label="$t('job.jobDescription')"
          />
          <el-table-column align="center" :label="$t('job.jobPriority')" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.jobPriority | jobPriorityFilter(that) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('job.createTime')" width="120px">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDate }}</span>
            </template>
          </el-table-column>
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
            :key="operationKey"
            align="center"
            width="250px"
            fixed="right"
            :label="$t('job.index.operation')"
          >
            <template slot-scope="scope">
              <el-button
                :disabled="!ableShowResult(scope.row)"
                size="medium"
                type="primary"
                @click.stop="reBuild(scope.row)"
              >{{ $t("job.index.reoperation") }}</el-button>
              <el-button
                :disabled="!ableRerun(scope.row)"
                size="medium"
                type="primary"
                @click.stop="onClickRerun(scope.row)"
              >{{ $t("job.index.rerun") }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            fixed="right"
            :label="$t('job.index.detail')"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="medium"
                style="font-size: 18px"
                class="el-icon-info"
                @click.stop="
                  showJobDetailByColumn(scope.row.jobId)
                "
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            fixed="right"
            :label="$t('job.index.result')"
          >
            <template slot-scope="scope">
              <el-button
                v-if="ableShowResult(scope.row)"
                type="text"
                size="medium"
                style="font-size: 18px"
                class="el-icon-chat-dot-round"
                @click.stop="
                  showJobResultByColumn(
                    scope.row.jobId,
                    scope.row.jobAlgorithmType
                  )
                "
              />
              <el-button
                v-else
                disabled
                type="text"
                style="font-size: 18px"
                size="medium"
                class="el-icon-chat-dot-round"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row
        style="margin-top: 10px; text-align: center; height: 40px; width: 100%"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="paginationTotal"
          @current-change="onCurrentPageChange"
          @prev-click="onPrevPage"
          @next-click="onNextPage"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>

import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { queryJobs, rerunJob, queryJobDetail } from '@/api/job'
import { listAgencies } from '@/api/agency'
import { getAgencyId, getAgencyName, getUsername, getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS, check_permission, PermissionGroup, JobGroup } from '@/utils/permission'
import { algorithmTypes, algorithmTypesObj } from '@/utils/codeSheet.js'
import ControllerForm from '@/components/Controller'

export default {
  name: 'JobManager',
  components: {
    ControllerForm
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d}')
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
  props: {},
  data() {
    return {
      that: this,
      timer: null,
      agencySet: [],
      jobTitleSet: [],
      algorithmTypes,
      algorithmTypesObj,
      controllerData: {
        disableWrite: true,
        searchButtonName: this.$t('job.index.searchButtonName'),
        createButtonName: this.$t('job.new.createModel'),
        startDate: 0,
        endDate: 0,
        keyFilterData: {
          jobAlgorithmSubtype: '',
          jobTitle: ''
        },
        jobModelTypeList: [
          {
            label: this.$t('job.heter'),
            value: 'heter'
          },
          {
            label: this.$t('job.homo'),
            value: 'homo'
          }
        ]
      },
      pageSize: 10,
      currentPage: 1,
      paginationTotal: 0,
      deployCache: null,
      operationKey: 0,
      jobs: [
        {
          jobId: null,
          jobTitle: null,
          jobDescription: null,
          jobPriority: null,
          ownerUserName: null,
          createTime: null,
          allAuthStatus: null,
          jobStatus: null
        }
      ],
      jobsLoading: false,
      resultDialogVisible: false,
      jobId: null,
      jobAlgorithmType: null,
      jobStatus: null,
      jobCreator: null,
      jobResultReceiverList: []
    }
  },
  created() {
    this.onCreated()
  },
  mounted() { },
  methods: {
    reBuild(data) {
      const { jobId = '' } = data
      this.$router.push({ path: 'combineModelSetParamSet', query: { jobId }})
    },
    onCreated() {
      if (!this.hasPermission()) {
        this.$message({
          message: 'Insufficient authority',
          type: 'warning'
        })
        this.$router.go(-1)
      } else {
        if (this.$route.params.jobId && this.$route.params.jobAlgorithmType) {
          this.jobId = this.$route.params.jobId
          this.jobAlgorithmType = this.$route.params.jobAlgorithmType
          this.jobStatus = this.$route.params.jobStatus
          this.jobCreator = this.$route.params.jobCreator
          this.jobResultReceiverList = this.$route.params.jobResultReceiverList
          this.fetchJobDetailPolling(this.jobId)
        } else {
          this.fetchAgencyList()
          this.fetchJobs({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
        }
      }
    },
    hasPermission() {
      if (check_permission(getPermissions(), PermissionGroup.JOB_GROUP, JobGroup.WRITE_JOB)) {
        this.controllerData.disableWrite = false
      }
      return check_permission(getPermissions(), PermissionGroup.JOB_GROUP, JobGroup.LIST_JOB)
    },
    ableRerun(row) {
      if (row.jobCreator === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS)) {
        return row.jobStatus === 'FAILED' && row.initiatedAgencyName === getAgencyName()
      }
      return false
    },
    ableShowResult(row) {
      if (row.jobCreator === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS)) {
        return row.jobStatus === 'SUCCEED' && row.jobResultReceiverList[0] === getAgencyId()
      }
      return false
    },
    onSearch() {
      var params = {}
      params.pageOffset = 0
      params.pageSize = this.pageSize
      this.fetchJobs(params)
    },
    onCreate() {
      this.$router.push({ path: 'combineModelSetCreate' })
    },
    fetchAgencyList() {
      listAgencies().then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        const nodes = response.data.content
        for (var i = 0; i < nodes.length; i++) {
          this.agencySet.push(nodes[i].agencyName)
        }
      })
    },
    fetchJobDetailPolling(jobid) {
      this.timer = setInterval(() => {
        queryJobDetail(jobid).then(response => {
          if (response.errorCode === 0) {
            // this.detailDialogVisible = true
            clearTimeout(this.timer)
            return
          }
        }).catch(_ => {
          clearTimeout(this.timer)
        })
      }, 700)
    },
    fetchJobs(params) {
      this.jobs = []
      if (this.controllerData.keyFilterData.jobAlgorithmSubtype) {
        params.jobAlgorithmSubtype = this.controllerData.keyFilterData.jobAlgorithmSubtype
      }
      if (this.controllerData.keyFilterData.jobTitle) {
        params.jobTitle = this.controllerData.keyFilterData.jobTitle
      }
      // 建模对应的任务类型
      params.jobAlgorithmTypeList = 'PPC_TRAIN'
      this.jobsLoading = true
      queryJobs(params).then(response => {
        this.jobsLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobs = response.data.content
        for (var i = 0; i < this.jobs.length; i++) {
          uniqueAppend(this.jobTitleSet, this.jobs[i].jobTitle)
        }

        this.paginationTotal = response.data.total
        this.deployCache = new Array(this.paginationTotal)
        this.currentPage = (params.pageOffset / params.pageSize) + 1
      }).catch(_ => {
        this.jobsLoading = false
      })
    },
    showJobDetailByColumn(jobId) {
      this.$router.push({ path: 'combineModelSetDetail', query: { jobId }})
    },
    showJobResultByColumn(jobId, jobAlgorithmType) {
      this.$router.push({ path: 'combineModelSetResult', query: { jobId, jobAlgorithmType }})
    },
    onClickRerun(job) {
      var confirmMsg = this.$t('job.index.confirmRerun')
      this.$confirm(confirmMsg, this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        rerunJob(job.jobId).then(response => {
          if (handleOptResponseMsgBox(this, response, true, this.$t('job.index.runTip'))) {
            this.showJobDetailByColumn(job.jobId)
          }
        })
      })
    },
    onCurrentPageChange(page) {
      this.currentPage = page
      this.fetchJobs({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevPage() {
      this.currentPage = this.currentPage - 1
      this.fetchJobs({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextPage() {
      this.currentPage = this.currentPage + 1
      this.fetchJobs({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    // suggestions for user inputs
    fetchAgencySuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.uniqueArr(this.agencySet))
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // callback to show suggested words
      cb(results)
    },
    fetchTitleSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.jobTitleSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    uniqueArr(arr) {
      var res = []
      for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
          res.push(arr[i])
        }
      }
      return res
    }
  }
}
</script>

    <style lang="scss" scoped>
    </style>

