<template>
  <div>
    <el-card>
      <el-row>
        <controller-form
          ref="controller-from"
          :controller="controllerFirstData"
          @search-click="onDataSearch"
          @create-click="onNewJobCreate"
        >
          <template slot="keyFilter">
            <el-form inline class="demo-form-inline" size="medium">
              <el-form-item :label="$t('ays.index.resource')">
                <el-input
                  v-model="controllerFirstData.keyFilterData.dataResourceName"
                  :fetch-suggestions="fetchResourceSuggestions"
                  :placeholder="$t('ays.index.resourceName')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onDataSearch"
                />
              </el-form-item>
              <el-form-item v-if="onlyDataOwnerAgency">
                <el-date-picker
                  v-model="controllerFirstData.keyFilterData.createTime"
                  :fetch-suggestions="fetchSearchTimeSuggestions"
                  :placeholder="$t('ays.index.newDay')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onDataSearch"
                />
              </el-form-item>
              <el-form-item v-else>
                <el-input
                  v-model="controllerFirstData.keyFilterData.providerAgency"
                  :fetch-suggestions="fetchSearchTimeSuggestions"
                  :placeholder="$t('ays.index.providerAgency')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onDataSearch"
                />
              </el-form-item>
            </el-form>
          </template>
        </controller-form>
      </el-row>
      <el-row>
        <el-tabs
          v-model="tabActiveDataName"
          type="card"
          @tab-click="onTabDataChange"
        >
          <el-tab-pane name="current" :label="$t('ays.index.myData')">
            <el-table
              ref="jobTable"
              v-loading="jobsLoading"
              tooltip-effect="light"
              :data="aysDatasets"
              fit
              stripe
              style="width: 100%"
            >
              <el-table-column
                show-overflow-tooltip
                prop="datasetTitle"
                :label="$t('ays.index.resourceName')"
              />
              <el-table-column
                show-overflow-tooltip
                :label="$t('ays.index.resourceProb')"
              >
                <template slot-scope="scope">
                  <span>{{ $t("ays.index.titleFileds") }}</span>
                  <span>{{ ":" }}</span>
                  <span>{{ scope.row.datasetFields }}</span>
                  <span>{{ "," }}</span>
                  <span>{{ scope.row.recordCount }}</span>
                  <span>{{ $t("ays.index.row") }}</span>
                  <span>{{ scope.row.columnCount }}</span>
                  <span>{{ $t("ays.index.col") }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('ays.index.newTime')">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>

              <el-table-column
                width="200px"
                :label="$t('ays.index.authOperation')"
              >
                <template slot-scope="scope">
                  <el-badge
                    :value="scope.row.datasetAuthorityRequest.length"
                    :max="9"
                    :hidden="scope.row.datasetAuthorityRequest.length == 0"
                    class="item"
                    style="margin-top: 10px"
                  >
                    <el-button
                      type="primary"
                      size="mini"
                      @click.stop="showDatasetAuthByColumn(scope.row)"
                    >
                      {{ $t("dataset.auth") }}
                    </el-button>
                  </el-badge>
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                width="80px"
                align="center"
                :label="$t('ays.job.index')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-s-help"
                    @click.stop="onShowDatasetJob(scope.row)"
                  />
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                width="160px"
                align="center"
                :label="$t('ays.index.datasetDetail')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-info"
                    @click.stop="onShowDatasetDetail(scope.row)"
                  />
                </template>
              </el-table-column>

              <!-- all agency dataset in search-->
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="other" :label="$t('ays.index.allData')">
            <el-table
              ref="jobTable"
              v-loading="jobsLoading"
              tooltip-effect="light"
              :data="aysDatasets"
              fit
              stripe
              style="width: 100%"
            >
              <el-table-column
                show-overflow-tooltip
                prop="datasetTitle"
                :label="$t('ays.index.resourceName')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerAgencyName"
                :label="$t('ays.index.providerAgency')"
              />
              <el-table-column
                show-overflow-tooltip
                :label="$t('ays.index.resourceProb')"
              >
                <template slot-scope="scope">
                  <span>{{ $t("ays.index.titleFileds") }}</span>
                  <span>{{ ":" }}</span>
                  <span>{{ scope.row.datasetFields }}</span>
                  <span>{{ "," }}</span>
                  <span>{{ scope.row.recordCount }}</span>
                  <span>{{ $t("ays.index.row") }}</span>
                  <span>{{ scope.row.columnCount }}</span>
                  <span>{{ $t("ays.index.col") }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('ays.index.newTime')">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                :label="$t('ays.index.isAuth')"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.isAuthorized">{{
                    $t("ays.index.isTrue")
                  }}</span>
                  <span v-else>{{ $t("ays.index.isFalse") }}</span>
                </template>
              </el-table-column>

              <el-table-column width="200px" :label="$t('ays.index.operation')">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.isAuthorized"
                    type="primary"
                    size="mini"
                    @click.stop="onNewJob(scope.row)"
                  >
                    {{ $t("ays.index.createAysButtonName") }}
                  </el-button>
                  <el-button
                    v-else
                    class="item"
                    type="warning"
                    size="mini"
                    @click.stop="onRequest(scope.row)"
                  >
                    {{ $t("ays.index.requestAysButtonName") }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row
        style="margin-top: 10px; text-align: center; height: 40px; width: 100%"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="dataCurrentPage"
          :page-size="dataPageSize"
          :total="dataPaginationTotal"
          @current-change="onCurrentDataPageChange"
          @prev-click="onPrevDataPage"
          @next-click="onNextDataPage"
        />
      </el-row>
    </el-card>

    <!-- history search table -->

    <el-card>
      <el-row>
        <controller-form
          ref="controller-from"
          :controller="controllerData"
          @search-click="onJobSearch"
        >
          <template slot="keyFilter">
            <el-form inline class="demo-form-inline" size="medium">
              <el-form-item :label="$t('ays.index.history')">
                <el-input
                  v-model="controllerData.keyFilterData.jobResourceName"
                  :fetch-suggestions="fetchResourceSuggestions"
                  :placeholder="$t('ays.index.resourceName')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onJobSearch"
                />
              </el-form-item>
              <el-form-item v-if="onlyOwnerAgency">
                <el-input
                  v-model="
                    controllerData.keyFilterData.receivedResultAgencyName
                  "
                  :fetch-suggestions="fetchSearchIdSuggestions"
                  :placeholder="$t('ays.index.searchAgency')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onJobSearch"
                />
              </el-form-item>
              <!-- <el-form-item v-else>
                <el-input
                  v-model="controllerData.keyFilterData.searchAgencyName"
                  :fetch-suggestions="fetchSearchIdSuggestions"
                  :placeholder="$t('ays.index.requestAgency')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onJobSearch"
                />
              </el-form-item> -->
            </el-form>
          </template>
        </controller-form>
      </el-row>
      <el-row>
        <el-tabs v-model="tabActiveName" type="card" @tab-click="onTabChange">
          <el-tab-pane name="current" :label="$t('ays.index.mySearch')">
            <el-table
              ref="jobTable"
              v-loading="jobsLoading"
              tooltip-effect="light"
              :data="aysJobs"
              fit
              stripe
              style="width: 100%"
            >
              <el-table-column
                show-overflow-tooltip
                prop="datasetTitle"
                :label="$t('ays.index.resource')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="agencyName"
                :label="$t('ays.index.searchAgency')"
              />
              <el-table-column :label="$t('ays.index.resourceProb')">
                <template slot-scope="scope">
                  <span>{{ $t("ays.index.titleFileds") }}</span>
                  <span>{{ ":" }}</span>
                  <span>{{ scope.row.datasetFields }}</span>
                  <span>{{ "," }}</span>
                  <span>{{ scope.row.recordCount }}</span>
                  <span>{{ $t("ays.index.row") }}</span>
                  <span>{{ scope.row.columnCount }}</span>
                  <span>{{ $t("ays.index.col") }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('ays.index.createTime')">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                width="160px"
                align="center"
                :label="$t('ays.index.searchDetail')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-info"
                    @click.stop="onShowAysJobResult(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="other" :label="$t('ays.index.mySearched')">
            <el-table
              ref="jobTable"
              v-loading="jobsLoading"
              tooltip-effect="light"
              :data="aysJobs"
              fit
              stripe
              style="width: 100%"
            >
              <el-table-column
                show-overflow-tooltip
                prop="datasetTitle"
                :label="$t('ays.index.resource')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="receiverId"
                :label="$t('ays.index.requestAgency')"
              />
              <el-table-column :label="$t('ays.index.resourceProb')">
                <template slot-scope="scope">
                  <span>{{ $t("ays.index.titleFileds") }}</span>
                  <span>{{ ":" }}</span>
                  <span>{{ scope.row.datasetFields }}</span>
                  <span>{{ "," }}</span>
                  <span>{{ scope.row.recordCount }}</span>
                  <span>{{ $t("ays.index.row") }}</span>
                  <span>{{ scope.row.columnCount }}</span>
                  <span>{{ $t("ays.index.col") }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('ays.index.createTime')">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row
        style="margin-top: 10px; text-align: center; height: 40px; width: 100%"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="jobCurrentPage"
          :page-size="jobPageSize"
          :total="jobPaginationTotal"
          @current-change="onCurrentPageChange"
          @prev-click="onPrevJobPage"
          @next-click="onNextJobPage"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { requestDatasetAuth, listDataset } from '@/api/dataset'

import {
  handleFetchResponseMsgBox
} from '@/utils/messageBox'
import { stringArrToObjectArr } from '@/utils/array'
import { queryAysJobs } from '@/api/ays'
import { listAgencies } from '@/api/agency'
import {
  getAgencyId,
  getPermissions
} from '@/utils/auth'
import {
  check_permission,
  PermissionGroup,
  JobGroup
} from '@/utils/permission'

import ControllerForm from '@/components/Controller'

export default {
  name: 'JobManager',
  components: {
    ControllerForm
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d}')
    }
  },
  props: {},
  data() {
    return {
      that: this,
      timer: null,
      onlyOwnerAgency: true,
      onlyDataOwnerAgency: true,
      tabActiveName: 'current',
      tabActiveDataName: 'current',
      agencySet: [],
      jobResourceSet: [],
      createTimeSet: [],
      controllerFirstData: {
        disableWrite: true,
        searchButtonName: this.$t('job.index.searchButtonName'),
        createButtonName: this.$t('ays.index.createAysButtonName'),
        startDate: 0,
        endDate: 0,
        keyFilterData: {
          dataResourceName: null,
          createTime: null,
          providerAgency: null
        }
      },
      controllerData: {
        disableWrite: true,
        searchButtonName: this.$t('job.index.searchButtonName'),
        // createButtonName: this.$t("ays.index.createAysButtonName"),
        startDate: 0,
        endDate: 0,
        keyFilterData: {
          jobResourceName: null,
          receivedResultAgencyName: null,
          searchAgencyName: null
        }
      },
      jobPageSize: 5,
      jobCurrentPage: 1,
      jobPaginationTotal: 0,
      jobDeployCache: null,
      dataPageSize: 5,
      dataCurrentPage: 1,
      dataPaginationTotal: 0,
      dataDeployCache: null,
      operationKey: 0,
      aysJobs: [
        {
          receiverId: null,
          agencyId: null,
          agencyName: null,
          jobId: null,
          datasetTitle: null,
          recordCount: null,
          columnCount: null,
          datasetFields: null,
          createTime: null,
          jobCreator: null
        }
      ],
      aysDatasets: [
        {
          datasetId: null,
          datasetTitle: null,
          ownerAgencyId: null,
          ownerAgencyName: null,
          ownerUserName: null,
          datasetDescription: null,
          createTime: null,
          datasetFields: null,
          isAuthorized: null,
          columnCount: null,
          recordCount: null
        }
      ],
      jobsLoading: false
    }
  },
  created() {
    this.onCreated()
  },
  mounted() { },
  methods: {
    onCreated() {
      if (!this.hasPermission()) {
        this.$message({
          message: 'Insufficient authority',
          type: 'warning'
        })
        this.$router.go(-1)
      } else if (this.$route.query.tabActiveName) {
        this.tabActiveName = this.$route.query.tabActiveName
        this.onlyOwnerAgency = false
        this.fetchAysJobs()
      } else if (this.$route.query.tabActiveDataName) {
        this.tabActiveDataName = this.$route.query.tabActiveDataName
        this.onlyDataOwnerAgency = false
        this.fetchAysData()
      } else {
        this.fetchAgencyList()
        this.fetchAysJobs({
          pageOffset: (this.jobCurrentPage - 1) * this.jobPageSize,
          pageSize: this.jobPageSize
        })
        this.fetchAysData({
          pageOffset: (this.jobCurrentPage - 1) * this.jobPageSize,
          pageSize: this.jobPageSize
        })
      }
    },
    hasPermission() {
      if (
        check_permission(
          getPermissions(),
          PermissionGroup.JOB_GROUP,
          JobGroup.WRITE_JOB
        )
      ) {
        this.controllerData.disableWrite = false
        this.controllerFirstData.disableWrite = false
      }
      return check_permission(
        getPermissions(),
        PermissionGroup.JOB_GROUP,
        JobGroup.LIST_JOB
      )
    },
    onShowDatasetDetail(row) {
      var datasetId = row.datasetId
      this.$router.push({
        path: '/job/ays/dataDetail',
        query: {
          datasetId: datasetId
        }
      })
    },
    onShowDatasetJob(row) {
      var datasetId = row.datasetId
      this.$router.push({
        path: '/job/ays/dataJob',
        query: {
          datasetId: datasetId,
          jobAlgorithmTypeList: 'PPC_AYS'
        }
      })
    },
    onJobSearch() {
      var params = {}
      params.pageOffset = 0
      params.pageSize = this.jobPageSize
      this.fetchAysJobs(params)
    },
    onDataSearch() {
      var params = {}
      params.pageOffset = 0
      params.pageSize = this.dataPageSize
      this.fetchAysData(params)
    },
    onRequest(row) {
      this.requestAuth(row)
    },
    onNewJob(row) {
      // if(row != null) {
      //   params = row
      // }
      this.$router.push({
        path: '/job/ays/new',
        query: {
          datasetId: row.datasetId,
          datasetTitle: row.datasetTitle,
          datasetFields: row.datasetFields,
          datasetDescription: row.datasetDescription,
          createTime: row.createTime,
          ownerAgencyName: row.ownerAgencyName
        }
      })
    },
    onNewJobCreate() {
      this.$router.push({
        path: '/job/ays/new'
      })
    },
    // onNewJobCreateWithParam(row) {
    //   this.$router.push({
    //     path: '/job/ays/new',
    //     query: {
    //       params: row,
    //     }
    //   })
    // },

    fetchAgencyList() {
      listAgencies().then((response) => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        const nodes = response.data.content
        for (var i = 0; i < nodes.length; i++) {
          this.agencySet.push(nodes[i].agencyName)
        }
      })
    },
    fetchAysJobs(params) {
      this.aysJobs = []
      if (this.onlyOwnerAgency) {
        params.searchMyFilter = 1
      } else {
        params.searchMyFilter = 0
      }
      if (this.controllerData.keyFilterData.jobResourceName) {
        params.datasetTitle = this.controllerData.keyFilterData.jobResourceName
      }
      if (this.controllerData.keyFilterData.receivedResultAgencyName) {
        params.agencyName =
          this.controllerData.keyFilterData.receivedResultAgencyName
      }
      // if (this.controllerData.keyFilterData.searchAgencyName) {
      //   params.agencyName =
      //     this.controllerData.keyFilterData.searchAgencyName
      // }
      if (this.controllerData.startDate !== 0) {
        params.dateRangeStart = this.controllerData.startDate
      }
      if (this.controllerData.endDate !== 0) {
        params.dateRangeEnd = this.controllerData.endDate
      }
      queryAysJobs(params)
        .then((response) => {
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          this.aysJobs = response.data.content
          console.log(this.aysJobs)

          this.jobPaginationTotal = response.data.total
          this.jobDeployCache = new Array(this.jobPaginationTotal)
          this.jobCurrentPage = params.pageOffset / params.pageSize + 1
        })
        .catch((_) => {
          this.jobsLoading = false
        })
    },
    showDatasetAuthByColumn(row) {
      var datasetId = row.datasetId

      this.$router.push({
        path: '/dataset/auth',
        query: {
          datasetId: datasetId
        }
      })
    },
    isAuth(authFlag) {
      return authFlag
    },
    requestAuth(params) {
      const PPC_AYS = 'a-1001'
      var reuqestParams = {
        datasetId: params.datasetId,
        authorizedAlgoList: [{
          algorithmId: PPC_AYS,
          authorizationDate: Date.now() + 365 * 8640000,
          authorizedAgencyId: getAgencyId()
        }]
      }
      this.$alert(this.$t('ays.tips.authRequestAlert1') +
        '，' + this.$t('ays.tips.authRequestAlert2'), {
        confirmButtonText: this.$t('common.confirm')
      })
      requestDatasetAuth(reuqestParams).then((response) => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
      }).catch((_) => {
        this.jobsLoading = false
      })
    },
    fetchAysData(params) {
      this.aysDatasets = []
      if (this.onlyDataOwnerAgency) {
        params.ownerAgencyId = getAgencyId()
      }
      if (this.controllerFirstData.keyFilterData.dataResourceName) {
        params.datasetTitle =
          this.controllerFirstData.keyFilterData.dataResourceName
      }
      if (this.controllerFirstData.keyFilterData.createTime) {
        params.dateRangeStart =
          this.controllerFirstData.keyFilterData.createTime.getTime()
        params.dateRangeEnd = params.dateRangeStart + 86400000
      }
      if (this.controllerFirstData.keyFilterData.providerAgency) {
        params.ownerAgencyName =
          this.controllerFirstData.keyFilterData.providerAgency
      }
      // if (this.controllerFirstData.startDate !== 0) {
      //   params.dateRangeStart = this.controllerFirstData.startDate
      // }
      // if (this.controllerFirstData.endDate !== 0) {
      //   params.dateRangeEnd = this.controllerFirstData.endDate
      // }

      params.algorithmId = 'a-1001'
      this.jobsLoading = true
      listDataset(params)
        .then((response) => {
          this.jobsLoading = false
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          this.aysDatasets = response.data.content
          this.dataPaginationTotal = response.data.total
          this.dataDeployCache = new Array(this.dataPaginationTotal)
          this.dataCurrentPage = params.pageOffset / params.pageSize + 1
          // console.log(this.aysDatasets[0].isAuthorized)
        })
        .catch((_) => {
          this.jobsLoading = false
        })
    },
    onTabChange(tab, event) {
      this.onlyOwnerAgency = (tab.name === 'current')
      this.$refs['controller-from'].onClear()
      this.refreshAysJobList()
    },
    onTabDataChange(tab, event) {
      this.onlyDataOwnerAgency = (tab.name === 'current')
      this.$refs['controller-from'].onClear()
      this.refreshAysDataList()
    },
    refreshAysJobList() {
      this.jobCurrentPage = 1
      this.fetchAysJobs({ pageOffset: (this.jobCurrentPage - 1) * this.jobPageSize, pageSize: this.jobPageSize })
    },
    refreshAysDataList() {
      this.dataCurrentPage = 1
      this.fetchAysData({ pageOffset: (this.dataCurrentPage - 1) * this.jobPageSize, pageSize: this.jobPageSize })
    },
    onCurrentPageChange(page) {
      this.jobCurrentPage = page
      this.fetchAysJobs({
        pageOffset: (this.jobCurrentPage - 1) * this.jobPageSize,
        pageSize: this.jobPageSize
      })
    },
    onPrevJobPage() {
      this.jobCurrentPage = this.jobCurrentPage - 1
      this.fetchAysJobs({
        pageOffset: (this.jobCurrentPage - 1) * this.jobPageSize,
        pageSize: this.jobPageSize
      })
    },
    onNextJobPage() {
      this.jobCurrentPage = this.jobCurrentPage + 1
      this.fetchAysJobs({
        pageOffset: (this.jobCurrentPage - 1) * this.jobPageSize,
        pageSize: this.jobPageSize
      })
    },
    onCurrentDataPageChange(page) {
      this.dataCurrentPage = page
      this.fetchAysData({
        pageOffset: (this.dataCurrentPage - 1) * this.dataPageSize,
        pageSize: this.dataPageSize
      })
    },
    onPrevDataPage() {
      this.dataCurrentPage = this.dataCurrentPage - 1
      this.fetchAysData({
        pageOffset: (this.dataCurrentPage - 1) * this.dataPageSize,
        pageSize: this.dataPageSize
      })
    },
    onNextDataPage() {
      this.dataCurrentPage = this.dataCurrentPage + 1
      this.fetchAysData({
        pageOffset: (this.dataCurrentPage - 1) * this.dataPageSize,
        pageSize: this.dataPageSize
      })
    },
    onShowAysJobResult(row) {
      var jobId = row.jobId
      this.$router.push({
        path: '/job/ays/result',
        query: {
          jobId: jobId,
          receiverId: row.receiverId,
          agencyId: row.agencyId,
          agencyName: row.agencyName,
          datasetTitle: row.datasetTitle,
          createTime: row.createTime,
          datasetFields: row.datasetFields,
          jobCreator: row.jobCreator,
          searchField: row.searchField
        }
      })
    },
    fetchResourceSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.uniqueArr(this.jobResourceName))
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    },
    fetchSearchIdSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.receivedResultAgencyName)
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    },
    fetchSearchTimeSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.createTime)
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
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
