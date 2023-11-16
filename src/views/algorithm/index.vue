<template>
  <div>
    <el-card>
      <el-row>
        <controller-form
          ref="controller-from"
          :controller="controllerData"
          @search-click="onSearch"
          @create-click="onUpload"
        >
          <template slot="keyFilter">
            <el-form :inline="true" class="demo-form-inline" size="medium">
              <el-form-item
                v-if="!onlyOwnerAgency"
                :label="$t('algorithm.ownerAgencyName')"
              >
                <el-autocomplete
                  v-model="controllerData.keyFilterData.ownerAgencyName"
                  :fetch-suggestions="queryAgencyNameSearch"
                  :placeholder="$t('algorithm.ownerAgencyNamePlaceHolder')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onSearch"
                />
              </el-form-item>
              <el-form-item :label="$t('algorithm.algorithmTitle')">
                <el-autocomplete
                  v-model="controllerData.keyFilterData.algorithmTitle"
                  :fetch-suggestions="queryNameSearch"
                  :placeholder="$t('algorithm.algorithmTitlePlaceHolder')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onSearch"
                />
              </el-form-item>
            </el-form>
          </template>
        </controller-form>
      </el-row>
      <el-row>
        <el-tabs v-model="tabActiveName" type="card" @tab-click="onTabChange">
          <el-tab-pane name="current" :label="$t('algorithm.ownerAgency')">
            <el-table
              ref="algorithmTable"
              v-loading="algorithmListLoading"
              :data="algorithms"
              fit
              stripe
              style="width: 100%"
              tooltip-effect="light"
            >
              <el-table-column
                show-overflow-tooltip
                prop="algorithmId"
                :label="$t('algorithm.algorithmId')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="algorithmTitle"
                :label="$t('algorithm.algorithmTitle')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="algorithmVersion"
                :label="$t('algorithm.algorithmVersion')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerUserName"
                :label="$t('common.ownerUserName')"
              />
              <el-table-column
                prop="algorithmType"
                :label="$t('algorithm.algorithmType')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.algorithmType }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="algorithmDescription"
                :label="$t('algorithm.algorithmDescription')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="inputCount"
                :label="$t('algorithm.inputCount')"
              />
              <el-table-column
                show-overflow-tooltip
                :label="$t('algorithm.createTime')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                width="80px"
                align="center"
                :label="$t('dataset.jobs')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-s-help"
                    @click.stop="onShowAlgorithmJob(scope.row)"
                  />
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                width="100px"
                align="center"
                :label="$t('algorithm.detail')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-info"
                    @click.stop="showAlgorithmDetailsByColumn(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="all" :label="$t('algorithm.allAgency')">
            <el-table
              ref="algorithmTable"
              v-loading="algorithmListLoading"
              :data="algorithms"
              fit
              stripe
              style="width: 100%"
              tooltip-effect="light"
            >
              <el-table-column
                show-overflow-tooltip
                prop="ownerAgencyId"
                :label="$t('algorithm.ownerAgencyId')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerAgencyName"
                :label="$t('algorithm.ownerAgencyName')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="algorithmId"
                :label="$t('algorithm.algorithmId')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="algorithmTitle"
                :label="$t('algorithm.algorithmTitle')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="algorithmVersion"
                :label="$t('algorithm.algorithmVersion')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerUserName"
                :label="$t('common.ownerUserName')"
              />
              <el-table-column
                prop="algorithmType"
                :label="$t('algorithm.algorithmType')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.algorithmType }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="algorithmDescription"
                :label="$t('algorithm.algorithmDescription')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="inputCount"
                :label="$t('algorithm.inputCount')"
              />
              <el-table-column
                show-overflow-tooltip
                :label="$t('algorithm.createTime')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                width="100px"
                align="center"
                :label="$t('algorithm.detail')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-info"
                    @click.stop="showAlgorithmDetailsByColumn(scope.row)"
                  />
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
          :current-page="currentPage"
          :page-size="pageSize"
          :total="paginationTotal"
          @current-change="onCurrentPageChange"
          @prev-click="onPrevPage"
          @next-click="onNextPage"
        />
      </el-row>
    </el-card>
    <el-dialog
      :title="$t('algorithm.algorithmCreation')"
      center
      width="700px"
      :close-on-click-modal="false"
      :visible.sync="uploadDialog.show"
    >
      <algorithm-upload v-if="uploadDialog.show" ref="uploadDialogObj" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="uploadLoading" @click="onUploadConfirm">{{
          $t("common.confirm")
        }}</el-button>
        <el-button @click="uploadDialog.show = false">{{
          $t("common.cancel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { getUsername, getAgencyId } from '@/utils/auth'
import ControllerForm from '@/components/Controller'
import { listAlgorithms } from '@/api/algorithm'
import AlgorithmUpload from '@/views/algorithm/upload'
import { getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS, check_permission, PermissionGroup, AlgoGroup } from '@/utils/permission'

export default {
  name: 'AlgorithmManager',
  components: {
    ControllerForm,
    AlgorithmUpload
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
      loginAgencyId: 0,
      onlyOwnerAgency: true,
      tabActiveName: 'current',
      ownerAgencyNameSet: [],
      algorithmTitleSet: [],
      controllerData: {
        disableWrite: true,
        searchButtonName: this.$t('algorithm.algorithmSearching'),
        createButtonName: this.$t('algorithm.algorithmCreation'),
        startDate: 0,
        endDate: 0,
        keyFilterData: {
          ownerAgencyName: null,
          algorithmTitle: null
        }
      },
      pageSize: 10,
      currentPage: 1,
      paginationTotal: 0,
      algorithms: [
        {
          ownerAgencyId: null,
          ownerAgencyName: null,
          algorithmId: null,
          algorithmTitle: null,
          algorithmDescription: null,
          ownerUserName: null,
          createTime: null
        }
      ],
      algorithmListLoading: false,
      uploadDialog: {
        show: false
      },
      uploadLoading: false
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
      this.loginAgencyId = getAgencyId()
      if (this.$route.query.tabActiveName) {
        this.tabActiveName = this.$route.query.tabActiveName
        this.onlyOwnerAgency = false
        this.refreshAlgorithmList()
      } else {
        this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }
    }
  },
  mounted() { },
  methods: {
    hasPermission() {
      if (check_permission(getPermissions(), PermissionGroup.ALGO_GROUP, AlgoGroup.WRITE_ALGO)) {
        this.controllerData.disableWrite = false
      }
      return check_permission(getPermissions(), PermissionGroup.ALGO_GROUP, AlgoGroup.LIST_ALGO)
    },
    onSearch() {
      var params = {}

      params.pageOffset = 0
      params.pageSize = this.pageSize

      this.fetchAlgorithmList(params)
    },
    onUpload() {
      this.uploadDialog.show = true
    },
    onUploadConfirm() {
      this.uploadLoading = true
      this.$refs.uploadDialogObj.onSubmit(() => {
        this.uploadLoading = false
        this.uploadDialog.show = false
        this.currentPage = 1
        this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }, () => {
        this.uploadLoading = false
      })
    },
    isOwner(owner, agencyId) {
      return agencyId === getAgencyId() &&
        (owner === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS))
    },
    refreshAlgorithmList() {
      this.currentPage = 1
      this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onTabChange(tab, event) {
      this.onlyOwnerAgency = (tab.name === 'current')
      this.$refs['controller-from'].onClear()
      this.refreshAlgorithmList()
    },
    onDetailClose() {
      this.loginAgencyId = getAgencyId()
      this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    fetchAlgorithmList(params) {
      this.algorithms = []
      this.algorithmListLoading = true

      if (this.onlyOwnerAgency) {
        params.ownerAgencyId = this.loginAgencyId
      } else if (this.controllerData.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.controllerData.keyFilterData.ownerAgencyName
      }

      if (this.controllerData.keyFilterData.algorithmTitle) {
        params.algorithmTitle = this.controllerData.keyFilterData.algorithmTitle
      }
      if (this.controllerData.startDate !== 0) {
        params.dateRangeStart = this.controllerData.startDate
      }
      if (this.controllerData.endDate !== 0) {
        params.dateRangeEnd = this.controllerData.endDate
      }

      if (typeof (this.$route.query.algorithmId) !== 'undefined') {
        params.algorithmId = this.$route.query.algorithmId
        params.ownerAgencyId = null
      }
      listAlgorithms(params).then(response => {
        this.algorithmListLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        this.algorithms = response.data.content

        for (var i = 0; i < this.algorithms.length; i++) {
          uniqueAppend(this.ownerAgencyNameSet, this.algorithms[i].ownerAgencyName)
          uniqueAppend(this.algorithmTitleSet, this.algorithms[i].algorithmTitle)
        }

        this.paginationTotal = response.data.total
        this.currentPage = (params.pageOffset / params.pageSize) + 1
      }).catch(_ => {
        this.algorithmListLoading = false
      })
    },
    onShowAlgorithmJob(row) {
      var algorithmId = row.algorithmId
      this.$router.push({
        path: 'job',
        query: {
          algorithmId: algorithmId
        }
      })
    },
    showAlgorithmDetailsByColumn(row) {
      const { algorithmId, algorithmVersion } = row
      this.$router.push({ path: '/algorithm/detail', query: { algorithmId, algorithmVersion }})
    },
    onCurrentPageChange(page) {
      this.currentPage = page
      this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevPage() {
      this.currentPage = this.currentPage - 1
      this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextPage() {
      this.currentPage = this.currentPage + 1
      this.fetchAlgorithmList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    // suggestions for user inputs
    queryAgencyNameSearch(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.ownerAgencyNameSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // callback to show suggested words
      cb(results)
    },
    queryNameSearch(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.algorithmTitleSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
