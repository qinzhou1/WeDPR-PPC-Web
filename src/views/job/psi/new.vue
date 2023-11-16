<template>
  <div>
    <el-row v-loading="datasetLoading" style="margin-top: 15px">
      <el-form
        ref="selectionFrom"
        label-width="130px"
        :model="receivedResultAgency"
        :rules="receiverRules"
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
        <el-form-item :label="$t('job.new.datasetSelection')">
          <el-form :inline="true">
            <el-form-item style="width: 250px">
              <el-autocomplete
                v-model="keyFilterData.ownerAgencyName"
                :fetch-suggestions="fetchAgencyNameSuggestions"
                :placeholder="$t('job.filter.ownerAgencyNameTip')"
                :trigger-on-focus="false"
                style="width: 250px"
                @keyup.enter.native="onDatasetSearch"
              />
            </el-form-item>
            <el-form-item style="width: 250px">
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
                <el-button
                  type="info"
                  icon="el-icon-refresh"
                  @click="onClear"
                >{{ $t("job.filter.clear") }}</el-button>
              </el-button-group>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
      <el-alert
        show-icon
        :title="alertTitle"
        type="warning"
        style="margin-top: 10px"
      />
      <el-card shadow="never" style="margin-top: 10px">
        <div slot="header" class="clearfix" style="height: 15px">
          <b>{{ $t("job.new.allDataset") }}</b>
        </div>
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
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="datasetPagination.currentPage"
          :page-size="pageSize"
          :total="datasetPagination.paginationTotal"
          style="
            margin-top: 10px;
            text-align: center;
            height: 20px;
            width: 100%;
          "
          @current-change="onCurrentDatasetPageChange"
          @prev-click="onPrevDatasetPage"
          @next-click="onNextDatasetPage"
        />
      </el-card>
    </el-row>
    <el-card
      v-if="hasDatasetSelected()"
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
              @click.stop="onRemoveSelection(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card
      v-if="hasDatasetSelected()"
      style="margin-top: 10px"
      shadow="never"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("job.new.selectPsiFields") }}</b>
        </span>
      </div>
      <el-form
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(dataset, index) in selectedDataset"
          :key="dataset.datasetId"
          :label="'Source' + index"
        >
          <el-select
            :key="dataset.datasetId"
            v-model="dataset.selectedField"
            multiple
            placeholder="请选择"
            @change="$forceUpdate()"
          >
            <el-option
              v-for="item in dataset.fields"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row type="flex" justify="center" style="margin-top: 10px">
      <el-button type="primary" icon="el-icon-plus" @click="onCreate">{{
        $t("job.new.create")
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
import { listAgencies } from '@/api/agency'
import { getPermissions } from '@/utils/auth'
import { check_permission, PermissionGroup, JobGroup } from '@/utils/permission'

export default {
  name: 'NewPsiJob',
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
      alertTitle: null,
      userName: null,
      agencySet: [],
      agencyNameSet: [],
      datasetIdSet: [],
      datasetTitleSet: [],
      jobBasicData: {
        jobTitle: null,
        jobDescription: null,
        jobPriority: 1,
        algorithmTitle: '隐私求交',
        algorithmVersion: '1.0',
        algorithmType: 'PPC_PSI',
        algorithmId: 'a-1002',
        inputCount: '2+',
        psiFields: null
      },
      keyFilterData: {
        ownerAgencyName: null,
        datasetTitle: null
      },
      receivedResultAgency: {
        agency: null,
        agencyId: null,
        agencyName: null
      },
      pageSize: 10,
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
          isSelfParty: false,
          datasetFields: [],
          selectedField: []
        }
      ],
      selectedDataset: [],
      participantAgencySet: new Set(),
      datasetLoading: false,
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
      this.alertTitle = this.$t('algorithm.inputCount') + this.jobBasicData.inputCount + this.$t('algorithm.sourceIndexTip')
      this.receivedResultAgency.agencyId = getAgencyId()
      this.receivedResultAgency.agencyName = getAgencyName()
      this.userName = getUsername()
      this.receivedResultAgency.agency = getAgencyName() + '(ID: ' + getAgencyId() + ')'
      this.fetchAgencys()
      this.onDatasetSearch()
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
    onDatasetSearch() {
      this.datasetPagination.currentPage = 1

      var params = {}
      params.pageOffset = (this.datasetPagination.currentPage - 1) * this.pageSize
      params.pageSize = this.pageSize

      this.fetchDataset(params)
    },

    onReturn(jobId) {
      if (jobId) {
        this.$router.push({
          name: 'JobPsi',
          params: {
            jobId: jobId,
            jobStatus: 'WAITING',
            jobCreator: getUsername(),
            jobResultReceiverList: [this.receivedResultAgency.agencyId]
          }
        })
      } else {
        this.$router.push({ name: 'JobPsi' })
      }
    },
    onClear() {
      this.keyFilterData = []
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
    hasDatasetSelected() {
      return this.selectedDataset.length > 0
    },
    onRemoveSelection(data) {
      this.selectedDatasetPop(data)
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
    selectedDatasetPush(data) {
      var len = this.selectedDataset.length

      if (this.jobBasicData.inputCount.indexOf('+') === -1) {
        if (len >= Number(this.jobBasicData.inputCount)) {
          this.$alert(this.$t('job.new.datasetNumberNotice1') + ': ' + this.jobBasicData.inputCount + '. ' + this.$t('job.new.datasetNumberNotice2'), {
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
      // 赋初始值
      console.log(data, data.fields)
      data.fields = data.datasetFields.split(' ')
      data.selectedField = []
      this.selectedDataset.push(data)

      this.participantAgencySet.add(data.ownerAgencyId)
      this.reSortSelectedDataset()
    },
    isSelected(id) {
      for (var i = 0; i < this.selectedDataset.length; i++) {
        if (id === this.selectedDataset[i].datasetId) {
          return true
        }
      }
      return false
    },
    getSelectedNameByID(id) {
      var dataset = this.selectedDataset.filter(function(item) {
        return id === item.datasetId
      })
      if (dataset === null || dataset.length === 0) {
        return null
      }
      return dataset[0].datasetTitle
    },
    onSwith($event, data) {
      // const agencyId = data.ownerAgencyId
      if ($event) { // select
        this.selectedDatasetPush(data)
      } else { // cancel
        this.selectedDatasetPop(data)
      }
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
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmId') + ': ' + this.jobBasicData.algorithmId)
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmTitle') + ': ' + this.jobBasicData.algorithmTitle)

      this.confirmMessage.push(this.$t('job.new.selectedDataset') + ': ')
      for (let i = 0; i < this.selectedDataset.length; i++) {
        this.confirmMessage.push(
          '\xa0\xa0' + 'source' + this.selectedDataset[i].sourceIndex + ': ' +
          this.selectedDataset[i].ownerAgencyName + '(ID: ' + this.selectedDataset[i].ownerAgencyId + ') ' +
          this.selectedDataset[i].datasetTitle)
      }
      this.confirmMessage.push(this.$t('job.new.selectPsiFields') + ': ' + this.jobBasicData.psiFields)
      this.confirmMessage.push(this.$t('job.receivedResultAgencyName') + ': ' + this.receivedResultAgency.agency)
      this.confirmMessage.push(this.$t('job.new.createAsk'))
    },
    areInputsReady() {
      if (this.jobBasicData.inputCount.indexOf('+') === -1) {
        if (this.selectedDataset.length !== Number(this.jobBasicData.inputCount)) {
          return false
        }
      } else {
        var index = this.jobBasicData.inputCount.indexOf('+')
        if (this.selectedDataset.length < Number(this.jobBasicData.inputCount.slice(0, index))) {
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
      // check Jobdata
      if (!this.areInputsReady()) {
        this.$alert(this.$t('job.new.datasetNumberNotice1') +
          ': ' + this.jobBasicData.inputCount + '</br>' +
          this.$t('job.new.datasetNumberNotice2') + '</br>' +
          this.$t('job.new.datasetNumberNotice4'),
        {
          title: this.$t('job.new.datasetNumberNotice3'),
          dangerouslyUseHTMLString: true,
          confirmButtonText: this.$t('common.confirm')
        })
        return
      }

      this.jobBasicData.jobTitle = this.selectedDataset[0].datasetTitle
      for (var i = 1; i < this.selectedDataset.length; i++) {
        this.jobBasicData.jobTitle += ('-' + this.selectedDataset[i].datasetTitle)
      }

      this.jobBasicData.jobDescription = 'd0.' + this.selectedDataset[0].selectedField
      this.jobBasicData.psiFields = this.selectedDataset[0].selectedField.join('===')
      for (i = 1; i < this.selectedDataset.length; i++) {
        this.jobBasicData.jobDescription += ('-d' + i + '.' + this.selectedDataset[i].selectedField)
        this.jobBasicData.psiFields += (',' + this.selectedDataset[i].selectedField.join('==='))
      }

      this.jointConfirmMessage()
      const confirmHtmlInfo = []
      const h = this.$createElement
      for (i = 0; i < this.confirmMessage.length - 1; i++) {
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
              loadingIndex: i
            }
          )
        }

        const createJobParams = {
          jobTitle: this.jobBasicData.jobTitle,
          jobDescription: this.jobBasicData.jobDescription,
          jobPriority: this.jobBasicData.jobPriority,
          jobAlgorithm: {
            algorithmId: this.jobBasicData.algorithmId,
            algorithmVersion: this.jobBasicData.algorithmVersion,
            algorithmType: this.jobBasicData.algorithmType
          },
          jobResultReceiverList: [this.receivedResultAgency.agencyId],
          jobDatasetProviderList: datasetList,
          psiFields: this.jobBasicData.psiFields
        }
        createJob(createJobParams).then(response => {
          if (handleOptResponseMsgBox(this, response, true)) {
            this.onReturn(response.data)
          }
        })
      }).catch(error => {
        if (error === 'cancel') {
          return
        }
      })
    },
    fetchDataset(params) {
      this.dataset = []
      this.datasetLoading = true

      params.showAvailable = true
      params.algorithmId = this.jobBasicData.algorithmId

      if (this.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.keyFilterData.ownerAgencyName
      }
      if (this.keyFilterData.datasetId) {
        params.datasetId = this.keyFilterData.datasetId
      }
      if (this.keyFilterData.datasetTitle) {
        params.datasetTitle = this.keyFilterData.datasetTitle
      }
      params.algorithmId = this.jobBasicData.algorithmId

      listDataset(params).then(response => {
        this.datasetLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        this.dataset = response.data.content
        for (var i = 0; i < this.dataset.length; i++) {
          uniqueAppend(this.datasetIdSet, this.dataset[i].datasetId)
          uniqueAppend(this.datasetTitleSet, this.dataset[i].datasetTitle)
        }

        this.datasetPagination.paginationTotal = response.data.total
        this.datasetPagination.currentPage = params.pageOffset / params.pageSize + 1
      }).catch(_ => {
        this.datasetLoading = false
      })
    },

    onCurrentDatasetPageChange(page) {
      this.datasetPagination.currentPage = page
      this.fetchDataset({ pageOffset: (this.datasetPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onPrevDatasetPage() {
      this.datasetPagination.currentPage = this.datasetPagination.currentPage - 1
      this.fetchDataset({ pageOffset: (this.datasetPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
    },
    onNextDatasetPage() {
      this.datasetPagination.currentPage = this.datasetPagination.currentPage + 1
      this.fetchDataset({ pageOffset: (this.datasetPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
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
.form {
  margin-bottom: 5px;
  margin: 0 auto;
  width: 600px;
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-input {
    margin-right: 10px;
    width: 100%;
  }
}
.steps {
  ::v-deep .el-step {
    position: relative;
    .el-step__title.is-process {
      font-size: 0.95rem;
    }
    .el-step__title.is-finish {
      font-size: 0.9rem;
    }
    .el-step__title.is-wait {
      font-size: 0.9rem;
    }
  }
}
.custom-icon {
  font-size: 1.4rem;
}
</style>
