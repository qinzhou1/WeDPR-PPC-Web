<template>
  <div>
    <div>
      <el-row type="flex">
        <el-col :span="24">
          <el-form label-position="right" label-width="120px" class="form">
            <el-form-item :label="$t('job.index.requirer')">
              <span>{{ jobResultDetail.initiatedAgencyName }}</span>
            </el-form-item>
            <el-form-item :label="$t('job.index.dataProvider')">
              <span>{{ jobResultDetail.jobDatasetProviderAgencyName }}</span>
            </el-form-item>
            <el-form-item :label="$t('job.index.searchRuls')">
              <span>{{ jobResultDetail.jobAlgorithmTitle }}</span>
            </el-form-item>
            <el-form-item :label="$t('ays.index.newTime')">
              <span>{{ jobResultDetail.createTime | formatDate }}</span>
            </el-form-item>
            <el-form-item :label="$t('job.jobStatus')">
              <el-tag
                effect="light"
                align="center"
                :type="jobResultDetail.jobStatus | jobStatusTagFilter"
              >{{
                jobResultDetail.jobStatus | jobStatusTextFilter(that)
              }}</el-tag>
            </el-form-item>
            <el-form-item :label="$t('job.jobResult.elapsedTime')">
              <span>{{ jobResultDetail.elapsedTime }}s</span>
            </el-form-item>
            <el-form-item :label="$t('job.jobResult.outputFileLink')">
              <div>
                <el-button
                  type="text"
                  @click="downloadFile(jobid, 'match_result.json')"
                >
                  {{ "match_result.json" }}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-card shadow="never" style="margin-top: 10px">
        <div slot="header" class="clearfix">
          <span>
            <b>{{ $t("job.index.matchResult") }}</b>
          </span>
        </div>
        <el-table v-if="showMyQuery" border :data="myQueryTableData">
          <el-table-column
            show-overflow-tooltip
            prop="field"
            :label="$t('job.index.rquireFields')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="result"
            :label="$t('job.index.result')"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result" type="danger">{{
                $t("job.index.danger")
              }}</el-tag>
              <el-tag v-if="!scope.row.result" type="success">{{
                $t("job.index.safe")
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="showOtherQuerytMe"
          class="wrap-table"
          :data="QueryMetableData"
          :span-method="objectSpanMethod"
          style="width: 100%; margin-top: 20px"
          border
        >
          <el-table-column
            show-overflow-tooltip
            prop="field"
            :label="$t('job.index.rquireFields')"
            width="180"
          />
          <el-table-column
            show-overflow-tooltip
            prop="datasetTitle"
            :label="$t('job.index.matchDataset')"
          />
          <el-table-column
            show-overflow-tooltip
            prop="count"
            :label="$t('job.index.matchTimes')"
          />
          <el-table-column prop="ruleDesc" :label="$t('job.index.searchRuls')">
            <template slot-scope="scope">
              <div class="wrap-cell">
                <p v-for="(item, i) in scope.row.ruleDesc" :key="item">
                  {{ $t("job.index.rule") }}{{ `${i + 1}：${item}` }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="result"
            :label="$t('job.index.dangerResult')"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result" type="danger">{{
                $t("job.index.danger")
              }}</el-tag>
              <el-tag v-if="!scope.row.result" type="success">{{
                $t("job.index.safe")
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getAgencyId } from '@/utils/auth'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { getMatchJobResult, downloadJobResult } from '@/api/job'
import { downloadAsFile } from '@/utils/download'
import { Base64 } from 'js-base64'
import { parseTime } from '@/utils'

export default {
  name: 'BaseResult',
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, null)
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
    jobStatusTextFilter(status, _this) {
      console.log(_this, '_this', status)
      if (typeof status === 'undefined' || status === null) {
        return _this.$t('status.abnormal')
      } else if (status === 'WAITING') {
        return _this.$t('status.waiting')
      } else if (status === 'RUNNING') {
        return _this.$t('status.running')
      } else if (status === 'SUCCEED') {
        return _this.$t('status.success')
      } else if (status === 'FAILED') {
        return _this.$t('status.failure')
      } else {
        return _this.$t('status.abnormal')
      }
    }
  },
  props: {
    jobid: {
      type: String,
      default: () => {
        return '9527'
      }
    }
  },

  data() {
    return {
      that: this,
      jobResultDetail: {},
      myQueryTableData: [],
      QueryMetableData: [],
      showMyQuery: false,
      showOtherQuerytMe: false
    }
  },
  watch: {
    jobid() {
      this.onCreate()
    }
  },
  created() {
    this.onCreate()
  },
  methods: {
    onCreate() {
      this.fetchResult()
    },
    fetchResult() {
      this.jobResult = {}
      getMatchJobResult(this.jobid).then((response) => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobResultDetail = response.data
        const { jobResult = [] } = response.data
        const myQueryTableData = []
        const QueryMetableData = []
        jobResult.map((v) => {
          const { dataset, field, result, ruleDesc } = v
          if (dataset && dataset.length) {
            dataset.map((datasetItem, i) => {
              const { datasetTitle, count } = datasetItem
              const dataItem = {
                datasetTitle,
                field,
                result,
                ruleDesc: ruleDesc,
                count,
                rowspan: dataset.length,
                rowspanStart: i === 0
              }
              QueryMetableData.push(dataItem)
            })
          }
          myQueryTableData.push({ field, result })
        })
        this.QueryMetableData = [...QueryMetableData]
        this.myQueryTableData = [...myQueryTableData]
        this.showMyQuery =
          this.jobResultDetail.initiatedAgencyId === getAgencyId()
        this.showOtherQuerytMe =
          this.jobResultDetail.jobDatasetProviderAgencyId === getAgencyId()
      })
    },
    downloadFile(jobId, fileName) {
      downloadJobResult(jobId).then((response) => {
        downloadAsFile(Base64.decode(response.data), fileName)
      })
    },
    // 表格处理
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
        if (row.rowspanStart) {
          return {
            rowspan: row.rowspan,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.wrap-table div.wrap-cell {
  white-space: normal !important;
}
.form {
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 3px;
  }
}
</style>
