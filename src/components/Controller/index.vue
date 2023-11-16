<template>
  <div>
    <el-row>
      <el-form
        ref="controller-from"
        label-width="auto"
        label-position="right"
        :model="controller"
        inline
        size="medium"
        class="controller-from"
      >
        <el-form-item
          v-if="controller.isNeedDataPicker"
          :label="$t('controller.date')"
        >
          <el-date-picker
            v-model="dates"
            type="datetimerange"
            :picker-options="pickerOptions"
            :range-separator="$t('controller.to')"
            :start-placeholder="$t('controller.startDate')"
            :end-placeholder="$t('controller.endDate')"
            align="left"
            style="width: 370px"
          />
        </el-form-item>
        <el-form-item>
          <slot name="keyFilter" />
        </el-form-item>
        <el-button-group>
          <el-button
            width="100px"
            type="primary"
            size="medium "
            icon="el-icon-search"
            @click="onSearch"
          >{{ controller.searchButtonName }}</el-button>
          <el-button
            type="info"
            size="medium "
            icon="el-icon-refresh"
            @click="onClear"
          >{{ $t("controller.clear") }}</el-button>
        </el-button-group>

        <el-button
          v-if="controller.createButtonName"
          size="medium "
          type="primary"
          icon="el-icon-plus"
          style="float: right"
          :disabled="controller.disableWrite"
          @click.stop="onCreate"
        >{{ controller.createButtonName }}</el-button>
      </el-form>
    </el-row>
    <el-row />
  </div>
</template>

<script>

export default {
  name: 'ControllerForm',
  props: {
    controller: {
      type: Object,
      default: () => {
        return {
          searchButtonName: '',
          createButtonName: '',
          disableWrite: true,
          startDate: 0,
          endDate: 0,
          keyFilterData: {},
          isNeedDataPicker: true
        }
      }
    }
  },
  data() {
    return {
      dates: [],
      pickerOptions: {
        shortcuts: [{
          text: this.$t('controller.lastWeek'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('controller.lastMonth'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t('controller.last3months'),
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    onSearch() {
      if (!this.dates) {
        this.controller.startDate = null
        this.controller.endDate = null
      }
      if (this.dates && this.dates.length === 2) {
        this.controller.startDate = this.dates[0].getTime()
        this.controller.endDate = this.dates[1].getTime()
      }
      this.$emit('search-click')
    },
    onClear() {
      this.$refs['controller-from'].resetFields()
      this.dates = []
      this.controller.startDate = null
      this.controller.endDate = null
      this.controller.keyFilterData = {}
      this.$emit('clear-click')
    },
    onCreate() {
      this.$emit('create-click')
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.controller-from {
  .el-input {
    margin-right: 10px;
    width: 100%;
  }
}
</style>
