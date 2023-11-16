<template>
  <div v-loading="viewLoading" class="algorithm-detail-container">
    <el-form label-position="right" label-width="130px" class="form">
      <el-form-item :label="$t('algorithm.algorithmId')" size="medium">
        <span>{{ algorithmId }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.algorithmTitle"
        :label="$t('algorithm.algorithmTitle')"
        size="medium"
      >
        <span>{{ detail.algorithmTitle }}</span>
      </el-form-item>
      <el-form-item :label="$t('algorithm.algorithmVersion')" size="medium">
        <span>{{ detail.algorithmVersion }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.algorithmType"
        :label="$t('algorithm.algorithmType')"
        size="medium"
      >
        <template>
          <span>{{ detail.algorithmType }}</span>
        </template>
      </el-form-item>
      <el-form-item
        v-if="detail.inputCount"
        :label="$t('algorithm.inputCount')"
        size="medium"
      >
        <span>{{ detail.inputCount }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.ownerAgencyId"
        :label="$t('algorithm.ownerAgencyId')"
        size="medium"
      >
        <span>{{ detail.ownerAgencyId }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.ownerAgencyName"
        :label="$t('algorithm.ownerAgencyName')"
        size="medium"
      >
        <span>{{ detail.ownerAgencyName }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.ownerUserName"
        :label="$t('common.ownerUserName')"
        size="medium"
      >
        <span>{{ detail.ownerUserName }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.createTime"
        :label="$t('algorithm.createTime')"
        size="medium"
      >
        <span>{{ detail.createTime | formatDate }}</span>
      </el-form-item>
      <el-form-item v-if="detail.sqlModule" label="PPC_SQL" size="medium">
        <el-card shadow="never" style="width: 80%">
          <pre v-highlightjs="beautiSql"><code class="sql" /></pre>
        </el-card>
      </el-form-item>
      <el-form-item
        v-if="detail.algorithmSubtype"
        :label="$t('algorithm.algorithmSubtype')"
        size="medium"
      >
        <span>{{ detail.algorithmSubtype }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.mpcModelModule"
        :label="$t('algorithm.mpcModelModule')"
        size="medium"
      >
        <pre
          v-highlightjs="detail.mpcModelModule"
          style="width: 80%; border: 1px solid #dcdfe6"
        >
              <code style="height:200px" class="json" />
          </pre>
      </el-form-item>
      <el-form-item
        v-if="detail.matchModule"
        :label="$t('match模型配置')"
        size="medium"
      >
        <pre
          v-highlightjs="detail.matchModule"
          style="width: 80%; border: 1px solid #dcdfe6"
        >
              <code style="height:200px" class="json" />
          </pre>
      </el-form-item>
      <el-form-item
        v-if="detail.participantAgency"
        :label="$t('algorithm.participantAgency')"
        size="medium"
      >
        <span>{{ detail.participantAgency }}</span>
      </el-form-item>
      <el-form-item
        v-if="detail.mpcModule"
        :label="$t('algorithm.mpcModule')"
        size="medium"
      >
        <el-link
          type="primary"
          target="_blank"
          @click="
            onDownloadContent(detail.mpcModule, detail.algorithmTitle + '.ppc')
          "
        >{{ detail.algorithmTitle + ".ppc" }}</el-link>
      </el-form-item>
      <el-form-item
        v-if="detail.matchModule"
        label="MATCH算法文件"
        size="medium"
      >
        <el-link
          type="primary"
          target="_blank"
          @click="
            onDownloadContent(detail.matchModule, detail.algorithmTitle + '.json')
          "
        >{{ detail.algorithmTitle + ".json" }}</el-link>
      </el-form-item>
      <el-form-item
        v-if="detail.algorithmDescription"
        :label="$t('algorithm.algorithmDescription')"
      >
        <el-input
          v-model="detail.algorithmDescription"
          :autosize="{ minRows: 1 }"
          type="textarea"
          readonly
          style="width: 80%"
        />
      </el-form-item>
    </el-form>
    <div class="bottom">
      <el-button
        v-if="isOwner(detail.ownerUserName, detail.ownerAgencyId)"
        type="danger"
        @click="onDeleteAlgo(detail.algorithmId, detail.algorithmVersion)"
      >{{ $t("algorithm.deleteAlgo") }}</el-button>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { getUsername, getAgencyId } from '@/utils/auth'
import {
  handleFetchResponseMsgBox,
  handleOptResponseMsgBox
} from '@/utils/messageBox'
import { downloadAsFile } from '@/utils/download'
import { getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS } from '@/utils/permission'
import { queryAlgorithmDetail, deleteAlgorithm } from '@/api/algorithm'
import vkbeautify from 'vkbeautify'

export default {
  name: 'AlgorithmDetail',
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
      viewLoading: true,
      beautiSql: null,
      that: this,
      detail: {},
      algorithmId: '',
      algorithmVersion: ''
    }
  },
  created() {
    const { algorithmId, algorithmVersion } = this.$route.query
    this.algorithmId = algorithmId
    this.algorithmVersion = algorithmVersion
    this.fetchDetail(algorithmId, algorithmVersion)
  },
  methods: {
    fetchDetail(algorithmId, algorithmVersion) {
      this.viewLoading = true
      queryAlgorithmDetail(algorithmId, algorithmVersion)
        .then((response) => {
          this.viewLoading = false
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          this.detail = response.data
          this.beautiSql = vkbeautify.sql(this.detail.sqlModule)
        })
        .catch((_) => {
          this.viewLoading = false
        })
    },
    onDeleteAlgo(algorithmId, algorithmVersion) {
      this.$confirm(
        this.$t('algorithm.deleteChecking'),
        this.$t('common.tip'),
        {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }
      ).then(() => {
        deleteAlgorithm(algorithmId, algorithmVersion).then((response) => {
          if (handleOptResponseMsgBox(this, response, true)) {
            this.algorithmDetailDialog.show = false
            this.currentPage = 1
            this.fetchAlgorithmList({
              pageOffset: (this.currentPage - 1) * this.pageSize,
              pageSize: this.pageSize
            })
          }
        })
      })
    },
    openPage(url) {
      window.open(url, 'target')
    },
    onDownloadContent(content, filename) {
      downloadAsFile(content, filename)
    },
    isOwner(owner, agencyId) {
      return (
        agencyId === getAgencyId() &&
        (owner === getUsername() ||
          getPermissions().includes(ADMIN_PERMISSIONS))
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.algorithm-detail-container{
  padding-top: 20px;
  box-sizing: border-box;
}
div.bottom{
  text-align:center;
  padding: 20px 0;
}
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
</style>
