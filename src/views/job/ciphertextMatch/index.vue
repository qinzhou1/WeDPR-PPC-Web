<template>
  <div class="container">
    <controller-form
      ref="controller-from"
      :controller="controllerData"
      @search-click="onDataSearch"
      @create-click="createMatch"
    >
      <template slot="keyFilter">
        <el-form inline class="demo-form-inline" size="medium">
          <!-- 数据方  请输入数据方-->
          <el-form-item v-if="activeName === 'myQuery'" :label="$t('job.index.dataProviderAgency')">
            <el-input
              v-model="controllerData.keyFilterData.dataProviderAgencyName"
              :placeholder="$t('job.index.dataProviderAgencyInput')"
              @keyup.enter.native="onDataSearch"
            />
          </el-form-item>
          <el-form-item v-if="activeName === 'queryMe'" :label="$t('job.index.initiatorAgency')">
            <el-input
              v-model="controllerData.keyFilterData.initiatorAgencyName"
              :placeholder="$t('job.index.initiatorAgencyInput')"
              @keyup.enter.native="onDataSearch"
            />
          </el-form-item>
          <el-form-item :label="$t('job.index.searchRuls')">
            <el-input
              v-model="controllerData.keyFilterData.algorithmTitle"
              :placeholder="$t('job.index.searchRulsInput')"
              @keyup.enter.native="onDataSearch"
            />
          </el-form-item>
        </el-form>
      </template>
    </controller-form>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="$t('job.index.mySearch')" name="myQuery">
        <el-table
          ref="jobTable"
          v-loading="jobsLoading"
          tooltip-effect="light"
          :data="tableData"
          fit
          stripe
          style="width: 100%"
        >
          <el-table-column show-overflow-tooltip prop="jobId" :label="$t('dataset.jobId')" />
          <el-table-column
            show-overflow-tooltip
            prop="jobTitle"
            :label="$t('dataset.jobTitle')"
          />
          <el-table-column show-overflow-tooltip :label="$t('job.index.requireData')">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showMatchFields(scope.row.matchFields)"
              >{{ $t('job.index.fields') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="jobDatasetProviderAgencyName"
            :label="$t('job.index.dataProviderAgency')"
          />
          <el-table-column show-overflow-tooltip :label="$t('job.index.searchRuls')">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="goAlgorithmDetail(scope.row)"
              >{{ scope.row.jobAlgorithmTitle }}</el-button>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="" :label="$t('job.index.datasetUsed')">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showDataset(scope.row.jobDatasetList)"
              >{{ $t('job.index.detail') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            :label="$t('ays.index.createTime')"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('job.jobStatus')">
            <template slot-scope="scope">
              <el-tag
                effect="light"
                align="center"
                :type="scope.row.jobStatus | jobStatusTagFilter()"
              >{{ scope.row.jobStatus | jobStatusTextFilter(that) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            fixed="right"
            :label="$t('job.index.detail')"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="medium"
                style="font-size: 18px"
                class="el-icon-info"
                @click.stop="showJobDetailByColumn(scope.row.jobId)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            fixed="right"
            :label="$t('job.index.result')"
          >
            <template slot-scope="scope">
              <el-button
                v-if="ableShowResult(scope.row)"
                type="text"
                size="medium"
                style="font-size: 18px"
                class="el-icon-chat-dot-round"
                @click.stop="
                  showJobResultByColumn(
                    scope.row.jobId,
                    scope.row.jobAlgorithmType
                  )
                "
              />
              <el-button
                v-else
                disabled
                type="text"
                style="font-size: 18px"
                size="medium"
                class="el-icon-chat-dot-round"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('ays.index.mySearched')" name="queryMe">
        <el-table
          ref="jobTableQueryMe"
          v-loading="jobsLoading"
          tooltip-effect="light"
          :data="tableData"
          fit
          stripe
          style="width: 100%"
        >
          <el-table-column show-overflow-tooltip prop="jobId" :label="$t('dataset.jobId')" />
          <el-table-column
            show-overflow-tooltip
            prop="jobTitle"
            :label="$t('dataset.jobTitle')"
          />
          <el-table-column show-overflow-tooltip label="查询规则">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="goAlgorithmDetail(scope.row)"
              >{{ scope.row.jobAlgorithmTitle }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="initiatedAgencyName"
            label="请求方"
          />
          <el-table-column
            show-overflow-tooltip
            prop="createTime"
            label="查询时间"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('job.jobStatus')">
            <template slot-scope="scope">
              <el-tag
                effect="light"
                align="center"
                :type="scope.row.jobStatus | jobStatusTagFilter()"
              >{{ scope.row.jobStatus | jobStatusTextFilter(that) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            fixed="right"
            :label="$t('job.index.detail')"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="medium"
                style="font-size: 18px"
                class="el-icon-info"
                @click.stop="showJobDetailByColumn(scope.row.jobId)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="70px"
            fixed="right"
            :label="$t('job.index.result')"
          >
            <template slot-scope="scope">
              <el-button
                v-if="ableShowResult(scope.row)"
                type="text"
                size="medium"
                style="font-size: 18px"
                class="el-icon-chat-dot-round"
                @click.stop="
                  showJobResultByColumn(
                    scope.row.jobId,
                    scope.row.jobAlgorithmType
                  )
                "
              />
              <el-button
                v-else
                disabled
                type="text"
                style="font-size: 18px"
                size="medium"
                class="el-icon-chat-dot-round"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <we-pagination
      layout="prev, pager, next"
      :total="total"
      :page_offset="matchPageData.page_offset"
      :page_size="matchPageData.page_size"
      @paginationChange="matchPageDataPaginationHandle"
    />
    <el-dialog
      width="480px"
      :title="$t('job.index.requireFields')"
      :visible.sync="matchFieldsTableVisible"
    >
      <el-table :data="matchFieldsTableData">
        <el-table-column property="fieldName" :label="$t('job.index.matchFields')" width="220" />
        <el-table-column property="plainValue" :label="$t('job.index.matchFieldsValue')" width="220" />
      </el-table>
    </el-dialog>
    <el-dialog
      width="480px"
      :title="$t('job.index.requireDataset')"
      :visible.sync="datasetTableVisible"
    >
      <el-table :data="datasetTableData">
        <el-table-column property="datasetTitle" :label="$t('job.index.datasetName')" width="220">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="goDatasetDetail(scope.row.datasetId)"
            >{{ scope.row.datasetTitle }}</el-button>
          </template>
        </el-table-column>
        <el-table-column property="datasetId" :label="$t('job.jobDetail.datasetId')" width="220" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import ControllerForm from '@/components/Controller'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { getMatchList } from '@/api/job'
import wePagination from '@/components/Pagination/wePagination.vue'
import { getUsername, getPermissions } from '@/utils/auth'
import { ADMIN_PERMISSIONS } from '@/utils/permission'
export default {
  name: 'CiphertextMatch',
  components: {
    ControllerForm,
    wePagination
  },
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d} {h}:{i}:{s}')
    },
    jobStatusTagFilter(status) {
      if (typeof status === 'undefined' || status === null) {
        return 'info' // UNKNOWN
      } else if (status === 'WAITING') {
        return 'info' // NOT_STARTED
      } else if (status === 'RUNNING') {
        return '' // RUNNING
      } else if (status === 'SUCCEED') {
        return 'success' // SUCCESS
      } else if (status === 'FAILED') {
        return 'danger' // FAILURE
      } else {
        return 'info'
      }
    },
    jobStatusTextFilter(status, that) {
      if (typeof status === 'undefined' || status === null) {
        return that.$t('status.abnormal')
      } else if (status === 'WAITING') {
        return that.$t('status.waiting')
      } else if (status === 'RUNNING') {
        return that.$t('status.running')
      } else if (status === 'SUCCEED') {
        return that.$t('status.success')
      } else if (status === 'FAILED') {
        return that.$t('status.failure')
      } else {
        return that.$t('status.abnormal')
      }
    }
  },
  props: {},
  data() {
    return {
      that: this,
      activeName: 'myQuery',
      jobsLoading: false,
      controllerData: {
        disableWrite: false,
        searchButtonName: this.$t('job.index.searchButtonName'),
        createButtonName: this.$t('job.index.startMatch'),
        keyFilterData: {
          algorithmTitle: '',
          dataProviderAgencyName: '',
          initiatorAgencyName: ''
        }
      },
      tableData: [],
      total: 0,
      matchFieldsTableVisible: false,
      matchFieldsTableData: [],
      datasetTableVisible: false,
      datasetTableData: [],
      matchPageData: {
        page_offset: 1,
        page_size: 10
      }
    }
  },
  created() {
    this.getMatchJobList({})
  },
  mounted() {},
  methods: {
    // 切换tab
    handleClick(selected) {
      this.activeName = selected.name
      this.matchPageData = {
        page_offset: 1,
        page_size: 10
      }
      this.controllerData.keyFilterData = {
        algorithmTitle: '',
        dataProviderAgencyName: '',
        initiatorAgencyName: ''
      }
      this.getMatchJobList()
    },
    // 切换分页
    matchPageDataPaginationHandle(pageData) {
      this.matchPageData = { ...pageData }
      this.getMatchJobList()
    },
    // 点击查询
    onDataSearch() {
      this.matchPageData = {
        page_offset: 1,
        page_size: 10
      }
      this.getMatchJobList()
    },
    ableShowResult(row) {
      if (
        row.jobCreator === getUsername() ||
        getPermissions().includes(ADMIN_PERMISSIONS)
      ) {
        return row.jobStatus === 'SUCCEED'
      }
      return false
    },
    // 展示匹配字段
    showMatchFields(data) {
      this.matchFieldsTableVisible = true
      this.matchFieldsTableData = data
    },
    // 展示所用数据集
    showDataset(data) {
      this.datasetTableVisible = true
      this.datasetTableData = data
    },
    // 跳转数据集详情
    goDatasetDetail(datasetId) {
      this.$router.push({
        path: '/dataset/detail',
        query: {
          datasetId
        }
      })
    },
    // 跳转算法详情
    goAlgorithmDetail(data) {
      const { jobAlgorithmId, jobAlgorithmVersion } = data
      this.$router.push({
        path: '/algorithm/detail',
        query: {
          algorithmId: jobAlgorithmId,
          algorithmVersion: jobAlgorithmVersion
        }
      })
    },
    showJobDetailByColumn(jobId) {
      this.$router.push({ path: 'ciphertextMatchDetail', query: { jobId }})
    },
    showJobResultByColumn(jobId, jobAlgorithmType) {
      this.$router.push({
        path: 'matchResult',
        query: { jobId, jobAlgorithmType }
      })
    },
    handleParamsValid(params) {
      const validParams = {}
      Object.keys(params).forEach((key) => {
        if (
          !(
            params[key] === undefined ||
            params[key] === null ||
            params[key] === ''
          )
        ) {
          validParams[key] = params[key]
        }
      })
      return validParams
    },
    // 获取匹配任务列表
    async getMatchJobList() {
      const { page_offset, page_size } = this.matchPageData
      console.log(
        this.controllerData.keyFilterData,
        'this.controllerData.keyFilterData'
      )
      const { algorithmTitle, dataProviderAgencyName, initiatorAgencyName } =
        this.controllerData.keyFilterData
      let params = this.handleParamsValid({
        algorithmTitle,
        dataProviderAgencyName,
        initiatorAgencyName
      })
      const hasMyQuery = this.activeName === 'myQuery'
      params = {
        ...params,
        pageOffset: (page_offset - 1) * page_size,
        pageSize: page_size,
        algorithmType: 'PPC_MATCH',
        hasMyQuery
      }
      this.jobsLoading = true
      const response = await getMatchList(params)
      this.jobsLoading = false
      if (!handleFetchResponseMsgBox(this, response, false)) {
        return
      }
      const { content = [], total = 0 } = response.data
      this.tableData = [...content]
      this.total = total
    },
    createMatch() {
      this.$router.push('/job/createCiphertextMatch')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
