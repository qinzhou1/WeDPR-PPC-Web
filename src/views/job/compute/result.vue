<template>
  <div class="result-container">
    <ai-result v-if="jobAlgorithmType === 'PPC_TRAIN'" :jobid="jobId" />
    <base-result v-if="jobAlgorithmType !== 'PPC_TRAIN' && jobAlgorithmType!=='PPC_MATCH'" :jobid="jobId" />
    <match-result v-if="jobAlgorithmType === 'PPC_MATCH'" :jobid="jobId" />
  </div>
</template>

<script>
import BaseResult from '@/views/job/compute/baseResult'
import AiResult from '@/views/job/compute/aiResultNew'
import MatchResult from '@/views/job/compute/matchResult'

export default {
  name: 'JobManager',
  components: {
    BaseResult,
    AiResult,
    MatchResult
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

  }
}
</script>

<style lang="scss" scoped>
.result-container {
  padding: 20px;
}
</style>
