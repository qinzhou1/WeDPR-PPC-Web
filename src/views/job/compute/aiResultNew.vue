<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        key="模型结果"
        :label="$t('index.combineModelSetResult')"
        name="模型结果"
      >
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
          <el-form-item v-if="outputModelResult.length" :label="$t('job.jobResult.outputFileLink')">
            <div>
              <el-button
                type="text"
                @click="downloadFile(jobid, 'mpc_model.json')"
              >{{ "mpc_model.json" }}</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-row type="flex">
          <el-col :span="24">

            <div
              v-for="item in outputModelResult"
              :key="item.ModelPlotName"
              class="img-con"
            >
              <el-image
                style="width: 100%; height: auto"
                :src="item.ModelPlotData"
              />
              <div>{{ item.title }}</div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        key="预测结果"
        :label="$t('index.combinePredictResult')"
        name="预测结果"
      >
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
                @click="downloadFileResult(jobid, 'job_result.csv')"
              >{{ "job_result.csv" }}</el-button>
            </div>
          </el-form-item>
        </el-form>
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
            max-height="385"
          >

            <el-table-column
              v-for="col in dynamicTableData.columns"
              :key="col.dataItem"
              sortable
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
            />
          </el-table>
        </el-tooltip>
      </el-tab-pane>
      <el-tab-pane
        key="效果评估"
        :label="$t('index.inflJudge')"
        name="效果评估"
      >
        <div
          v-for="item in metricsGraphList"
          :key="item.metricsName"
          class="img-con"
        >
          <el-image
            style="width: 100%; height: auto"
            :src="item.data"
          />
          <div>{{ item.title }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row type="flex" justify="center" style="margin-top: 20px;padding-bottom: 20px;">
      <el-button type="primary" @click="reBuild">
        {{ $t('job.new.rebuild') }}
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { toDynamicTableData } from '@/utils/table'
import { queryJobResult, downloadModelJobResult, downloadJobResult } from '@/api/job'
import { downloadAsFile } from '@/utils/download'
import { Base64 } from 'js-base64'
export default {
  name: 'AiResultNew',
  props: {
    jobid: {
      type: String,
      default: () => { return '9527' }
    }
  },
  data() {
    return {
      metricsGraphList: [],
      activeName: '模型结果',
      jobResult: {
        elapsedTime: null,
        trafficVolume: null,
        outputPreview: null
      },
      dynamicTableData: {},
      outputModelResult: [],
      jobAlgorithmSubtype: ''
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
      const { jobAlgorithmSubtype } = this.$route.query
      this.jobAlgorithmSubtype = jobAlgorithmSubtype
      this.jobResult = {}
      queryJobResult(this.jobid).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobResult = response.data.jobPlanetResult
        this.dynamicTableData = toDynamicTableData(this.jobResult.outputPreview)
        const { outputMetricsGraphs = [], outputModelResult = [] } = this.jobResult
        this.metricsGraphList = outputMetricsGraphs.map(v => {
          return {
            title: v.metricsName,
            data: v.metricsData
          }
        })
        this.outputModelResult = outputModelResult ? [...outputModelResult] : []
      })
    },
    downloadFile(jobId, fileName) {
      downloadModelJobResult(jobId).then(response => {
        downloadAsFile(Base64.decode(response.data), fileName)
      })
    },
    downloadFileResult(jobId, fileName) {
      downloadJobResult(jobId).then(response => {
        downloadAsFile(Base64.decode(response.data), fileName)
      })
    },
    reBuild() {
      const { jobid = '' } = this
      this.$router.push({ path: 'combineModelSetParamSet', query: { jobId: jobid }})
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
  div.img-con{
    width: 50%;
    float: left;
    text-align: center;
  }
  </style>

