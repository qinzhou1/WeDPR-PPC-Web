<template>
  <div class="result-container">
    <!-- 参数调整 -->
    <el-card style="margin-top: 10px" shadow="never">
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>算法配置</b>
        </span>
      </div>
      <div>
        <el-form label-width="200px">
          <el-form-item v-for="item in resetModelModule" :key="item.label" :label="item.label">
            <el-input-number v-if="item.type ==='float'" v-model="item.value" :step="0.1" style="width:140px" :min="item.min_value" :max="item.max_value" />
            <el-input-number v-if="item.type ==='int'" v-model="item.value" :step="1" :min="item.min_value" :max="item.max_value" step-strictly style="width:140px" />
            <el-radio-group v-if="item.type ==='bool'" v-model="item.value">
              <el-radio :label="1">true</el-radio>
              <el-radio :label="0">false</el-radio>
            </el-radio-group>
            <span v-if="item.type !=='bool'" class="tips">{{ item.description }}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 任务简介 -->
    <el-card shadow="never" style="margin-top: 10px">
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("job.jobSetting") }}</b>
        </span>
      </div>
      <el-form
        ref="jobForm"
        label-position="right"
        label-width="100px"
        :model="jobBasicData"
      >
        <el-form-item :label="$t('job.jobTitle')" prop="jobTitle">
          <el-input
            v-model="jobBasicData.jobTitle"
            :placeholder="$t('job.jobTitleTip')"
            style="margin-bottom: 5px; width: 250px"
          />
        </el-form-item>
        <el-form-item :label="$t('job.jobDescription')" prop="jobDescription">
          <el-input
            v-model="jobBasicData.jobDescription"
            :autosize="{ minRows: 1.5 }"
            :placeholder="$t('job.jobDescriptionTip')"
            type="textarea"
            style="margin-bottom: 5px; width: 250px"
          />
        </el-form-item>
        <el-form-item :label="$t('job.jobPriority')" prop="jobPriority">
          <el-select
            v-model="jobBasicData.jobPriority"
            style="width: 250px"
            :placeholder="$t('job.jobModelTypeTips')"
          >
            <el-option :value="0" :label="$t('job.highPriority')" />
            <el-option :value="1" :label="$t('job.mediumPriority')" />
            <el-option :value="2" :label="$t('job.lowPriority')" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-button type="primary" @click="handleParams"> {{ $t('job.new.resetmodel') }} </el-button>
    </el-row>
  </div>
</template>
<script>
import { queryJobDetail } from '@/api/job'
import { createJob } from '@/api/job'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
export default {
  name: 'JobManager',
  components: {

  },
  filters: {},
  props: {},
  data() {
    return {
      jobBasicData: {
        jobTitle: '',
        jobDescription: '',
        jobPriority: 1
      },
      jobId: '',
      resetModelModule: [],
      mpcModelModule: {},
      defaultParams: {}
    }
  },
  created() {
    const { jobId } = this.$route.query
    this.jobId = jobId
    this.getJobDetail()
  },
  mounted() {},
  methods: {
    reBuild(params) {
      createJob(params).then(response => {
        if (handleOptResponseMsgBox(this, response, true)) {
          const { data = '' } = response
          this.$router.push({ path: 'combineModelSetDetail', query: { jobId: data }})
        }
      })
        .catch(error => {
          if (error === 'cancel') {
            return
          }
        })
    },
    handleParams() {
      this.$refs.jobForm.validate((valid) => {
        if (valid) {
          const jobAlgorithmParam = {}
          this.resetModelModule.forEach(v => {
            jobAlgorithmParam[v.label] = v.value
          })
          const params = { ...this.defaultParams, jobAlgorithmParam: JSON.stringify(jobAlgorithmParam), ...this.jobBasicData }
          this.reBuild(params)
        } else {
          this.$alert(this.$t('job.new.finishJobBaseInfo'))
          return false
        }
      })
    },
    getJobDetail() {
      queryJobDetail(this.jobId).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.jobDetail = response.data
        const { jobTitle, jobDescription, jobPriority, jobDatasetProviderList, jobResultReceiverList, jobAlgorithm = {}} = response.data
        this.jobBasicData = { jobTitle, jobDescription, jobPriority }
        const { resetModelModule = [], mpcModelModule, algorithmId, algorithmVersion, algorithmType, algorithmSubtype } = jobAlgorithm
        const jobAlgorithmParams = { algorithmId, algorithmVersion, algorithmType, algorithmSubtype }
        this.defaultParams = {
          jobAlgorithm: jobAlgorithmParams,
          jobResultReceiverList,
          jobDatasetProviderList,
          psiFields: 'id,id,id'
        }
        this.resetModelModule = resetModelModule
        this.mpcModelModule = JSON.parse(mpcModelModule)
      }).catch(_ => {

      })
    }

  }
}
</script>

<style lang="scss" scoped>
.result-container {
  padding: 20px;
  .tips{
    color: red;
    margin-left: 16px;
  }
}
</style>

