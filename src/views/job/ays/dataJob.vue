<template>
  <div>

    <el-row type="flex" justify="left" style="margin-top: 10px">
      <el-button icon="el-icon-back" @click="stepBack">{{
        $t("ays.data.last")
      }}</el-button>
    </el-row>
    <el-form label-position="right" label-width="120px" class="form">
      <el-form-item size="medium" />

      <el-form-item size="medium">
        <span>{{ $t('ays.job.sourceName') }}</span>
        <span>{{ ": " }}</span>
        <el-button type="text" @click="goToData">{{
          detail.datasetTitle
        }}</el-button>
        <!-- <span :style="{color: 'blue'}" @click="goToData">{{ detail.datasetTitle }}</span> -->
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.createUser') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.ownerUserName }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.createTime') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.createTime | formatDate }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.searchCount') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ total }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('dataset.rowCount') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.rowCount }}</span>
      </el-form-item>
      <el-form-item size="medium">
        <span>{{ $t('dataset.columnCount') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.columnCount }}</span>
      </el-form-item>
    </el-form>

    <el-card>
      <div slot="header" class="clearfix">
        <span>
          <b>{{ $t("ays.job.searchRecord") }}</b>
        </span>
      </div>
      <el-row>
        <el-table ref="jobTable" tooltip-effect="light" :data="jobs" fit stripe style="width: 100%">
          <!-- <el-table-column show-overflow-tooltip prop="jobTitle" :label="$t('ays.job.jobTitle')" /> -->

          <el-table-column show-overflow-tooltip prop="initiatedAgencyName" :label="$t('ays.job.searchAgency')" />

          <el-table-column show-overflow-tooltip prop="jobCreator" :label="$t('ays.job.searchName')" />

          <el-table-column :label="$t('ays.job.searchTime')">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDate }}</span>
            </template>
          </el-table-column>

        </el-table>
      </el-row>

      <el-row style="margin-top: 10px; text-align: center; height: 40px; width: 100%">
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

import { queryDatasetJob, queryDatasetDetail } from '@/api/dataset'

import { getPermissions } from '@/utils/auth'

import {
  check_permission,
  PermissionGroup,
  DataGroup
} from '@/utils/permission'

export default {
  name: 'AysDatasetJob',

  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }

      const date = new Date(time)

      return parseTime(date, '{y}-{m}-{d}')
    }

  },

  props: {},

  data() {
    return {
      that: this,

      datasetId: '',

      detail: {},

      pageSize: 10,

      currentPage: 1,

      paginationTotal: 0,

      deployCache: null,

      operationKey: 0,

      total: 0,

      jobs: [
        {

          jobTitle: null,

          ownerUserName: null,

          createTime: null

        }
      ]

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
        this.datasetId = this.$route.query.datasetId
        this.fetchDetail()
        this.fetchDatasetJobs({
          datasetId: this.datasetId,
          pageOffset: (this.currentPage - 1) * this.pageSize,
          pageSize: this.pageSize
        })
      }
    },

    hasPermission() {
      if (
        check_permission(
          getPermissions(),
          PermissionGroup.DATA_GROUP,
          DataGroup.WRITE_DATA)) {
        return check_permission(
          getPermissions(),
          PermissionGroup.DATA_GROUP,
          DataGroup.LIST_DATA
        )
      }
    },
    stepBack() {
      this.$router.go(-1)
    },
    fetchDetail() {
      queryDatasetDetail(this.datasetId).then(response => {
        this.detail = response.data
      })
    },

    fetchDatasetJobs(params) {
      this.jobs = []
      params.jobAlgorithmTypeList = 'PPC_AYS'

      queryDatasetJob(params)
        .then((response) => {
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }

          this.jobs = response.data.content
          this.total = response.data.total

          for (var i = 0; i < this.jobs.length; i++) {
            uniqueAppend(this.jobTitleSet, this.jobs[i].jobTitle)
          }

          this.paginationTotal = response.data.total

          this.deployCache = new Array(this.paginationTotal)

          this.currentPage = params.pageOffset / params.pageSize + 1
        })
        .catch((_) => {
        })
    },

    onCurrentPageChange(page) {
      this.currentPage = page

      this.fetchDatasetJobs({
        datasetId: this.datasetId,
        pageOffset: (this.currentPage - 1) * this.pageSize,
        pageSize: this.pageSize
      })
    },

    onPrevPage() {
      this.currentPage = this.currentPage - 1

      this.fetchDatasetJobs({
        datasetId: this.datasetId,
        pageOffset: (this.currentPage - 1) * this.pageSize,
        pageSize: this.pageSize
      })
    },

    onNextPage() {
      this.currentPage = this.currentPage + 1

      this.fetchDatasetJobs({
        datasetId: this.datasetId,
        pageOffset: (this.currentPage - 1) * this.pageSize,
        pageSize: this.pageSize
      })
    },

    goToData() {
      this.$router.push({
        path: '/job/ays/dataDetail',
        query: {
          datasetId: this.datasetId
        }
      })
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
