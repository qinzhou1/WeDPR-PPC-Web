<template>
  <div>
    <!-- <el-card style="margin-top: 15px; margin-bottom: 15px" shadow="never">
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("dataset.dataDetailDialog") }}</b>
        </span>
      </div>
      <DatasetDetail :datasetid="datasetId" />
    </el-card> -->
    <el-card
      v-loading="viewLoadingAuth"
      style="margin-top: 15px; margin-bottom: 15px"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("dataset.authList") }}</b>
        </span>
      </div>
      <el-table
        ref="dataTable"
        :data="datasetAuthority"
        style="width: 100%"
        tooltip-effect="light"
        :default-sort="{ prop: 'authorizationDate', order: 'descending' }"
      >
        <el-table-column
          show-overflow-tooltip
          prop="algorithm.algorithmId"
          :label="$t('algorithm.algorithmId')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="algorithm.algorithmTitle"
          :label="$t('algorithm.algorithmTitle')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="algorithm.algorithmType"
          :label="$t('algorithm.algorithmType')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="algorithm.algorithmDescription"
          :label="$t('algorithm.algorithmDescription')"
        />
        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable
          prop="authorizationDate"
          :label="$t('dataset.authorizationDate')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.authorizationDate | formatDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row v-if="!hashAllAuthority">
      <el-card style="margin-top: 10px">
        <div slot="header" class="clearfix" style="height: 15px">
          <span>
            <b>{{ $t("dataset.chooseAlgorithm") }}</b>
          </span>
        </div>
        <SelectAuthAlgo
          ref="select-auth-algo"
          :agencyid="selfAgencyId"
          @return-selected-algo="onGetSelectedAlgo"
        />
      </el-card>
      <el-row
        type="flex"
        class="row-bg"
        justify="center"
        style="margin-top: 20px; margin-bottom: 20px"
      >
        <el-button
          type="primary"
          style="width: 200px; height: 40px"
          @click.stop="requestAuth()"
        >
          {{ $t("dataset.requestAuth") }}
        </el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { queryDatasetDetail, requestDatasetAuth } from '@/api/dataset'
import { getAgencyId, getPermissions } from '@/utils/auth'
import { check_permission, PermissionGroup, DataGroup } from '@/utils/permission'
import { listAlgorithms } from '@/api/algorithm'
import SelectAuthAlgo from '@/views/dataset/selectAuthAlgo'

export default {
  name: 'RequestAuth',
  components: {
    SelectAuthAlgo
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
    }
  },
  props: {
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      that: this,
      viewLoadingAuth: null,
      datasetId: null,
      selfAgencyId: null,
      hashAllAuthority: false,
      datasetAuthority: []
    }
  },
  created() {
    if (!this.hasPermission()) {
      this.$message({
        message: 'Insufficient authority',
        type: 'warning'
      })
      this.$router.go(-1)
    } else {
      this.datasetId = this.$route.query.datasetId
      this.selfAgencyId = getAgencyId()
      this.fetchInfo()
    }
  },
  methods: {
    hasPermission() {
      return check_permission(getPermissions(), PermissionGroup.DATA_GROUP, DataGroup.LIST_DATA)
    },

    fetchInfo() {
      this.viewLoadingAuth = true
      queryDatasetDetail(this.datasetId).then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          this.viewLoadingAuth = false
          return
        }
        this.completeAuthority(response.data.datasetAuthority)
        this.viewLoadingAuth = false
      }).catch(_ => {
        this.viewLoadingAuth = false
      })
    },

    async completeAuthority(authorizedAlgoList) {
      this.datasetAuthority = []
      if (authorizedAlgoList) {
        for (var i = 0; i < authorizedAlgoList.length; i++) {
          if (authorizedAlgoList[i].authorizedAgencyId === this.selfAgencyId) {
            var newAlgorithm = null

            var currentAlgorithmId = authorizedAlgoList[i].algorithmId
            if (currentAlgorithmId === 'PPC_ALGO_ALL') {
              newAlgorithm = {
                algorithmId: 'Any',
                algorithmTitle: 'Any',
                algorithmType: 'Any',
                algorithmDescription: 'Any'
              }
              this.hashAllAuthority = true
            } else {
              const algorithmDetailParams = {
                algorithmId: currentAlgorithmId
              }
              const res = await listAlgorithms(algorithmDetailParams)
              if (!handleFetchResponseMsgBox(this, res, false)) {
                return
              }
              newAlgorithm = {
                algorithmId: currentAlgorithmId,
                algorithmTitle: res.data.content[0].algorithmTitle,
                algorithmType: res.data.content[0].algorithmType,
                algorithmDescription: res.data.content[0].algorithmDescription
              }
            }
            this.datasetAuthority.push({
              authorizationDate: authorizedAlgoList[i].authorizationDate,
              algorithm: newAlgorithm
            })
          }
        }
      }
    },

    requestAuth() {
      this.$refs['select-auth-algo'].returnSelectedAlgo()
    },

    onGetSelectedAlgo(selectedAlgo) {
      var reuqestParams = {
        datasetId: this.datasetId,
        authorizedAlgoList: selectedAlgo
      }
      requestDatasetAuth(reuqestParams).then((response) => {
        handleOptResponseMsgBox(this, response, true)
        this.clearPage()
      })
    },

    clearPage() {
      this.datasetAuthority = []
      this.$refs['select-auth-algo'].onFinish()
      this.hashAllAuthority = false
      this.fetchInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
