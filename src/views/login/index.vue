<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("user.loginWelcome") }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('user.username')"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('user.password')"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-row
        v-if="needMailAuth && loginForm.username !== 'admin'"
        :gutter="20"
      >
        <el-col :span="17">
          <el-form-item>
            <el-input
              v-model="loginForm.mailCode"
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
              v-model="loginForm.authCode"
              :placeholder="$t('user.authCode')"
              name="imageAuthCode"
              tabindex="3"
              @keyup.enter.native="handleLogin"
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
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >{{ $t("user.login") }}</el-button>

      <div class="tips">
        <span style="margin-right: 20px">{{ $t("user.loginTip") }}</span>
        <el-button type="text" @click="handleRegister">{{
          $t("user.register")
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
import { queryPub, queryAuthCode } from '@/utils/authcode'
import { confusePassword } from '@/utils/validate'
import { isNeedMailAuth, sendMailCode } from '@/api/user'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.username')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.password')))
      } else {
        callback()
      }
    }
    const validateAuthCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('user.rules.authCode')))
      } else {
        callback()
      }
    }
    return {
      needMailAuth: false,
      loginForm: {
        username: 'admin',
        password: '',
        authCode: '',
        mailCode: ''
      },
      timer: null,
      imageAuthCode: {
        imageAuthCodeBase64URL: '',
        randomToken: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        authCode: [
          { required: true, trigger: 'blur', validator: validateAuthCode }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    isNeedMailAuth().then((response) => {
      if (!handleFetchResponseMsgBox(this, response, false)) {
        return
      }

      this.needMailAuth = response.data
    })

    // this.$alert(this.$t('common.preNotice'), this.$t('common.preTip'), {
    //   dangerouslyUseHTMLString: true,
    //   confirmButtonText: this.$t('common.confirm'),
    //   showClose: false
    // })

    /**
    query publicKey for data encrypt
    */
    queryPub(() => {})

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
      sendMailCode(this.loginForm.username, '').then((response) => {
        if (!handleFetchResponseMsgBox(this, response, true)) {
          return
        }
      })
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$router.push({
        path: '/register'
      })
    },
    handleUpdateAuthCode() {
      const callback = (resp) => {
        this.imageAuthCode.randomToken = resp.randomToken
        this.imageAuthCode.imageAuthCodeBase64URL = `data:image/png;base64,${resp.imageBase64}`
      }

      queryAuthCode(callback)
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var loginParams = {
            username: this.loginForm.username,
            password: confusePassword(this.loginForm.password),
            imageCode: this.loginForm.authCode,
            randomToken: this.imageAuthCode.randomToken,
            mailCode: this.loginForm.mailCode
          }

          this.loading = true
          this.$store
            .dispatch('user/login', loginParams)
            .then(() => {
              if (this.redirect === '/changePassword') {
                this.$router.push({ path: '/home' })
              } else {
                this.$router.go(0)
                this.$router.push({ path: this.redirect || '/' })
              }
              this.loading = false
            })
            .catch(() => {
              this.loading = false
              this.loginForm.authCode = ''
              this.handleUpdateAuthCode()
            })
        } else {
          return false
        }
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
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
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
