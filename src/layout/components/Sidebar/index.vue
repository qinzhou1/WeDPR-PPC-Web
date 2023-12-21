<template>
  <div :class="{ 'has-logo': true }">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :id="route.name"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
        />
      </el-menu>
    </el-scrollbar>
    <div v-if="!isCollapse" class="copyright">本平台由微众区块链提供技术支持</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: rgb(191, 203, 217);
  font-size: 14px;
  text-align: center;
  line-height: 50px;
  height: 50px;
  background-color: rgb(48, 65, 86);
}
</style>
