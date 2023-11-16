<template>
  <div>
    <div>
      <el-row type="flex">
        <el-col :span="24">
          <el-form label-position="right" label-width="120px" class="form">
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
                  @click="downloadFile(jobid, 'job_result.csv')"
                >
                  {{ "job_result.csv" }}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>
                <b>{{ $t("job.jobResult.resultPreview") }}</b>
              </span>
            </div>
            <el-tooltip
              effect="light"
              :content="$t('common.tableLimitation')"
              placement="top"
            >
              <el-table
                ref="dynamicTable"
                :data="dynamicTableData.data"
                fit
                stripe
                max-height="285"
              >
                <template v-for="col in dynamicTableData.columns">
                  <el-table-column
                    :key="col.dataItem"
                    sortable
                    :show-overflow-tooltip="true"
                    :prop="col.dataItem"
                    :label="col.dataName"
                  />
                </template>
              </el-table>
            </el-tooltip>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { toDynamicTableData } from '@/utils/table'
import { queryJobResult, downloadJobResult } from '@/api/job'
import { downloadAsFile } from '@/utils/download'
import { Base64 } from 'js-base64'

export default {
  name: 'BaseResult',
  props: {
    jobid: {
      type: String,
      default: () => { return '9527' }
    }
  },
  data() {
    return {
      jobResult: {
        elapsedTime: null,
        trafficVolume: null,
        outputPreview: null,
        outputFileLink: null
      },
      dynamicTableData: {}
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
      queryJobResult(this.jobid).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobResult = response.data.jobPlanetResult
        this.dynamicTableData = toDynamicTableData(this.jobResult.outputPreview)
      })
    },
    downloadFile(jobId, fileName) {
      downloadJobResult(jobId).then(response => {
        downloadAsFile(Base64.decode(response.data), fileName)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.form {
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 3px;
  }
}
</style>
