<template>
  <div>
    <el-card>
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
          <el-table-column show-overflow-tooltip :label="$t('job.jobId')">
            <template slot-scope="scope">
              <el-link type="primary" target="_blank" @click="goToJob(scope.row)">
                {{ scope.row.jobId }}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jobTitle"
            :label="$t('job.jobTitle')"
          />
          <el-table-column
            prop="jobAlgorithmType"
            :label="$t('algorithm.algorithmType')"
            width="145px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.jobAlgorithmType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jobCreator"
            :label="$t('common.jobCreator')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="initiatedAgencyId"
            :label="$t('job.initiatedAgencyId')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="initiatedAgencyName"
            :label="$t('job.initiatedAgencyName')"
          />
          <!-- <el-table-column
            show-overflow-tooltip
            prop="jobDescription"
            :label="$t('job.jobDescription')"
          /> -->
          <el-table-column :label="$t('job.createTime')">
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
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { uniqueAppend } from '@/utils/array'
import { queryAlgorithmJob } from '@/api/algorithm'
import { getPermissions } from '@/utils/auth'
import { check_permission, PermissionGroup, AlgoGroup } from '@/utils/permission'
export default {
  name: 'AlgorithmJob',
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d}')
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
      algorithmId: '',
      agencySet: [],
      jobTitleSet: [],
      controllerData: {
        disableWrite: true,
        searchButtonName: this.$t('job.index.searchButtonName'),
        createButtonName: this.$t('job.index.createButtonName'),
        startDate: 0,
        endDate: 0,
        keyFilterData: {
          initiatedAgencyName: null,
          receivedResultAgencyName: null,
          jobTitle: null
        }
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
          ownerUserName: null,
          createTime: null,
          allAuthStatus: null,
          jobStatus: null
        }
      ],
      jobsLoading: false,
      detailDialogVisible: false,
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
    onCreated() {
      if (!this.hasPermission()) {
        this.$message({
          message: 'Insufficient authority',
          type: 'warning'
        })
        this.$router.go(-1)
      } else {
        this.algorithmId = this.$route.query.algorithmId
        this.fetchAlgorithmJobs({ algorithmId: this.algorithmId, pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }
    },
    hasPermission() {
      if (check_permission(getPermissions(), PermissionGroup.ALGO_GROUP, AlgoGroup.WRITE_ALGO)) {
        this.controllerData.disableWrite = false
      }
      return check_permission(getPermissions(), PermissionGroup.ALGO_GROUP, AlgoGroup.LIST_ALGO)
    },
    fetchAlgorithmJobs(params) {
      this.jobs = []
      if (this.controllerData.startDate !== 0) {
        params.dateRangeStart = this.controllerData.startDate
      }
      if (this.controllerData.endDate !== 0) {
        params.dateRangeEnd = this.controllerData.endDate
      }
      this.jobsLoading = true
      queryAlgorithmJob(params).then(response => {
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
    goToJob(row) {
      const { jobAlgorithmType } = row
      switch (jobAlgorithmType) {
        case 'PPC_MATCH':
          this.$router.push({
            path: '/job/ciphertextMatchDetail',
            query: {
              jobId: row.jobId
            }
          })
          break
        default:
          this.$router.push({
            name: 'JobIndex',
            params: {
              jobId: row.jobId,
              jobAlgorithmType: row.jobAlgorithmType,
              jobStatus: row.jobStatus,
              jobCreator: row.jobCreator,
              jobResultReceiverList: row.jobResultReceiverList
            }
          })
      }
    },
    onCurrentPageChange(page) {
      this.currentPage = page
      this.fetchAlgorithmJobs({ algorithmId: this.algorithmId, pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevPage() {
      this.currentPage = this.currentPage - 1
      this.fetchAlgorithmJobs({ algorithmId: this.algorithmId, pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextPage() {
      this.currentPage = this.currentPage + 1
      this.fetchAlgorithmJobs({ algorithmId: this.algorithmId, pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    // suggestions for user inputs
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
