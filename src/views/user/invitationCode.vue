<template>
  <div>
    <el-input v-model="agencyId" disabled>
      <template slot="prepend">{{ $t("user.invitedAgencyId") }}</template>
    </el-input>
    <el-input v-model="availableTimes">
      <template slot="prepend">{{ $t("user.availableTimes") }}</template>
      <el-button
        slot="append"
        type="primary"
        icon="el-icon-thumb"
        @click="onGenerate"
      />
    </el-input>
    <el-form class="form">
      <el-form-item>
        <el-input v-if="adminCode" v-model="adminCode">
          <template slot="prepend">{{ $t("user.admin") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-if="dataProviderCode" v-model="dataProviderCode">
          <template slot="prepend">{{ $t("user.dataProvider") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-if="algoProvierCode" v-model="algoProvierCode">
          <template slot="prepend">{{ $t("user.algoProvider") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-if="dataConsumerCode" v-model="dataConsumerCode">
          <template slot="prepend">{{ $t("user.dataConsumer") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-if="testUser" v-model="testUser">
          <template slot="prepend">{{ $t("user.testUser") }}</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { genInvitationCode } from '@/api/user'
import { getAgencyId } from '@/utils/auth'

export default {
  name: 'InvitationCode',
  props: {
    randomNum: {
      type: Number,
      default: () => { return 9527 }
    }
  },
  data() {
    return {
      agencyId: null,
      availableTimes: 1,
      adminCode: null,
      dataProviderCode: null,
      algoProvierCode: null,
      dataConsumerCode: null,
      testUser: null
    }
  },
  watch: {
    randomNum() {
      this.onCreate()
    }
  },
  created() {
    this.onCreate()
  },
  methods: {
    onCreate() {
      this.agencyId = getAgencyId()
      this.availableTimes = 1
      this.adminCode = null
      this.dataProviderCode = null
      this.algoProvierCode = null
      this.dataConsumerCode = null
      this.testUser = null
    },
    onGenerate() {
      if (this.availableTimes < 1 || this.availableTimes > 128) {
        this.$message({
          message: this.$t('user.rules.availableTimes'),
          type: 'warning',
          duration: 5000
        })
        return
      }

      genInvitationCode({ agencyId: this.agencyId, availableTimes: this.availableTimes }).then(
        response => {
          if (!response) {
            this.$message({
              message: this.$t('common.nullResponse'),
              type: 'error',
              duration: 5000
            })
            return
          }

          if (response.errorCode !== 0) {
            this.$message({
              message: '[ errorCode: ' + response.errorCode + ' ] ' + response.message,
              type: 'error'
            })
            return
          }

          var codes = response.data
          for (var i = 0; i < codes.length; i++) {
            if (codes[i].role === 'ADMIN') {
              this.adminCode = codes[i].code
            } else if (codes[i].role === 'DATA_PROVIDER') {
              this.dataProviderCode = codes[i].code
            } else if (codes[i].role === 'ALGO_PROVIDER') {
              this.algoProvierCode = codes[i].code
            } else if (codes[i].role === 'DATA_CONSUMER') {
              this.dataConsumerCode = codes[i].code
            } else if (codes[i].role === 'TEST_USER_PPC') {
              this.testUser = codes[i].code
            }
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.form {
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-input {
    margin-right: 10px;
    width: 100%;
  }
}
</style>
