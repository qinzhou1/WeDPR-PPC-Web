<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu" style="margin-right:20px">
      <el-link href="https://wj.qq.com/s2/8908492/9c46" type="primary" target="_blank">{{ $t('common.issue') + '\u3000' }}</el-link>
      <el-dropdown id="userAvatar" trigger="click" placement="bottom">
        <el-button round effect="light" size="mini">
          <span>
            <i class="el-icon-user" />
            | {{ loginAgencyName }} | {{ role | roleFilter(loginUser, that) }} | {{ loginUser }}
          </span>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="loginUser === 'admin'" @click.native="showInvitationCode = true">
            <span style="display:block;">{{ $t('user.invitationCode') }}</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="showUser = true">
            <span style="display:block;">{{ $t('user.user') }}</span>
          </el-dropdown-item>
          <router-link to="/changePassword">
            <el-dropdown-item>{{ $t('user.changePassword') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">{{ $t('user.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button style="margin-left:20px;" type="text" @click="chooseChinese()">中文</el-button>
      <el-button type="text" @click="chooseEnglish()">English</el-button>
      <el-dialog
        :visible.sync="showUser"
        :title="$t('user.user')"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        center
      >
        <user :random-num="Math.random()" />
      </el-dialog>
      <el-dialog
        :visible.sync="showInvitationCode"
        :title="$t('user.invitationCode')"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        center
      >
        <invitation-code :random-num="Math.random()" />
      </el-dialog>
    </div>
  </div>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import User from '../../views/user/index'
import InvitationCode from '../../views/user/invitationCode'

import { getAgencyName, getUserRole } from '../../utils/auth'
import { mapGetters } from 'vuex'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    User,
    InvitationCode
  },
  filters: {
    roleFilter(role, username, that) {
      if (role === 'ADMIN') {
        if (username === 'admin') {
          return that.$t('user.superAdmin')
        } else {
          return that.$t('user.admin')
        }
      } else if (role === 'DATA_PROVIDER') {
        return that.$t('user.dataProvider')
      } else if (role === 'ALGO_PROVIDER') {
        return that.$t('user.algoProvider')
      } else if (role === 'DATA_CONSUMER') {
        return that.$t('user.dataConsumer')
      } else {
        // TEST_USER_APC || TEST_USER_PPC
        return that.$t('user.testUser')
      }
    }
  },
  data() {
    return {
      that: this,
      loginUser: this.$store.getters.name,
      loginAgencyName: getAgencyName(),
      role: getUserRole(),
      qrCodeShow: false,
      showUser: false,
      showInvitationCode: false
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
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
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    openPage(url) {
      window.open(url, 'target')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
