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
            <el-form :inline="true" size="medium" class="demo-form-inline">
              <el-form-item
                v-if="!onlyOwnerAgency"
                :label="$t('dataset.ownerAgencyName')"
              >
                <el-autocomplete
                  v-model="controllerData.keyFilterData.ownerAgencyName"
                  :fetch-suggestions="queryAgencyNameSearch"
                  :placeholder="$t('dataset.ownerAgencyNamePlaceHolder')"
                  :trigger-on-focus="false"
                  @keyup.enter.native="onSearch"
                />
              </el-form-item>
              <el-form-item :label="$t('dataset.datasetTitle')">
                <el-autocomplete
                  v-model="controllerData.keyFilterData.datasetTitle"
                  :fetch-suggestions="queryNameSearch"
                  :placeholder="$t('dataset.datasetTitlePlaceHolder')"
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
          <el-tab-pane name="current" :label="$t('dataset.ownerAgency')">
            <el-table
              ref="dataTable"
              v-loading="dataListLoading"
              :data="dataList"
              fit
              stripe
              style="width: 100%"
              tooltip-effect="light"
            >
              <el-table-column
                show-overflow-tooltip
                prop="datasetId"
                :label="$t('dataset.datasetId')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="datasetTitle"
                :label="$t('dataset.datasetTitle')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="datasetDescription"
                :label="$t('dataset.datasetDescription')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerUserName"
                :label="$t('common.ownerUserName')"
              />
              <el-table-column
                show-overflow-tooltip
                :label="$t('dataset.createTime')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('dataset.operation')">
                <template slot-scope="scope">
                  <el-badge
                    v-if="
                      isOwner(scope.row.ownerUserName, scope.row.ownerAgencyId)
                    "
                    :value="scope.row.datasetAuthorityRequest.length"
                    :max="9"
                    :hidden="scope.row.datasetAuthorityRequest.length == 0"
                    class="item"
                  >
                    <el-button
                      v-if="
                        isOwner(
                          scope.row.ownerUserName,
                          scope.row.ownerAgencyId
                        )
                      "
                      type="primary"
                      size="mini"
                      @click.stop="showDatasetAuthByColumn(scope.row)"
                    >
                      {{ $t("dataset.auth") }}
                    </el-button>
                  </el-badge>
                  <el-button
                    v-else
                    class="item"
                    disabled
                    type="primary"
                    size="mini"
                    @click.stop
                  >
                    {{ $t("dataset.auth") }}
                  </el-button>
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                :label="$t('dataset.jobs')"
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
                :label="$t('dataset.details')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-info"
                    @click.stop="showDatasetDetailsByColumn(scope.row)"
                  />
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane name="all" :label="$t('dataset.allAgency')">
            <el-table
              ref="dataTable"
              v-loading="dataListLoading"
              :data="dataList"
              fit
              stripe
              style="width: 100%"
              tooltip-effect="light"
            >
              <el-table-column
                show-overflow-tooltip
                prop="datasetId"
                :label="$t('dataset.datasetId')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="datasetTitle"
                :label="$t('dataset.datasetTitle')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="datasetDescription"
                :label="$t('dataset.datasetDescription')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerUserName"
                :label="$t('common.ownerUserName')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerAgencyName"
                :label="$t('dataset.ownerAgencyName')"
              />
              <el-table-column
                show-overflow-tooltip
                prop="ownerAgencyId"
                :label="$t('dataset.ownerAgencyId')"
              />
              <el-table-column
                show-overflow-tooltip
                :label="$t('dataset.createTime')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDate }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('dataset.operation')">
                <template slot-scope="scope">
                  <el-button
                    class="item"
                    :disabled="loginAgencyId === scope.row.ownerAgencyId"
                    type="primary"
                    size="mini"
                    @click.stop="showRequestAuthByColumn(scope.row)"
                  >
                    {{ $t("index.requestAuth") }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                :label="$t('dataset.details')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="medium"
                    style="font-size: 18px"
                    class="el-icon-info"
                    @click.stop="showDatasetDetailsByColumn(scope.row)"
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
      :title="$t('dataset.uploadDialog')"
      center
      width="700px"
      :close-on-click-modal="false"
      :visible.sync="uploadDialog.show"
    >
      <DatasetUpload v-if="uploadDialog.show" ref="uploadDialogObj" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="uploadLoading" @click="onUploadConfirm">
          {{ $t("common.confirm") }}
        </el-button>
        <el-button @click="uploadDialog.show = false">
          {{ $t("common.cancel") }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { getUsername, getAgencyId } from '@/utils/auth'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { listDataset } from '@/api/dataset'
import ControllerForm from '@/components/Controller'
import DatasetUpload from '@/views/dataset/upload'
import { getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS, check_permission, PermissionGroup, DataGroup } from '@/utils/permission'

export default {
  name: 'DatasetManager',
  components: {
    ControllerForm,
    DatasetUpload
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d}')
    },
    dataOperationTagFilter(status) {
      if (typeof status === 'undefined' || status === null) {
        return 'info'
      } else if (status === 'delete') {
        return 'danger'
      }
    }
  },
  props: {},
  data() {
    return {
      userName: '',
      loginAgencyId: null,
      onlyOwnerAgency: true,
      tabActiveName: 'current',
      ownerAgencyNameSet: [],
      datasetTitleSet: [],
      controllerData: {
        disableWrite: true,
        searchButtonName: this.$t('dataset.datasetSearching'),
        createButtonName: this.$t('dataset.uploadDialog'),
        startDate: 0,
        endDate: 0,
        keyFilterData: {
          ownerAgencyName: null,
          datasetTitle: null
        }
      },
      pageSize: 10,
      currentPage: 1,
      paginationTotal: 0,
      dataList: [
        {
          ownerAgencyId: null,
          ownerAgencyName: null,
          datasetId: null,
          datasetTitle: null,
          ownerUserName: null,
          createTime: null,
          authRequestCount: null,
          operation: null
        }
      ],
      dataListLoading: false,
      uploadDialog: {
        show: false
      },
      authDialog: {
        currentDatasetId: 0,
        show: false,
        width: '80%'
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
      this.userName = getUsername()
      this.loginAgencyId = getAgencyId()
      if (this.$route.query.tabActiveName) {
        this.tabActiveName = this.$route.query.tabActiveName
        this.onlyOwnerAgency = false
        this.refreshDataList()
      } else {
        this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }
    }
  },
  mounted() { },
  methods: {
    hasPermission() {
      if (check_permission(getPermissions(), PermissionGroup.DATA_GROUP, DataGroup.WRITE_DATA)) {
        this.controllerData.disableWrite = false
      }
      return check_permission(getPermissions(), PermissionGroup.DATA_GROUP, DataGroup.LIST_DATA)
    },
    onSearch() {
      var params = {}
      params.pageOffset = 0
      params.pageSize = this.pageSize

      this.fetchDataList(params)
    },
    onUpload() {
      this.uploadDialog.show = true
      this.uploadLoading = false
    },
    onUploadConfirm() {
      this.uploadLoading = true
      this.$refs.uploadDialogObj.onSubmit(() => {
        this.uploadLoading = false
        this.uploadDialog.show = false
        this.currentPage = 1
        this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }, () => {
        this.uploadLoading = false
      })
    },
    refreshDataList() {
      this.currentPage = 1
      this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    isOwner(owner, agencyId) {
      return agencyId === getAgencyId() &&
        (owner === getUsername() || getPermissions().includes(ADMIN_PERMISSIONS))
    },
    onTabChange(tab, event) {
      this.onlyOwnerAgency = (tab.name === 'current')
      this.$refs['controller-from'].onClear()
      this.refreshDataList()
    },
    onDetailClose() {
      this.userName = getUsername()
      this.loginAgencyId = getAgencyId()
      this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onShowDatasetJob(row) {
      var datasetId = row.datasetId
      this.$router.push({
        path: 'job',
        query: {
          datasetId: datasetId
        }
      })
    },
    fetchDataList(params) {
      this.dataList = []

      this.dataListLoading = true

      if (this.onlyOwnerAgency) {
        params.ownerAgencyId = this.loginAgencyId
      } else if (this.controllerData.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.controllerData.keyFilterData.ownerAgencyName
      }

      if (this.controllerData.keyFilterData.datasetTitle) {
        params.datasetTitle = this.controllerData.keyFilterData.datasetTitle
      }
      if (this.controllerData.startDate !== 0) {
        params.dateRangeStart = this.controllerData.startDate
      }
      if (this.controllerData.endDate !== 0) {
        params.dateRangeEnd = this.controllerData.endDate
      }
      if (typeof (this.$route.query.datasetId) !== 'undefined') {
        params.datasetId = this.$route.query.datasetId
        params.ownerAgencyId = null
      }

      listDataset(params).then(response => {
        this.dataListLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        this.dataList = response.data.content

        for (var i = 0; i < this.dataList.length; i++) {
          uniqueAppend(this.ownerAgencyNameSet, this.dataList[i].ownerAgencyName)
          uniqueAppend(this.datasetTitleSet, this.dataList[i].datasetTitle)
        }

        this.paginationTotal = response.data.total
        this.currentPage = (params.pageOffset / params.pageSize) + 1
      }).catch(_ => {
        this.dataListLoading = false
      })
    },
    showDatasetDetailsByColumn(row) {
      const { datasetId } = row
      this.$router.push({ path: '/dataset/detail', query: { datasetId }})
    },
    showDatasetAuthByColumn(row) {
      var datasetId = row.datasetId

      this.$router.push({
        path: 'auth',
        query: {
          datasetId: datasetId
        }
      })
    },
    showRequestAuthByColumn(row) {
      this.$router.push({
        path: 'requestAuth',
        query: {
          datasetId: row.datasetId
        }
      })
    },
    onCurrentPageChange(page) {
      this.currentPage = page
      this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevPage() {
      this.currentPage = this.currentPage - 1
      this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextPage() {
      this.currentPage = this.currentPage + 1
      this.fetchDataList({ pageOffset: (this.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    // suggestions for user inputs
    queryAgencyNameSearch(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.ownerAgencyNameSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // callback to show suggested words
      cb(results)
    },
    queryNameSearch(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.datasetTitleSet)
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
.item {
  margin-top: 10px;
  margin-right: 40px;
}

.delete-btn {
  margin-top: 10px;
  margin-right: 40px;
  float: right;
}
</style>
