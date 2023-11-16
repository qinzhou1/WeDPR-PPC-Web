<template>
  <div>
    <el-card v-loading="originAlgorithmLoading" shadow="never">
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          {{ $t("algorithm.originAlgorithm") }}
        </span>
      </div>
      <el-table
        :key="Math.random()"
        :data="originAlgorithms"
        fit
        stripe
        tooltip-effect="light"
      >
        <el-table-column
          show-overflow-tooltip
          prop="ownerAgencyId"
          :label="$t('algorithm.ownerAgencyId')"
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
          prop="algorithmType"
          width="145px"
          :label="$t('algorithm.algorithmType')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.algorithmType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="inputCount"
          :label="$t('algorithm.inputCount')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="algorithmDescription"
          :label="$t('algorithm.algorithmDescription')"
        />
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
        <el-table-column align="center" :label="$t('common.choose')">
          <template slot-scope="scope">
            <el-switch
              :value="isAlgoSelected(scope.row.algorithmId)"
              @change="onSwithAlgo($event, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top: 10px">
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          {{ $t("algorithm.userAlgorithm") }}
        </span>
      </div>
      <el-row :gutter="20">
        <el-col :span="16">
          <controller-form
            ref="algo-controller-from"
            :controller="algoControllerData"
            @search-click="onAlgoSearch"
          >
            <template slot="keyFilter">
              <el-form :inline="true" class="demo-form-inline" size="medium">
                <el-form-item :label="$t('agency.agencyName')">
                  <el-autocomplete
                    v-model="algoControllerData.keyFilterData.ownerAgencyName"
                    :placeholder="$t('job.filter.ownerAgencyNameTip')"
                    :trigger-on-focus="false"
                    @keyup.enter.native="onAlgoSearch"
                  />
                </el-form-item>
                <el-form-item :label="$t('algorithm.algorithmTitle')">
                  <el-autocomplete
                    v-model="algoControllerData.keyFilterData.algorithmTitle"
                    :placeholder="$t('job.filter.ownerAlgoTitleTip')"
                    :fetch-suggestions="fetchAlgoTitleSuggestions"
                    :trigger-on-focus="false"
                    @keyup.enter.native="onAlgoSearch"
                  />
                </el-form-item>
              </el-form>
            </template>
          </controller-form>
        </el-col>
      </el-row>
      <el-table
        :key="Math.random()"
        :data="algorithms"
        fit
        stripe
        tooltip-effect="light"
      >
        <el-table-column
          show-overflow-tooltip
          prop="ownerAgencyId"
          :label="$t('algorithm.ownerAgencyId')"
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
          prop="algorithmType"
          width="145px"
          :label="$t('algorithm.algorithmType')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.algorithmType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="inputCount"
          :label="$t('algorithm.inputCount')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="algorithmDescription"
          :label="$t('algorithm.algorithmDescription')"
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
        <el-table-column align="center" :label="$t('common.choose')">
          <template slot-scope="scope">
            <el-switch
              :value="isAlgoSelected(scope.row.algorithmId)"
              @change="onSwithAlgo($event, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="algorithmsPagination.currentPage"
        :page-size="pageSize"
        :total="algorithmsPagination.paginationTotal"
        style="margin-top: 10px; text-align: center; height: 20px; width: 100%"
        @current-change="onCurrentAlgorithmsPageChange"
        @prev-click="onPrevAlgorithmsPage"
        @next-click="onNextAlgorithmsPage"
      />
    </el-card>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { getAgencyId, getPermissions } from '@/utils/auth'
import { check_permission, PermissionGroup, DataGroup } from '@/utils/permission'
import { listAlgorithms, listOriginAlgorithms } from '@/api/algorithm'
import ControllerForm from '@/components/Controller'

export default {
  name: 'SelectAuthAlgo',
  components: {
    ControllerForm
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, null)
    }
  },
  props: {
    agencyid: {
      type: String,
      default: () => { return 'aaa' }
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      that: this,
      selectedAlgoList: [],
      originAlgorithmLoading: false,
      algorithmLoading: false,
      originAlgorithms: null,
      algorithms: null,
      selfAgencyId: null,
      pageSize: 5,
      currentPage: 1,
      paginationTotal: 0,
      algoControllerData: {
        isNeedDataPicker: false,
        disableWrite: false,
        searchButtonName: this.$t('agency.searchButtonName'),
        keyFilterData: {
          agencyName: null,
          algorithmTitle: null
        }
      },
      algorithmTitleSet: [],
      algorithmsPagination: {
        currentPage: 1,
        paginationTotal: 0
      }
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

    fetchInfo() {
      this.selectedAlgoList = []
      this.originAlgorithms = []
      this.algorithms = []

      var params = {}
      params.pageOffset = 0
      params.pageSize = this.pageSize
      this.fetchOriginAlgorithms()
      this.fetchAlgorithms(params)
    },

    fetchOriginAlgorithms() {
      this.originAlgorithmLoading = true
      listOriginAlgorithms().then(response => {
        this.originAlgorithmLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.originAlgorithms = response.data.content
      }).catch(_ => {
        this.originAlgorithmLoading = false
      })
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
    onAlgoSearch() {
      this.algorithmsPagination.currentPage = 1

      var params = {}
      params.pageOffset = (this.algorithmsPagination.currentPage - 1) * this.pageSize
      params.pageSize = this.pageSize

      this.fetchAlgorithms(params)
    },
    fetchAlgorithms(params) {
      this.algorithms = []
      this.algorithmLoading = true

      if (this.algoControllerData.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.algoControllerData.keyFilterData.ownerAgencyName
      }
      if (this.algoControllerData.keyFilterData.algorithmTitle) {
        params.algorithmTitle = this.algoControllerData.keyFilterData.algorithmTitle
      }

      listAlgorithms(params).then(response => {
        this.algorithmLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        for (var i = 0; i < response.data.content.length; i++) {
          uniqueAppend(this.algorithmTitleSet, response.data.content[i].algorithmTitle)
        }
        this.algorithms = response.data.content
        this.algorithmsPagination.paginationTotal = response.data.total
        this.algorithmsPagination.currentPage = params.pageOffset / params.pageSize + 1
      }).catch(_ => {
        this.algorithmLoading = false
      })
    },
    onCurrentAlgorithmsPageChange(page) {
      this.algorithmsPagination.currentPage = page
      this.fetchAlgorithms({ pageOffset: (this.algorithmsPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevAlgorithmsPage() {
      this.algorithmsPagination.currentPage = this.algorithmsPagination.currentPage - 1
      this.fetchAlgorithms({ pageOffset: (this.algorithmsPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextAlgorithmsPage() {
      this.algorithmsPagination.currentPage = this.algorithmsPagination.currentPage + 1
      this.fetchAlgorithms({ pageOffset: (this.algorithmsPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },

    isAlgoSelected(id) {
      for (var i = 0; i < this.selectedAlgoList.length; i++) {
        if (id === this.selectedAlgoList[i].algorithmId) {
          return true
        }
      }
      return false
    },

    onSwithAlgo($event, data) {
      if ($event) { // select
        if (typeof (data.authorizationDate) === 'undefined') {
          this.$alert(this.$t('dataset.authExpiredTime'), {
            confirmButtonText: this.$t('common.confirm'),
            type: 'warning'
          })
          return
        }
        this.selectedAlgoList.push({ algorithmId: data.algorithmId, authorizationDate: data.authorizationDate.getTime(), authorizedAgencyId: this.agencyid })
      } else { // cancel
        var tempArry = this.selectedAlgoList.filter(item => { return item.algorithmId !== data.algorithmId })
        this.selectedAlgoList = tempArry
      }
    },

    returnSelectedAlgo() {
      this.$emit('return-selected-algo', this.selectedAlgoList)
    },

    onFinish() {
      this.fetchInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
