<template>
  <div>

    <el-row type="flex" justify="left" style="margin-top: 10px">
      <el-button icon="el-icon-back" @click="stepBack">{{
        $t("ays.data.last")
      }}</el-button>
    </el-row>
    <el-form label-position="right" label-width="120px" class="form">
      <el-form-item size="medium" />
      <el-form-item size="medium">
        <span>{{ $t('ays.job.sourceName') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.datasetTitle }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.createUser') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.ownerUserName }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.createTime') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.createTime | formatDate }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('dataset.rowCount') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.rowCount }}</span>
      </el-form-item>
      <el-form-item size="medium">
        <span>{{ $t('dataset.columnCount') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ detail.columnCount }}</span>
      </el-form-item>

      <el-form-item
        size="medium"
      >
        <span>{{ $t('dataset.dataFileLink') }}</span>
        <span>{{ ": " }}</span>
        <el-button type="text" @click="downloadFile(datasetId)">{{
          detail.datasetTitle + ".csv"
        }}</el-button>
      </el-form-item>

    </el-form>

    <el-card
      shadow="never"
      style="width: 90%"
    >
      <div slot="header" class="clearfix">
        <span>
          <b>{{ $t("dataset.datasetDetails") }}</b>
        </span>
      </div>
      <el-tooltip
        effect="light"
        :content="$t('common.tableLimitation')"
        placement="top"
      >
        <el-table
          ref="dynamicTable"
          :data="dynamicTableData.data"
          fit
          stripe
          max-height="600"
        >
          <template v-for="col in dynamicTableData.columns">
            <el-table-column
              :key="col.dataItem"
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
            />
          </template>
        </el-table>
      </el-tooltip>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils'

import { toDynamicTableData } from '@/utils/table'

import { queryDatasetDetail, downloadDataset } from '@/api/dataset'

import { downloadAsFile } from '@/utils/download'

import { Base64 } from 'js-base64'

export default {
  name: 'DatasetDetail',
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, null)
    }
  },

  props: {},

  data() {
    return {
      that: this,

      datasetId: '',

      detail: {},
      deployCache: null,
      dynamicTableData: null

    }
  },

  created() {
    this.onCreated()
  },

  mounted() {},

  methods: {
    onCreated() {
      this.datasetId = this.$route.query.datasetId
      this.fetchDetail()
    },

    fetchDetail() {
      queryDatasetDetail(this.datasetId).then(response => {
        this.detail = response.data
        this.dynamicTableData = toDynamicTableData(response.data.dataDetail)
      })
    },

    downloadFile(datasetId) {
      downloadDataset(datasetId).then(response => {
        downloadAsFile(Base64.decode(response.data), datasetId + '.csv')
      })
    },
    stepBack() {
      this.$router.go(-1)
    },

    // suggestions for user inputs

    uniqueArr(arr) {
      var res = []

      for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
          res.push(arr[i])
        }
      }

      return res
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
