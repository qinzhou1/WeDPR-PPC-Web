<template>
  <div class="change-container">
    <el-form
      ref="changePasswordForm"
      :model="changePasswordForm"
      :rules="changePasswordRules"
      class="change-form"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("user.changePassword") }}</h3>
      </div>
      <el-form-item prop="oldPassword">
        <el-input
          ref="oldPassword"
          v-model="changePasswordForm.oldPassword"
          :placeholder="$t('user.oldPassword')"
          :type="passwordType0"
          name="oldPassword"
          tabindex="1"
        />
        <span class="show-pwd" @click="showPwd(0)">
          <svg-icon
            :icon-class="passwordType0 === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-tooltip placement="right">
        <div slot="content">{{ $t("user.tooltip.password") }}</div>
        <el-form-item prop="newPassword">
          <el-input
            :key="passwordType1"
            ref="newPassword"
            v-model="changePasswordForm.newPassword"
            :type="passwordType1"
            :placeholder="$t('user.newPassword')"
            name="newPassword"
            tabindex="2"
          />
          <span class="show-pwd" @click="showPwd(1)">
            <svg-icon
              :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip placement="right">
        <div slot="content">{{ $t("user.tooltip.password") }}</div>
        <el-form-item prop="confirmPassword">
          <el-input
            :key="passwordType2"
            v-model="changePasswordForm.confirmPassword"
            :type="passwordType2"
            :placeholder="$t('user.confirmNewPassword')"
            name="confirmPassword"
            tabindex="3"
          />
          <span class="show-pwd" @click="showPwd(2)">
            <svg-icon
              :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-row :gutter="10">
        <el-col :span="18">
          <el-form-item prop="authCode">
            <el-input
              v-model="changePasswordForm.authCode"
              :placeholder="$t('user.authCode')"
              name="imageAuthCode"
              tabindex="4"
            />
          </el-form-item>
        </el-col>
        <el-col style="float: right" :span="3">
          <div
            style="
              margin-top: 4px;
              width: 104px;
              height: 40px;
              text-align: center;
              background: white;
              float: right;
            "
          >
            <i
              v-if="imageAuthCode.imageAuthCodeBase64URL === ''"
              style="margin-top: 12%"
              class="el-icon-loading"
            />
            <img
              v-else
              style="width: 100%; height: auto; vertical-align: middle"
              :src="imageAuthCode.imageAuthCodeBase64URL"
              alt
              tabindex="4"
              @click="handleUpdateAuthCode"
            >
          </div>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleChangePassword('changePasswordForm')"
      >{{ $t("common.confirm") }}</el-button>
    </el-form>
  </div>
</template>

<script>

import { rsa_encode } from '@/utils/rsa'
import { queryPub, queryAuthCode } from '@/utils/authcode'
import { confusePassword, validPassword } from '@/utils/validate'
import { getPubKey, getUsername } from '@/utils/auth'
import { changePassword } from '@/api/user'
import { ErrorCode } from '@/utils/errorcode'

export default {
  name: 'ChangePassword',

  data() {
    const verifyOldPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.oldPassword')))
        return
      }
      callback()
    }

    const verifyPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.newPassword')))
        return
      }
      if (!validPassword(value)) {
        callback(
          new Error(this.$t('user.rules.invalidPassword'))
        )
      } else {
        callback()
      }
    }

    const confirmPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.message.newPwdAgain')))
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error(this.$t('user.message.differentPasswords')))
      } else {
        callback()
      }
    }

    const confirmAuthCode = (rule, value, callback) => {
      if (
        !value ||
        value.length !== 4
      ) {
        callback(new Error(this.$t('user.rules.authCode')))
      } else {
        callback()
      }
    }

    return {
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        authCode: ''
      },
      imageAuthCode: {
        imageAuthCodeBase64URL: '',
        randomToken: ''
      },
      changePasswordRules: {
        oldPassword: [
          { required: true, validator: verifyOldPwd, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: verifyPwd, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: confirmPwd, trigger: 'blur' }
        ],
        authCode: [
          { required: true, validator: confirmAuthCode, trigger: 'blur' }
        ]
      },
      passwordType0: 'password',
      passwordType1: 'password',
      passwordType2: 'password'
    }
  },
  created() {
    this.reset()
    /**
    query publicKey for data encrypt
    */
    queryPub()

    /**
     update the authentication code periodically
     */
    const callback = (resp) => {
      this.imageAuthCode.randomToken = resp.randomToken
      this.imageAuthCode.imageAuthCodeBase64URL = `data:image/png;base64,${resp.imageBase64}`
    }

    queryAuthCode(callback)
    this.timer = setInterval(queryAuthCode, 60000, callback)
  },
  methods: {
    reset() {
      this.changePasswordForm.newPassword = ''
      this.changePasswordForm.oldPassword = ''
      this.changePasswordForm.confirmPassword = ''
      this.changePasswordForm.authCode = ''
    },
    async logout() {
      await this.$store
        .dispatch('user/logout')
        .finally(() => {
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          })
        })
    },
    handleChangePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message({
            type: 'error',
            message: this.$t('user.message.invalidRequest')
          })
          return false
        }

        var username = getUsername()

        const params = {
          username: username,
          oldPassword: confusePassword(this.changePasswordForm.oldPassword),
          newPassword: confusePassword(this.changePasswordForm.newPassword),
          randomToken: this.imageAuthCode.randomToken,
          imageCode: this.changePasswordForm.authCode
        }

        // this.reset();

        // rsa encode parameters
        const pub = getPubKey()
        var encoded = rsa_encode(JSON.stringify(params), pub)

        changePassword(encoded)
          .then((resp) => {
            var data = resp.data
            var errorCode = resp.errorCode

            if (typeof resp.errorCode !== 'undefined' && resp.errorCode !== 0) {
              this.$message({
                type: 'error',
                message: resp.message
              })
              this.handleUpdateAuthCode()
            } else if (typeof errorCode !== 'undefined' && errorCode === 0) {
              this.$message({
                type: 'success',
                message: this.$t('user.message.changePwdSuccess')
              })
              this.logout()
            } else if (
              typeof errorCode !== 'undefined' &&
              errorCode === ErrorCode.InvalidParameters
            ) {
              this.$message({
                type: 'error',
                message: this.$t('user.message.invalidRequest')
              })
              this.handleUpdateAuthCode()
            } else if (
              typeof errorCode !== 'undefined' &&
              errorCode === ErrorCode.AccountOrPasswordIncorrect
            ) {
              this.$message({
                type: 'error',
                message: this.$t('user.message.accountError')
              })
              this.handleUpdateAuthCode()
            } else if (
              typeof errorCode !== 'undefined' &&
              errorCode === ErrorCode.ImageAuthTokenExpired
            ) {
              this.$message({
                type: 'error',
                message: this.$t('user.message.authTokenExpired')
              })
              this.handleUpdateAuthCode()
            } else if (
              typeof errorCode !== 'undefined' &&
              (errorCode === ErrorCode.ImageAuthTokenNotExist ||
                errorCode === ErrorCode.ImageAuthTokenNotMatch)
            ) {
              this.$message({
                type: 'error',
                message: this.$t('user.message.authTokenNotMatch')
              })
              this.handleUpdateAuthCode()
            } else if (
              typeof errorCode !== 'undefined' &&
              errorCode === ErrorCode.UndefinedError
            ) {
              this.$message({
                type: 'error',
                message: this.$t('common.undefinedError')
              })
              this.handleUpdateAuthCode()
            } else {
              this.$message({
                type: 'error',
                message: JSON.stringify(data)
              })
              this.handleUpdateAuthCode()
            }
          })

        return true
      })
    },
    handleUpdateAuthCode() {
      const callback = (resp) => {
        this.imageAuthCode.randomToken = resp.randomToken
        this.imageAuthCode.imageAuthCodeBase64URL = `data:image/png;base64,${resp.imageBase64}`
      }

      queryAuthCode(callback)
    },
    showPwd(number) {
      if (number === 0) {
        this.passwordType0 = this.passwordType0 === 'password' ? '' : 'password'
      } else if (number === 1) {
        this.passwordType1 = this.passwordType1 === 'password' ? '' : 'password'
      } else {
        this.passwordType2 = this.passwordType2 === 'password' ? '' : 'password'
      }

      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .change-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.change-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.change-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .change-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
