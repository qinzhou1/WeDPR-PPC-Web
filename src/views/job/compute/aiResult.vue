<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('job.jobResult.baseResult')" name="zero">
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
                    @click="downloadFile(jobid, 'mpc_result.csv')"
                  >{{ "mpc_result.csv" }}</el-button>
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
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in dynamicTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <el-image
          style="width: 100%; height: 100%"
          :src="item.content"
          :preview-src-list="srcList"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { toDynamicTableData } from '@/utils/table'
import { queryJobResult, downloadJobResult } from '@/api/job'
import { downloadAsFile } from '@/utils/download'
import { Base64 } from 'js-base64'
export default {
  name: 'AiResult',
  props: {
    jobid: {
      type: String,
      default: () => { return '9527' }
    }
  },
  data() {
    return {
      roc: null,
      ks: null,
      pr: null,
      accuracy: null,
      dynamicTabs: [],
      activeName: 'zero',
      jobResult: {
        elapsedTime: null,
        trafficVolume: null,
        outputPreview: null
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
        if (this.jobResult.outputMetricsGraphs) {
          for (var i = 0; i < this.jobResult.outputMetricsGraphs.length; i++) {
            var metricsGraph = this.jobResult.outputMetricsGraphs[i]
            this.dynamicTabs.push({
              title: metricsGraph.metricsName,
              name: metricsGraph.metricsName,
              content: metricsGraph.metricsData
            })
          }
        }
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
