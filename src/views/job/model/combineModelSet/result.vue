<template>
  <div class="result-container">
    <ai-result v-if="jobAlgorithmType === 'PPC_TRAIN'" :jobid="jobId" />
    <base-result v-if="jobAlgorithmType !== 'PPC_TRAIN'" :jobid="jobId" />
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-button type="primary" @click="reBuild">
        {{ $t('job.new.rebuild') }}
      </el-button>
    </el-row>
  </div>
</template>

<script>
import BaseResult from '@/views/job/compute/baseResult'
import AiResult from '@/views/job/compute/aiResult'

export default {
  name: 'JobManager',
  components: {
    BaseResult,
    AiResult
  },
  filters: {},
  props: {},
  data() {
    return {
      jobAlgorithmType: '',
      jobId: ''
    }
  },
  created() {
    const { jobAlgorithmType, jobId } = this.$route.query
    this.jobAlgorithmType = jobAlgorithmType
    this.jobId = jobId
  },
  mounted() {},
  methods: {
    reBuild() {
      const { jobId = '' } = this
      this.$router.push({ path: 'combineModelSetParamSet', query: { jobId }})
    }
  }
}
</script>

<style lang="scss" scoped>
.result-container {
  padding: 20px;
}
</style>
