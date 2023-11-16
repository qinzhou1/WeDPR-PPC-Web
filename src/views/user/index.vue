<template>
  <div>
    <el-form :model="selfInfo" label-width="140px" class="form">
      <el-form-item :label="$t('user.username')">
        <span>{{ selfInfo.username }}</span>
      </el-form-item>
      <el-form-item :label="$t('user.ownerAgency')">
        <span>{{ selfInfo.agency }}</span>
      </el-form-item>
    </el-form>
    <el-form
      ref="deleteForm"
      :model="deleteInfo"
      :rules="rules"
      inline
      label-width="140px"
      style="margin-left: 35px"
    >
      <el-form-item>
        <el-button type="danger" @click="onDelete">{{
          $t("user.deleteAccount")
        }}</el-button>
      </el-form-item>
      <el-form-item v-if="deleteInfo.readyDelete" prop="password">
        <el-input
          v-model="deleteInfo.password"
          :placeholder="$t('user.rules.password')"
          show-password
        />
      </el-form-item>
      <el-form-item v-if="deleteInfo.readyDelete">
        <el-button type="danger" @click="onConfirDeleteAccount">{{
          $t("user.confirmDeleteAccount")
        }}</el-button>
      </el-form-item>
      <el-alert
        v-if="deleteInfo.errorPassword"
        :title="$t('user.message.passwordError')"
        type="error"
      />
    </el-form>
  </div>
</template>

<script>
import { rsa_encode } from '@/utils/rsa'
import { queryPub } from '@/utils/authcode'
import { confusePassword } from '@/utils/validate'
import { getPubKey, getUsername, getAgencyId, getAgencyName } from '@/utils/auth'
import { deleteAccount } from '@/api/user'

export default {
  name: 'User',
  props: {
    randomNum: {
      type: Number,
      default: () => { return 9527 }
    }
  },
  data() {
    return {
      selfInfo:
      {
        agency: null,
        username: null
      },
      deleteInfo: {
        errorPassword: false,
        readyDelete: false,
        password: null
      },
      rules: {
        password: [
          { required: true, message: this.$t('user.rules.password'), trigger: 'blur' }
        ]
      }
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
      /**
      query publicKey for data encrypt
      */
      queryPub()

      this.selfInfo.agency = getAgencyName() + '(ID: ' + getAgencyId() + ')'
      this.selfInfo.username = getUsername()
    },
    onDelete() {
      this.deleteInfo.readyDelete = true
    },
    onConfirDeleteAccount() {
      this.$refs['deleteForm'].validate((valid) => {
        if (valid) {
          const params = {
            username: this.selfInfo.username,
            password: confusePassword(this.deleteInfo.password)
          }
          // rsa encode parameters
          const pub = getPubKey()
          var encoded = rsa_encode(JSON.stringify(params), pub)
          deleteAccount(encoded).then(
            response => {
              if (!this.handleResponse(response)) {
                return
              }

              // logout
              this.$store
                .dispatch('user/resetAll')
                .finally(() => {
                  this.$router.push({
                    path: '/login',
                    query: { redirect: this.$route.fullPath }
                  })
                })
            }
          )
        }
      })
    },

    handleResponse(response) {
      if (!response) {
        this.$alert(this.$t('common.nullResponse'), this.$t('common.runError') + ' [ errorCode: 500 ]', {
          type: 'error',
          confirmButtonText: this.$t('common.confirm')
        })
        return false
      }

      if (response.errorCode !== 0) {
        // this.$alert(response.message, this.$t('common.runError') + ' [ errorCode: ' + response.errorCode + ' ]', {
        //   type: 'error',
        //   confirmButtonText: this.$t('common.confirm')
        // })
        this.deleteInfo.errorPassword = true
        return false
      }

      this.$message({
        showClose: true,
        message: this.$t('common.success'),
        type: 'success',
        duration: 3000
      })

      return true
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.form {
  margin-bottom: 40px;

  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
