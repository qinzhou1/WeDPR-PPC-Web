<template>
  <div v-loading="viewLoading" class="dataset-detail-container">
    <el-form label-position="right" label-width="120px" class="form">
      <el-form-item :label="$t('dataset.datasetId')" size="medium">
        <span>{{ datasetid }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.datasetTitle')" size="medium">
        <span>{{ detail.datasetTitle }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.ownerAgencyId')" size="medium">
        <span>{{ detail.ownerAgencyId }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.ownerAgencyName')" size="medium">
        <span>{{ detail.ownerAgencyName }}</span>
      </el-form-item>
      <el-form-item :label="$t('common.ownerUserName')" size="medium">
        <span>{{ detail.ownerUserName }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.createTime')" size="medium">
        <span>{{ detail.createTime | formatDate }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.datasetFields')" size="medium">
        <span>{{ detail.datasetFields }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.rowCount')" size="medium">
        <span>{{ detail.rowCount }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.columnCount')" size="medium">
        <span>{{ detail.columnCount }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.datasetSize')" size="medium">
        <span>{{ detail.datasetSize + $t("dataset.datasetSizeUnit") }}</span>
      </el-form-item>
      <el-form-item :label="$t('dataset.datasetHash')" size="medium">
        <span>{{ detail.datasetHash }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.storagePath"
        :label="$t('dataset.storagePath')"
        size="medium"
      >
        <span>{{ detail.storagePath }}</span>
      </el-form-item>
      <el-form-item
        v-if="isOwner(detail.ownerUserName, detail.ownerAgencyId)"
        :label="$t('dataset.dataFileLink')"
        size="medium"
      >
        <el-button type="text" @click="downloadFile(datasetid)">{{
          datasetid + ".csv"
        }}</el-button>
      </el-form-item>
      <el-form-item :label="$t('dataset.datasetDescription')">
        <el-input
          v-model="detail.datasetDescription"
          :autosize="{ minRows: 1 }"
          type="textarea"
          readonly
          style="width: 80%"
        />
      </el-form-item>
    </el-form>
    <el-card
      v-if="
        dynamicTableData && isOwner(detail.ownerUserName, detail.ownerAgencyId)
      "
      shadow="never"
      class="table-card"
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
          class="detail-table"
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
    <div class="bottom">
      <el-button
        v-if="isOwner(detail.ownerUserName, detail.ownerAgencyId)"
        type="danger"
        @click="onDeleteDataset(detail.datasetId)"
      >
        {{ $t("dataset.operationChecking.remove") }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import {
  handleFetchResponseMsgBox,
  handleOptResponseMsgBox
} from '@/utils/messageBox'
import { toDynamicTableData } from '@/utils/table'
import {
  queryDatasetDetail,
  downloadDataset,
  deleteDataset
} from '@/api/dataset'
import { downloadAsFile } from '@/utils/download'
import { getUsername, getAgencyId } from '@/utils/auth'
import { getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS } from '@/utils/permission'
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
  data() {
    return {
      that: this,
      viewLoading: true,
      detail: {},
      datasetid: '',
      dynamicTableData: null,
      dataDetailDialog: {}
    }
  },
  created() {
    const { datasetId } = this.$route.query
    this.datasetid = datasetId
    this.datasetid && this.fetchDetail()
  },
  methods: {
    isOwner(owner, agencyId) {
      return (
        agencyId === getAgencyId() &&
        (owner === getUsername() ||
          getPermissions().includes(ADMIN_PERMISSIONS))
      )
    },
    fetchDetail() {
      this.viewLoading = true
      queryDatasetDetail(this.datasetid)
        .then((response) => {
          this.viewLoading = false

          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }

          this.detail = response.data
          if (response.data.dataDetail) {
            this.dynamicTableData = toDynamicTableData(
              response.data.dataDetail
            )
          }
        })
        .catch((_) => {
          this.viewLoading = false
        })
    },
    downloadFile(datasetId) {
      downloadDataset(datasetId).then((response) => {
        downloadAsFile(Base64.decode(response.data), datasetId + '.csv')
      })
    },
    onDeleteDataset(datasetId) {
      this.$confirm(
        this.$t('dataset.operationChecking.deleteChecking'),
        this.$t('common.tip'),
        {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }
      ).then(() => {
        deleteDataset(datasetId).then((response) => {
          if (handleOptResponseMsgBox(this, response, true)) {
            this.dataDetailDialog.show = false
            this.currentPage = 1
            this.fetchDataList({
              pageOffset: (this.currentPage - 1) * this.pageSize,
              pageSize: this.pageSize
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dataset-detail-container {
  padding-top: 20px;
  box-sizing: border-box;
  .form {
    margin-bottom: 10px;
    .el-form-item {
      margin-bottom: 3px;
    }
    .el-input {
      margin-right: 10px;
      width: 100%;
    }
  }
  .bottom {
    text-align: center;
    padding: 20px 0;
  }
  .table-card{
    width: 96%;
    margin: 0 auto;
    margin-top: 30px;
  }
}
</style>
