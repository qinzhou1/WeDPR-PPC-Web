<template>
  <div>
    <el-card
      v-loading="viewLoadingAuth"
      style="margin-top: 15px; margin-bottom: 15px"
      shadow="never"
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
          prop="authorizedAgencyId"
          :label="$t('agency.agencyId')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="agencyName"
          :label="$t('agency.agencyName')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="agencyDescription"
          :label="$t('agency.description')"
        />
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
        <el-table-column
          align="center"
          :label="$t('dataset.approveOperation')"
          width="300px"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click.stop="onRevoke(scope.row)"
            >
              {{ $t("dataset.operationChecking.revoke") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card
      v-loading="viewLoadingAuth"
      style="margin-top: 15px; margin-bottom: 15px"
      shadow="never"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <!-- <el-alert
            show-icon
            :title="$t('dataset.waitAuth')"
            type="warning"
            :description="$t('dataset.waitAuthTips')"
          /> -->
          <b>{{ $t("dataset.waitAuth") }} </b>
          <!-- <b>{{ $t("dataset.waitAuthTips") }}
          </b> -->
          <el-alert
            show-icon
            :title="$t('dataset.waitAuthTips')"
            type="warning"
          />
        </span>
      </div>

      <el-table
        ref="dataTable"
        :data="datasetAuthorityRequest"
        style="width: 100%"
        tooltip-effect="light"
      >
        <el-table-column
          show-overflow-tooltip
          prop="authorizedAgencyId"
          :label="$t('agency.agencyId')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="agencyName"
          :label="$t('agency.agencyName')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="agencyDescription"
          :label="$t('agency.description')"
        />
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
          prop="algorithm.algorithmDescription"
          :label="$t('algorithm.algorithmDescription')"
        />

        <el-table-column
          show-overflow-tooltip
          align="center"
          sortable
          prop="authorizationDate"
          :label="$t('dataset.waitAuthorizationDate')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.authorizationDate | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('dataset.approveOperation')"
          width="300px"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-check"
                @click.stop="approveAuthRequest(scope.row)"
              >{{ $t("dataset.operationChecking.approve") }}
              </el-button>
              <!-- <el-button
                size="small"
                type="primary"
                icon="el-icon-close"
                @click.stop="rejectAuthRequest(scope.row)"
              >{{ $t("dataset.operationChecking.reject") }}
              </el-button> -->
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card
      v-loading="agencyLoading"
      style="margin-top: 15px; margin-bottom: 15px"
      shadow="never"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("dataset.selectAgency") }}</b>
        </span>
      </div>
      <el-row>
        <controller-form
          ref="controller-from"
          :controller="controllerData"
          @search-click="onSearch"
        >
          <template slot="keyFilter">
            <el-form :inline="true" class="demo-form-inline" size="medium">
              <el-form-item :label="$t('agency.agencyName')">
                <el-autocomplete
                  v-model="controllerData.keyFilterData.agencyName"
                  :placeholder="$t('agency.agencyNamePlaceHolder')"
                  :fetch-suggestions="fetchAgencyNameSuggestions"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onSearch"
                />
              </el-form-item>
            </el-form>
          </template>
        </controller-form>
      </el-row>
      <el-row>
        <div slot="header" class="clearfix" style="height: 15px">
          <span>
            <b>{{ $t("agency.agencyList") }}</b>
          </span>
        </div>
        <el-table
          :key="Math.random()"
          :data="agencyList"
          fit
          stripe
          tooltip-effect="light"
        >
          <el-table-column
            show-overflow-tooltip
            prop="agencyId"
            :label="$t('agency.agencyId')"
          />
          <el-table-column prop="agencyName" :label="$t('agency.agencyName')" />
          <el-table-column
            prop="agencyDescription"
            :label="$t('agency.description')"
          />
          <el-table-column align="center" :label="$t('dataset.limitedAuth')">
            <template slot-scope="scope">
              <el-switch
                :value="scope.row.agencyId === selectedAgency"
                @change="onSwithAgency($event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="authorizationDate"
            :label="$t('dataset.authorizationDate')"
          >
            <template slot-scope="scope">
              <div class="block">
                <el-date-picker
                  v-model="scope.row.authorizationDate"
                  type="datetime"
                  :picker-options="pickerOptions"
                  :placeholder="$t('dataset.authorizationDate')"
                />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            :label="$t('dataset.batchedOp')"
            width="300px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click.stop="onAuthAll(scope.row)">
                {{ $t("dataset.allAuth") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row
        style="margin-top: 10px; text-align: center; height: 40px; width: 100%"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="paginationTotal"
          @current-change="onCurrentPageChange"
          @prev-click="onPrevPage"
          @next-click="onNextPage"
        />
      </el-row>
    </el-card>
    <el-card
      v-if="showAlgos"
      v-loading="algorithmLoading"
      shadow="never"
      style="margin-top: 10px"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("dataset.chooseAlgorithm") }}</b>
        </span>
      </div>

      <SelectAuthAlgo
        ref="select-auth-algo"
        :agencyid="selectedAgency"
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
        @click.stop="onGrant()"
      >
        {{ $t("dataset.limitedAuth") }}
      </el-button>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { queryDatasetDetail, addAuthorization, execDatasetAuth, deleteAuthorization } from '@/api/dataset'
import { listAgencies } from '@/api/agency'
import { getAgencyId, getPermissions } from '@/utils/auth'
import { check_permission, PermissionGroup, DataGroup } from '@/utils/permission'
import { listAlgorithms } from '@/api/algorithm'
import ControllerForm from '@/components/Controller'
import SelectAuthAlgo from '@/views/dataset/selectAuthAlgo'

export default {
  name: 'DatasetAuth',
  components: {
    ControllerForm,
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
      showAlgos: false,
      viewLoadingAuth: true,
      agencyLoading: true,
      algorithmLoading: false,
      datasetAuthority: [],
      datasetAuthorityRequest: [],
      authedAgencyes: null,
      authedAgencyesRequest: null,
      agencyList: [],
      requesterAgencyNameSet: [],
      datasetId: null,
      selfAgencyId: null,
      pageSize: 5,
      currentPage: 1,
      paginationTotal: 0,
      controllerData: {
        isNeedDataPicker: false,
        disableWrite: false,
        searchButtonName: this.$t('agency.searchButtonName'),
        keyFilterData: {
          ownerAgencyName: null
        }
      },
      agencyNameSet: [],
      algorithmTitleSet: [],
      keyFilterData: {
        ownerAgencyName: null,
        algorithmTitle: null
      },
      selectedAgency: null
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
      return check_permission(getPermissions(), PermissionGroup.DATA_GROUP, DataGroup.WRITE_DATA)
    },

    fetchAgencyNameSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.agencyNameSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },

    fetchAlgoTitleSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.algorithmTitleSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    onCurrentPageChange(page) {
      this.currentPage = page
      this.fetchAgencyList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevPage() {
      this.currentPage = this.currentPage - 1
      this.fetchAgencyList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextPage() {
      this.currentPage = this.currentPage + 1
      this.fetchAgencyList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onSearch() {
      var params = {}
      params.pageOffset = 0
      params.pageSize = this.pageSize
      this.fetchAgencyList(params)
    },
    fetchAgencyList(params) {
      this.agencyLoading = true
      if (this.controllerData.keyFilterData.agencyName) {
        params.agencyName = this.controllerData.keyFilterData.agencyName
      }
      listAgencies(params).then(response => {
        this.agencyLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.paginationTotal = response.data.total
        this.currentPage = (params.pageOffset / params.pageSize) + 1
        this.agencyList = response.data.content.filter(agency => agency.agencyId !== this.selfAgencyId)
        for (var i = 0; i < this.agencyList.length; i++) {
          uniqueAppend(this.agencyNameSet, this.agencyList[i].agencyName)
        }
      }).catch(_ => {
        this.agencyLoading = false
      })
    },

    fetchInfo() {
      this.authedAgencyes = new Set()
      this.authedAgencyesRequest = new Set()

      this.viewLoadingAuth = true
      queryDatasetDetail(this.datasetId).then(response => {
        this.viewLoadingAuth = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        const authorizedAlgoList = response.data.datasetAuthority
        const authoritiesRequest = response.data.datasetAuthorityRequest
        for (var i = 0; i < authorizedAlgoList.length; i++) {
          this.authedAgencyes.add(authorizedAlgoList[i].authorizedAgencyId)
        }
        for (var j = 0; j < authoritiesRequest.length; j++) {
          this.authedAgencyesRequest.add(authoritiesRequest[j].authorizedAgencyId)
        }

        var params = {}
        params.pageOffset = 0
        params.pageSize = this.pageSize
        this.fetchAgencyList(params)

        this.completeAuthority(authorizedAlgoList)
        this.completeAuthorityRequest(authoritiesRequest)
        // console.log(this.datasetAuthorityRequest)
      }).catch(_ => {
        this.viewLoadingAuth = false
      })
    },

    async completeAuthority(authorizedAlgoList) {
      this.datasetAuthority = []
      if (authorizedAlgoList) {
        for (var i = 0; i < authorizedAlgoList.length; i++) {
          var agency = null

          const response = await listAgencies({ agencyId: authorizedAlgoList[i].authorizedAgencyId })
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          agency = response.data.content[0]
          var tempAlgorithm = null

          var currentAlgorithmId = authorizedAlgoList[i].algorithmId
          if (currentAlgorithmId === 'PPC_ALGO_ALL') {
            tempAlgorithm = {
              algorithmId: 'Any',
              algorithmTitle: 'Any',
              algorithmDescription: 'Any'
            }
          } else {
            const algorithmDetailParams = {
              algorithmId: currentAlgorithmId
            }
            const res = await listAlgorithms(algorithmDetailParams)
            if (!handleFetchResponseMsgBox(this, res, false)) {
              return
            }
            tempAlgorithm = {
              algorithmId: currentAlgorithmId,
              algorithmTitle: res.data.content[0].algorithmTitle,
              algorithmDescription: res.data.content[0].algorithmDescription
            }
          }
          this.datasetAuthority.push({
            authorizedAgencyId: authorizedAlgoList[i].authorizedAgencyId,
            agencyName: agency.agencyName,
            agencyDescription: agency.agencyDescription,
            authorizationDate: authorizedAlgoList[i].authorizationDate,
            algorithm: tempAlgorithm
          })
        }
      }
    },
    async completeAuthorityRequest(authorizedAlgoList) {
      this.datasetAuthorityRequest = []
      if (authorizedAlgoList) {
        for (var i = 0; i < authorizedAlgoList.length; i++) {
          var agency = null

          const response = await listAgencies({ agencyId: authorizedAlgoList[i].authorizedAgencyId })
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          agency = response.data.content[0]

          var tempAlgorithm = null
          var currentAlgorithmId = authorizedAlgoList[i].algorithmId
          if (currentAlgorithmId === 'PPC_ALGO_ALL') {
            tempAlgorithm = {
              algorithmId: 'Any',
              algorithmTitle: 'Any',
              algorithmDescription: 'Any'
            }
          } else {
            const algorithmDetailParams = {
              algorithmId: currentAlgorithmId
            }
            const res = await listAlgorithms(algorithmDetailParams)
            if (!handleFetchResponseMsgBox(this, res, false)) {
              return
            }
            tempAlgorithm = {
              algorithmId: currentAlgorithmId,
              algorithmTitle: res.data.content[0].algorithmTitle,
              algorithmDescription: res.data.content[0].algorithmDescription
            }
          }
          this.datasetAuthorityRequest.push({
            authorizedAgencyId: authorizedAlgoList[i].authorizedAgencyId,
            agencyName: agency.agencyName,
            agencyDescription: agency.agencyDescription,
            authorizationDate: authorizedAlgoList[i].authorizationDate,
            algorithm: tempAlgorithm
          })
        }
      }
    },

    onSwithAgency($event, data) {
      if ($event) { // select
        this.selectedAgency = data.agencyId
        this.showAlgos = true
      } else { // cancel
        this.selectedAgency = null
        this.showAlgos = false
      }
    },

    refreshPage() {
      this.selectedAgency = null
      this.datasetAuthority = []
      this.agencyList = []
      this.currentPage = 1
      this.paginationTotal = 0
      if (this.showAlgos) {
        this.$refs['select-auth-algo'].onFinish()
      }
      this.showAlgos = false
      this.fetchInfo()
    },
    approveAuthRequest(row) {
      this.$confirm(this.$t('dataset.operationChecking.approveChecking'), this.$t('dataset.operationChecking.checking'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        const authParams = {
          datasetId: this.datasetId,
          algorithmId: row.algorithm.algorithmId,
          agencyId: row.authorizedAgencyId,
          authorizedAlgoList:
            [{
              authorizedAgencyId: row.authorizedAgencyId,
              authorizationDate: row.authorizationDate,
              algorithmId: row.algorithm.algorithmId
            }]
        }
        execDatasetAuth(authParams).then(response => {
          if (handleOptResponseMsgBox(this, response, true)) {
            this.refreshPage()
          }
        })
      })
    },
    rejectAuthRequest(row) {
      this.$confirm(this.$t('dataset.operationChecking.rejectChecking'), this.$t('dataset.operationChecking.checking'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        const authParams = {
          datasetId: this.datasetId,
          algorithmId: row.algorithm.algorithmId,
          agencyId: row.authorizedAgencyId,
          authorizedAlgoList:
            []
        }
        execDatasetAuth(authParams).then(response => {
          if (handleOptResponseMsgBox(this, response, true)) {
            this.refreshPage()
          }
        })
      })
    },
    onGrant() {
      if (!this.selectedAgency) {
        this.$alert(this.$t('dataset.authAgency'), {
          confirmButtonText: this.$t('common.confirm'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('dataset.operationChecking.approveChecking'), this.$t('dataset.operationChecking.checking'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.$refs['select-auth-algo'].returnSelectedAlgo()
      })
    },
    onRevoke(row) {
      this.$confirm(this.$t('dataset.operationChecking.revokeChecking'), this.$t('dataset.operationChecking.checking'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        if (row.algorithm.algorithmId === 'Any') {
          row.algorithm.algorithmId = 'PPC_ALGO_ALL'
        }
        const authParams = {
          datasetId: this.datasetId,
          authorizedAlgoList:
            [{
              authorizedAgencyId: row.authorizedAgencyId,
              algorithmId: row.algorithm.algorithmId
            }]
        }
        deleteAuthorization(authParams).then(response => {
          handleOptResponseMsgBox(this, response, true)
          this.refreshPage()
        })
      })
    },

    onGetSelectedAlgo(selectedAlgoList) {
      const authParams = {
        datasetId: this.datasetId,
        authorizedAlgoList: selectedAlgoList
      }
      addAuthorization(authParams).then(response => {
        handleOptResponseMsgBox(this, response, true)
        this.refreshPage()
      })
    },

    onAuthAll(data) {
      if (typeof (data.authorizationDate) === 'undefined') {
        this.$alert(this.$t('dataset.authExpiredTime'), {
          confirmButtonText: this.$t('common.confirm'),
          type: 'warning'
        })
        return
      }

      var selectedAlgoList = []

      selectedAlgoList.push({
        authorizedAgencyId: data.agencyId,
        authorizationDate: data.authorizationDate.getTime(),
        algorithmId: 'PPC_ALGO_ALL'
      })

      this.onGetSelectedAlgo(selectedAlgoList)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
