<template>
  <div class="container">

    <!-- 算法选择卡片 -->
    <el-card shadow="never" style="margin-top: 10px">
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("job.new.chooseAlgorithm") }}</b>
        </span>
      </div>
      <el-form ref="algorithmForm" :inline="true" :model="algorithmFilterData">
        <el-form-item :label="$t('job.new.algoSelection')" prop="algorithmSubtype">
          <el-select
            v-model="algorithmFilterData.algorithmSubtype"
            clearable
            style="width: 250px"
            :placeholder="$t('job.jobModelAlgTypeTips')"
            @change="onAlgoSearch"
          >
            <el-option v-for="item in algorithmTypes" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="algorithmLoading"
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
          prop="ownerUserName"
          :label="$t('common.ownerUserName')"
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
        <el-table-column align="center" :label="$t('job.new.operation')">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.algorithmId === selectedAlgorithm.algorithmId"
              @change="selectAlgorithm($event, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <we-pagination layout="prev, pager, next" :total="AlgorithmTotal" :page_offset="AlgorithmPageData.page_offset" :page_size="AlgorithmPageData.page_size" @paginationChange="AlgorithmPageDataPaginationHandle" />
    </el-card>
    <!-- 待选数据集卡片 -->
    <el-card v-if="selectedAlgorithm.algorithmId" v-loading="datasetLoading" shadow="never" style="margin-top: 10px">
      <div slot="header" class="clearfix" style="height: 15px">
        <b>{{ $t("job.new.selectMsg") }}</b>
      </div>
      <el-form
        ref="selectionForm"
        label-width="130px"
        :model="keyFilterData"
        :inline="true"
      >
        <el-form-item :label="$t('job.new.datasetSelection')" prop="ownerAgencyName">
          <el-autocomplete
            v-model="keyFilterData.ownerAgencyName"
            :fetch-suggestions="fetchAgencyNameSuggestions"
            :placeholder="$t('job.filter.ownerAgencyNameTip')"
            :trigger-on-focus="false"
            style="width: 250px"
            @keyup.enter.native="onDatasetSearch"
          />
        </el-form-item>
        <el-form-item style="width: 250px" prop="datasetTitle">
          <el-autocomplete
            v-model="keyFilterData.datasetTitle"
            :fetch-suggestions="fetchDatasetTitleSuggestions"
            :placeholder="$t('job.filter.ownerDatasetTitleTip')"
            :trigger-on-focus="false"
            style="width: 250px"
            @keyup.enter.native="onDatasetSearch"
          />
        </el-form-item>
        <el-form-item style="width: 400px">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onDatasetSearch"
            >{{ $t("job.filter.search") }}</el-button>
            <el-button type="info" icon="el-icon-refresh" @click="clearDatasetQuery">{{
              $t("job.filter.clear")
            }}</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
      <!-- 数据接收方 -->
      <el-form
        ref="receiverForm"
        label-width="130px"
        :model="receivedResultAgency"
        :rules="receiverRules"
        :inline="true"
      >
        <el-form-item :label="$t('job.new.outputSelection')" prop="agency">
          <el-select
            v-model="receivedResultAgency.agency"
            filterable
            style="width: 250px"
            @change="onReceiverChange"
          >
            <el-option
              v-for="item in agencySet"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-alert
        v-if="selectedAlgorithm.algorithmId"
        show-icon
        :title="alertTitle"
        type="warning"
        style="margin-top: 10px"
      />
      <el-table :data="dataset" fit stripe tooltip-effect="light">
        <el-table-column
          show-overflow-tooltip
          prop="ownerAgencyId"
          :label="$t('dataset.ownerAgencyId')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="ownerAgencyName"
          :label="$t('dataset.ownerAgencyName')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="ownerUserName"
          :label="$t('common.ownerUserName')"
        />
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
        <el-table-column align="center" :label="$t('job.new.operation')">
          <template slot-scope="scope">
            <el-switch
              :value="isSelected(scope.row.datasetId)"
              @change="onSwith($event, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <we-pagination layout="prev, pager, next" :total="dataCollectTotal" :page-offset="dataCollectPageData.page_offset" :page-size="dataCollectPageData.page_size" @paginationChange="dataCollectPaginationHandle" />
    </el-card>
    <!-- 数据集已选择卡片 -->
    <el-card
      v-if="selectedDataset.length&&selectedAlgorithm.algorithmId"
      style="margin-top: 10px"
      shadow="never"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("job.new.selectedDataset") }}</b>
        </span>
      </div>
      <el-table
        :key="Math.random()"
        :data="selectedDataset"
        fit
        stripe
        tooltip-effect="light"
      >
        <el-table-column
          show-overflow-tooltip
          prop="ownerAgencyId"
          :label="$t('dataset.ownerAgencyId')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="ownerAgencyName"
          :label="$t('dataset.ownerAgencyName')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="ownerUserName"
          :label="$t('common.ownerUserName')"
        />
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
        <el-table-column align="center" :label="$t('algorithm.sourceIndex')">
          <template slot-scope="scope">
            <el-tag
              align="center"
              style="width: 90px"
              type="danger"
              effect="light"
            >{{ "source" + scope.row.sourceIndex }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('common.remove')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="custom-icon el-icon-remove-outline"
              @click.stop="selectedDatasetPop(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-button type="primary" icon="el-icon-plus" @click="onCreate">{{
        $t("job.new.createModel")
      }}</el-button>
    </el-row>
  </div>
</template>

<script>

import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { getAgencyName, getAgencyId, getUsername } from '@/utils/auth'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { listDataset } from '@/api/dataset'
import { createJob } from '@/api/job'
import { listAlgorithms } from '@/api/algorithm'
import { listAgencies } from '@/api/agency'
import { getPermissions } from '@/utils/auth'
import { check_permission, PermissionGroup, JobGroup } from '@/utils/permission'
import wePagination from '@/components/Pagination/wePagination.vue'
import { algorithmTypes } from '@/utils/codeSheet.js'
export default {
  name: 'NewJob',
  components: {
    wePagination
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
  data() {
    return {
      that: this,
      alertTitle: '',
      userName: null,
      activeStep: 0,
      algorithmTypes,
      agencySet: [], // 结果接收方的下拉
      agencyNameSet: [],
      datasetIdSet: [],
      datasetTitleSet: [],
      algorithmTitleSet: [],
      jobBasicData: { // 任务基础信息卡片
        jobTitle: '',
        jobDescription: '',
        jobPriority: 1
      },
      algorithmFilterData: {
        algorithmSubtype: ''
      },
      AlgorithmPageData: {
        page_offset: 1,
        page_size: 10
      },
      algorithms: [],
      AlgorithmTotal: 0,
      selectedAlgorithm: {},
      dataCollectPageData: {
        page_offset: 1,
        page_size: 10
      },
      keyFilterData: {
        ownerAgencyName: '',
        datasetTitle: '',
        agency: ''
      },
      dataCollectTotal: 0,
      receivedResultAgency: {
        agency: '',
        agencyId: '',
        agencyName: ''
      },
      maxSize: 2048,
      pageSize: 10,
      algorithmsPagination: {
        currentPage: 1,
        paginationTotal: 0
      },

      datasetPagination: {
        currentPage: 1,
        paginationTotal: 0
      },
      dataset: [
        {
          ownerAgencyId: null,
          ownerAgencyName: null,
          datasetId: null,
          ownerUserName: null,
          datasetDescription: null,
          datasetTitle: null,
          isSelfParty: false
        }
      ],
      selectedDataset: [], //  选中的数据集列表
      participantAgencySet: new Set(),
      datasetLoading: false,
      algorithmLoading: false,
      confirmMessage: [],
      rules: {
        jobTitle: [
          { required: true, message: this.$t('job.rules.jobTitleTip'), trigger: 'blur' },
          { required: true, message: this.$t('job.rules.jobTitleLimitation'), trigger: 'blur', max: 128 }
        ],
        jobDescription: [
          { required: true, message: this.$t('job.rules.jobDescriptionTip'), trigger: 'blur' },
          { required: true, message: this.$t('job.rules.jobDescriptionLimitation'), trigger: 'blur', max: 4096 }
        ]
      },
      receiverRules: {
        agency: [
          { required: true, message: this.$t('job.rules.receiverTip'), trigger: 'blur' }
        ]
      },
      algoAuth: {}
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
      this.receivedResultAgency.agencyId = getAgencyId()
      this.receivedResultAgency.agencyName = getAgencyName()
      this.userName = getUsername()
      this.receivedResultAgency.agency = getAgencyName() + '(ID: ' + getAgencyId() + ')'
      this.fetchAgencys()
      this.getAlgorithmsList()
    }
  },
  methods: {

    hasPermission() {
      return check_permission(getPermissions(), PermissionGroup.JOB_GROUP, JobGroup.WRITE_JOB)
    },
    fetchAgencys() {
      listAgencies().then(response => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        const nodes = response.data.content
        for (var i = 0; i < nodes.length; i++) {
          uniqueAppend(this.agencyNameSet, nodes[i].agencyName)
          var agency = nodes[i].agencyName + '(ID: ' + nodes[i].agencyId + ')'
          this.agencySet.push({ value: agency, label: agency })
        }
      })
    },
    handleParamsValid(params) {
      const validParams = {}
      Object.keys(params).forEach((key) => {
        if (!(params[key] === undefined || params[key] === null || params[key] === '')) {
          validParams[key] = params[key]
        }
      })
      return validParams
    },
    // 获取算法列表
    getAlgorithmsList() {
      const { page_offset, page_size } = this.AlgorithmPageData
      const { algorithmSubtype } = this.algorithmFilterData
      let params = this.handleParamsValid({ algorithmSubtype })
      params = { ...params, pageOffset: (page_offset - 1) * page_size, pageSize: page_size, algorithmType: 'PPC_TRAIN' }
      this.algorithmLoading = true
      listAlgorithms(params).then(response => {
        this.algorithmLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        for (var i = 0; i < response.data.content.length; i++) {
          uniqueAppend(this.algorithmTitleSet, response.data.content[i].algorithmTitle)
        }
        this.AlgorithmTotal = response.data.total
        this.algorithms = response.data.content
      }).catch(_ => {
        this.algorithmLoading = false
      })
    },
    // 分页切换
    AlgorithmPageDataPaginationHandle(pageData) {
      this.AlgorithmPageData = { ...pageData }
      this.getAlgorithmsList()
    },
    // 点击查询
    onAlgoSearch() {
      this.$refs.algorithmForm.validate((valid) => {
        if (valid) {
          this.AlgorithmPageData.page_offset = 1
          this.getAlgorithmsList()
        } else {
          return false
        }
      })
    },
    // 选择算法
    selectAlgorithm(seleted, row) {
      if (seleted) {
        this.selectedAlgorithm = { ...row }
        this.alertTitle = this.$t('algorithm.inputCount') + ': ' + row.inputCount + this.$t('algorithm.sourceIndexTip')
      } else {
        this.selectedAlgorithm = {}
      }
      this.selectedDataset = []
      this.getDateSetList()
    },
    // 根据选择的算法获取数据集列表
    getDateSetList() {
      const { page_offset, page_size } = this.dataCollectPageData
      const { algorithmId } = this.selectedAlgorithm
      const { ownerAgencyName, datasetTitle } = this.keyFilterData
      let params = this.handleParamsValid({ ownerAgencyName, datasetTitle, algorithmId })
      // this.selectedDataset = []
      params = { ...params, pageOffset: (page_offset - 1) * page_size, pageSize: page_size, showAvailable: true }
      this.datasetLoading = true
      listDataset(params).then(response => {
        this.datasetLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        this.dataset = response.data.content
        this.dataCollectTotal = response.data.total
        for (var i = 0; i < this.dataset.length; i++) {
          uniqueAppend(this.datasetIdSet, this.dataset[i].datasetId)
          uniqueAppend(this.datasetTitleSet, this.dataset[i].datasetTitle)
        }
      }).catch(_ => {
        this.datasetLoading = false
      })
    },
    // 数据集列表分页切换
    dataCollectPaginationHandle(pageData) {
      this.dataCollectPageData = { ...pageData }
      this.getDateSetList()
    },
    clearDatasetQuery() {
      this.$refs.selectionForm.resetFields()
    },
    // 点击数据集查询
    onDatasetSearch() {
      this.$refs.selectionForm.validate((valid) => {
        if (valid) {
          this.dataCollectPageData.page_offset = 1
          this.getDateSetList()
        } else {
          return false
        }
      })
    },
    // 切换数据集是否选中
    onSwith($event, data) {
      if ($event) { // select
        this.selectedDatasetPush(data)
      } else { // cancel
        this.selectedDatasetPop(data)
      }
    },
    parseReceiver() {
      const len = this.receivedResultAgency.agency.length
      const index = this.receivedResultAgency.agency.lastIndexOf('(')
      this.receivedResultAgency.agencyId = this.receivedResultAgency.agency.substring(index + 5, len - 1)
      this.receivedResultAgency.agencyName = this.receivedResultAgency.agency.substring(0, index)
    },
    onReceiverChange() {
      this.parseReceiver()

      var len = this.selectedDataset.length
      var index = 1

      for (var i = 0; i < len; i++) {
        if (this.selectedDataset[i].ownerAgencyId === this.receivedResultAgency.agencyId) {
          this.selectedDataset[i].sourceIndex = 0
        } else {
          this.selectedDataset[i].sourceIndex = index
          index += 1
        }
      }

      this.reSortSelectedDataset()
    },
    reSortSelectedDataset() {
      var len = this.selectedDataset.length
      var receiverDataset = null
      for (var i = len - 1; i > 0; i--) {
        if (this.selectedDataset[i].ownerAgencyId === this.receivedResultAgency.agencyId) {
          receiverDataset = this.selectedDataset[i]
        }

        if (receiverDataset) {
          this.selectedDataset[i] = this.selectedDataset[i - 1]
        }
      }

      if (receiverDataset) {
        this.selectedDataset[0] = receiverDataset
      }
    },
    // 取消插入数据集
    selectedDatasetPop(data) {
      var indexNeedChange = false
      if (data.ownerAgencyId !== this.receivedResultAgency.agencyId) {
        indexNeedChange = true
      }

      var len = this.selectedDataset.length
      for (var i = 0; i < len; i++) {
        if (data.datasetId === this.selectedDataset[i].datasetId) {
          // move items
          for (var j = i; j < len - 1; j++) {
            this.selectedDataset[j] = this.selectedDataset[j + 1]
            if (indexNeedChange) {
              this.selectedDataset[j].sourceIndex -= 1
            }
          }
          this.selectedDataset.pop()
          return
        }
      }
      this.participantAgencySet.delete(data.ownerAgencyId)
      this.reSortSelectedDataset()
    },
    // 选择插入数据集
    selectedDatasetPush(data) {
      if (!this.selectedAlgorithm.algorithmId) {
        this.$alert((this.$t('job.new.selectAl')), {
          confirmButtonText: this.$t('common.confirm')
        })
        return
      }
      var len = this.selectedDataset.length

      if (this.selectedAlgorithm.inputCount.indexOf('+') === -1) {
        if (len >= Number(this.selectedAlgorithm.inputCount)) {
          this.$alert(this.$t('job.new.datasetNumberNotice1') + ': ' + this.selectedAlgorithm.inputCount + '. ' + this.$t('job.new.datasetNumberNotice2'), {
            confirmButtonText: this.$t('common.confirm')
          })
          return
        }
      }

      for (var i = 0; i < len; i++) {
        if (data.ownerAgencyId === this.selectedDataset[i].ownerAgencyId) {
          this.$alert(this.$t('job.new.datasetSelectedNotice'), {
            confirmButtonText: this.$t('common.confirm')
          })
          return
        }
      }

      if (data.ownerAgencyId === this.receivedResultAgency.agencyId) {
        data.sourceIndex = 0
      } else {
        if (len === 0) {
          data.sourceIndex = 1
        } else {
          data.sourceIndex = this.selectedDataset[len - 1].sourceIndex + 1
        }
      }
      this.selectedDataset.push(data)

      this.participantAgencySet.add(data.ownerAgencyId)
      this.reSortSelectedDataset()
    },
    isSelected(id) {
      return this.selectedDataset.map(v => v.datasetId).includes(id)
    },
    getSelectedNameByID(id) {
      const dataset = this.selectedDataset.filter(function(item) {
        return id === item.datasetId
      })
      return dataset.length ? dataset[0].datasetTitle : ''
    },
    jointConfirmMessage() {
      this.confirmMessage = []
      this.confirmMessage.push(this.$t('job.jobTitle') + ': ' + this.jobBasicData.jobTitle)
      this.confirmMessage.push(this.$t('job.jobDescription') + ': ' + this.jobBasicData.jobDescription)
      if (this.jobBasicData.jobPriority === 0) {
        this.confirmMessage.push(this.$t('job.jobPriority') + ': ' + this.$t('job.highPriority'))
      } else if (this.jobBasicData.jobPriority === 1) {
        this.confirmMessage.push(this.$t('job.jobPriority') + ': ' + this.$t('job.mediumPriority'))
      } else {
        this.confirmMessage.push(this.$t('job.jobPriority') + ': ' + this.$t('job.lowPriority'))
      }

      this.confirmMessage.push(this.$t('job.new.selectedAlgo') + ': ')
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmId') + ': ' + this.selectedAlgorithm.algorithmId)
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmVersion') + ': ' + this.selectedAlgorithm.algorithmVersion)
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmTitle') + ': ' + this.selectedAlgorithm.algorithmTitle)

      this.confirmMessage.push(this.$t('job.new.selectedDataset') + ': ')
      for (let i = 0; i < this.selectedDataset.length; i++) {
        this.confirmMessage.push(
          '\xa0\xa0' + 'source' + this.selectedDataset[i].sourceIndex + ': ' +
            this.selectedDataset[i].ownerAgencyName + '(ID: ' + this.selectedDataset[i].ownerAgencyId + ') ' +
            this.selectedDataset[i].datasetTitle)
      }

      this.confirmMessage.push(this.$t('job.receivedResultAgencyName') + ': ' + this.receivedResultAgency.agency)
      this.confirmMessage.push(this.$t('job.new.createAsk'))
    },
    areInputsReady() {
      if (!this.selectedDataset.length) {
        this.$alert(this.$t('job.new.selectMsg'))
        return false
      }

      if (this.selectedAlgorithm.inputCount.indexOf('+') === -1) {
        if (this.selectedDataset.length !== Number(this.selectedAlgorithm.inputCount)) {
          const str = this.$t('job.new.datasetsLengthLimit', { x: this.selectedAlgorithm.inputCount })
          this.$alert(str)
          return false
        }
      } else {
        var index = this.selectedAlgorithm.inputCount.indexOf('+')
        if (this.selectedDataset.length < Number(this.selectedAlgorithm.inputCount.slice(0, index))) {
          const str = this.$t('job.new.datasetsLengthLimit', { x: this.selectedAlgorithm.inputCount })
          this.$alert(str)
          return false
        }
      }
      var len = this.selectedDataset.length
      let selectInitiatorAgency = false
      let selectReceivedResultAgency = false
      for (var i = 0; i < len; i++) {
        if (this.selectedDataset[i].ownerAgencyId === getAgencyId()) {
          selectInitiatorAgency = true
        }
        if (this.selectedDataset[i].ownerAgencyId === this.receivedResultAgency.agencyId) {
          selectReceivedResultAgency = true
        }
      }
      return selectInitiatorAgency && selectReceivedResultAgency
    },
    onCreate() {
      if (!this.selectedAlgorithm.algorithmId) {
        this.$alert(this.$t('job.new.selectAl'))
        return
      }
      if (!this.areInputsReady()) {
        return
      }
      // 生成名称和描述
      this.jobBasicData.jobTitle = 'train-' + this.selectedDataset.map(v => v.datasetTitle).join('-')
      this.jobBasicData.jobDescription = this.selectedDataset.map((v, i) => 'd' + i).join('-')
      this.jointConfirmMessage()
      const confirmHtmlInfo = []
      const h = this.$createElement
      for (var i = 0; i < this.confirmMessage.length - 1; i++) {
        confirmHtmlInfo.push(h('p', null, this.confirmMessage[i]))
      }
      confirmHtmlInfo.push(h('br', null, null))
      confirmHtmlInfo.push(h('b', null, this.confirmMessage[this.confirmMessage.length - 1]))

      this.$msgbox(
        {
          title: this.$t('common.tip'),
          message: h('div', null, confirmHtmlInfo),
          showCancelButton: true,
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel')
        }
      ).then(() => {
        const datasetList = []
        for (var i = 0; i < this.selectedDataset.length; i++) {
          datasetList.push(
            {
              agencyId: this.selectedDataset[i].ownerAgencyId,
              agencyName: this.selectedDataset[i].ownerAgencyName,
              datasetId: this.selectedDataset[i].datasetId,
              datasetTitle: this.selectedDataset[i].datasetTitle,
              datasetDescription: this.selectedDataset[i].datasetDescription,
              ownerUserName: this.selectedDataset[i].ownerUserName,
              loadingIndex: i
            }
          )
        }

        var psiFields = 'id'
        for (i = 1; i < this.selectedDataset.length; i++) {
          psiFields += (',id')
        }

        const createJobParams = {
          jobTitle: this.jobBasicData.jobTitle,
          jobDescription: this.jobBasicData.jobDescription,
          jobPriority: this.jobBasicData.jobPriority,
          jobAlgorithm: {
            algorithmId: this.selectedAlgorithm.algorithmId,
            algorithmVersion: this.selectedAlgorithm.algorithmVersion,
            algorithmType: this.selectedAlgorithm.algorithmType,
            algorithmSubtype: this.selectedAlgorithm.algorithmSubtype
          },
          jobResultReceiverList: [this.receivedResultAgency.agencyId],
          jobDatasetProviderList: datasetList,
          psiFields: psiFields
        }

        createJob(createJobParams).then(response => {
          if (handleOptResponseMsgBox(this, response, true)) {
            const { data = '' } = response
            this.$router.push({ path: 'combineModelSetDetail', query: { jobId: data }})
          }
        })
      }).catch(error => {
        if (error === 'cancel') {
          return
        }
      })
    },

    // suggestions for user inputs
    fetchAgencySuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.agencySet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // callback to show suggested words
      cb(results)
    },
    fetchAgencyNameSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.agencyNameSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // callback to show suggested words
      cb(results)
    },
    fetchAlgoTitleSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.algorithmTitleSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    fetchDatasetIdSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.datasetIdSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    fetchDatasetTitleSuggestions(queryString, cb) {
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

<style lang="scss">
body {
  margin: 0;
}
.container {
  padding: 18px;
  box-sizing: border-box;
}
.form {
  margin-bottom: 5px;
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-input {
    margin-right: 10px;
    width: 100%;
  }
}
.custom-icon {
  font-size: 1.4rem;
}
</style>
