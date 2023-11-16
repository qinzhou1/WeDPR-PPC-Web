<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("user.registerWelcome") }}</h3>
      </div>
      <el-tooltip placement="right">
        <div slot="content">{{ $t("user.tooltip.username") }}</div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            :placeholder="$t('user.username')"
            name="username"
            type="text"
            tabindex="1"
          />
        </el-form-item>
      </el-tooltip>
      <el-form-item prop="invitationCode">
        <span class="svg-container">
          <svg-icon icon-class="table" />
        </span>
        <el-input
          ref="invitationCode"
          v-model="registerForm.invitationCode"
          :placeholder="$t('user.invitationCode')"
          name="invitationCode"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="role">
        <span class="svg-container">
          <svg-icon icon-class="user-avatar" />
        </span>
        <el-select
          v-model="registerForm.role"
          :placeholder="$t('user.userRole')"
        >
          <el-option :label="$t('user.admin')" value="ADMIN" />
          <el-option :label="$t('user.dataProvider')" value="DATA_PROVIDER" />
          <el-option :label="$t('user.algoProvider')" value="ALGO_PROVIDER" />
          <el-option :label="$t('user.dataConsumer')" value="DATA_CONSUMER" />
          <el-option :label="$t('user.testUser')" value="TEST_USER_PPC" />
        </el-select>
      </el-form-item>
      <el-tooltip placement="right">
        <div slot="content">{{ $t("user.tooltip.password") }}</div>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType0"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType0"
            :placeholder="$t('user.password')"
            name="password"
            tabindex="2"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showPwd(0)">
            <svg-icon
              :icon-class="passwordType0 === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip placement="right">
        <div slot="content">{{ $t("user.tooltip.password") }}</div>
        <el-form-item prop="checkPass">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType1"
            v-model="registerForm.checkPass"
            :type="passwordType1"
            :placeholder="$t('user.confirmPassword')"
            name="password"
            tabindex="3"
          />
          <span class="show-pwd" @click="showPwd(1)">
            <svg-icon
              :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-form-item v-if="needMailAuth">
        <span class="svg-container el-icon-s-promotion" />
        <el-input
          v-model="registerForm.email"
          :placeholder="$t('user.email')"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-row v-if="needMailAuth" :gutter="20">
        <el-col :span="17">
          <el-form-item>
            <el-input
              v-model="registerForm.mailCode"
              :placeholder="$t('user.emailCode')"
              tabindex="4"
            />
          </el-form-item>
        </el-col>
        <el-col style="float: right; margin-right: 2px" :span="6">
          <el-button
            type="primary"
            style="
              margin-top: 2px;
              width: 116px;
              height: 45px;
              text-align: center;
              float: right;
            "
            @click="getEmailCode()"
          >{{ $t("user.getEmailCode") }}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="17">
          <el-form-item prop="authCode">
            <el-input
              v-model="registerForm.authCode"
              :placeholder="$t('user.authCode')"
              name="imageAuthCode"
              tabindex="4"
            />
          </el-form-item>
        </el-col>
        <el-col style="float: right; margin-right: 2px" :span="6">
          <div
            style="
              margin-top: 2px;
              width: 116px;
              height: 45px;
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
        @click="handleRegister('registerForm')"
      >{{ $t("user.register") }}</el-button>

      <div class="tips">
        <span style="margin-right: 20px">{{ $t("user.registerTip") }}</span>
        <el-button type="text" @click="handleLogin">{{
          $t("user.login")
        }}</el-button>
        <el-button
          style="margin-left: 150px"
          type="text"
          @click="chooseChinese()"
        >中文</el-button>
        <el-button type="text" @click="chooseEnglish()">English</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import { validUsername, validPassword, confusePassword } from '@/utils/validate'
import { queryAuthCode, queryPub } from '@/utils/authcode'
import { getPubKey } from '@/utils/auth'
import { register, isNeedMailAuth, sendMailCode } from '@/api/user'
import { rsa_encode } from '@/utils/rsa'
import { ErrorCode } from '@/utils/errorcode'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'

export default {
  name: 'Register',
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.username')))
        return
      }
      if (!validUsername(value)) {
        callback(
          new Error(
            this.$t('user.rules.invalidUsername')
          )
        )
      } else {
        callback()
      }
    }
    const verifyPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.password')))
        return
      }
      if (!validPassword(value)) {
        callback(
          new Error(
            this.$t('user.rules.invalidPassword')
          )
        )
      } else {
        callback()
      }
    }
    const confirmPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.confirmPassword')))
      } else if (value !== this.registerForm.password) {
        callback(new Error(this.$t('user.rules.diffPassword')))
      } else {
        callback()
      }
    }
    const confirmAuthCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.authCode')))
      } else {
        callback()
      }
    }
    return {
      needMailAuth: false,
      registerForm: {
        password: '',
        checkPass: '',
        username: '',
        role: '',
        authCode: '',
        email: '',
        mailCode: ''
      },

      timer: null,
      imageAuthCode: {
        imageAuthCodeBase64URL: '',
        randomToken: ''
      },
      registerRules: {
        username: [
          { required: true, validator: checkUsername, trigger: 'change' }
        ],
        invitationCode: [
          { required: true, message: this.$t('user.rules.invitationCode'), trigger: 'change' }
        ],
        role: [
          { required: true, message: this.$t('user.rules.role'), trigger: 'change' }
        ],
        password: [{ required: true, validator: verifyPwd, trigger: 'blur' }],
        checkPass: [
          { required: true, validator: confirmPwd, trigger: 'change' }
        ],
        authCode: [
          { required: true, validator: confirmAuthCode, trigger: 'change' }
        ]
      },
      passwordType0: 'password',
      passwordType1: 'password'
    }
  },
  created() {
    isNeedMailAuth().then((response) => {
      if (!handleFetchResponseMsgBox(this, response, false)) {
        return
      }

      this.needMailAuth = response.data
    })
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
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getEmailCode() {
      sendMailCode(this.registerForm.username, this.registerForm.email).then((response) => {
        if (!handleFetchResponseMsgBox(this, response, true)) {
          return
        }
      })
    },

    showPwd(number) {
      if (number === 0) {
        this.passwordType0 = this.passwordType0 === 'password' ? '' : 'password'
      } else {
        this.passwordType1 = this.passwordType1 === 'password' ? '' : 'password'
      }
    },
    chooseChinese() {
      this.$i18n.locale = 'zh'
      localStorage.setItem('languageSet', this.$i18n.locale)
      this.$router.go(0)
    },
    chooseEnglish() {
      this.$i18n.locale = 'en'
      localStorage.setItem('languageSet', this.$i18n.locale)
      this.$router.go(0)
    },
    handleLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    handleUpdateAuthCode() {
      const callback = (resp) => {
        this.imageAuthCode.randomToken = resp.randomToken
        this.imageAuthCode.imageAuthCodeBase64URL = `data:image/png;base64,${resp.imageBase64}`
      }

      queryAuthCode(callback)
    },
    registerUser() {
      const params = {
        username: this.registerForm.username,
        email: this.registerForm.email,
        invitationCode: this.registerForm.invitationCode,
        role: this.registerForm.role,
        password: confusePassword(this.registerForm.password),
        randomToken: this.imageAuthCode.randomToken,
        imageCode: this.registerForm.authCode,
        mailCode: this.registerForm.mailCode
      }

      // rsa encode parameters
      const pub = getPubKey()
      var encoded = rsa_encode(JSON.stringify(params), pub)

      register(encoded)
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
              message: this.$t('user.message.success')
            })
            //
            this.handleLogin()
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
            errorCode === ErrorCode.AccountExist
          ) {
            this.$message({
              type: 'error',
              message: this.$t('user.message.existedAccount')
            })
            this.handleUpdateAuthCode()
          } else if (
            typeof errorCode !== 'undefined' &&
            errorCode === ErrorCode.ImageAuthTokenExpired
          ) {
            this.$message({
              type: 'error',
              message: this.$t('user.message.expiredAuthCode')
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
            errorCode === ErrorCode.CreateUAFailed
          ) {
            this.$message({
              type: 'error',
              message: this.$t('user.message.createFailed')
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
    },
    handleRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message({
            type: 'error',
            message: this.$t('user.message.invalid')
          })
          return false
        }

        this.registerUser()
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
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
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
