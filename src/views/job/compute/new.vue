<template>
  <div>
    <el-card>
      <el-steps class="steps" :active="activeStep" :space="500" align-center>
        <el-step :title="$t('job.new.step1')" icon="el-icon-edit" />
        <el-step :title="$t('job.new.step2')" icon="el-icon-rank" />
        <el-step :title="$t('job.new.step3')" icon="el-icon-message" />
        <el-step :title="$t('job.new.step4')" icon="el-icon-setting" />
      </el-steps>
      <br>
      <div v-if="activeStep === 0">
        <el-row type="flex" justify="space-between" style="margin-top: 15px">
          <el-form
            ref="jobFrom"
            label-position="right"
            label-width="100px"
            :model="jobBasicData"
            :rules="rules"
            class="form"
          >
            <el-form-item :label="$t('job.jobTitle')" prop="jobTitle">
              <el-input
                v-model="jobBasicData.jobTitle"
                :placeholder="$t('job.jobTitleTip')"
                style="margin-bottom: 5px"
              />
            </el-form-item>
            <el-form-item
              :label="$t('job.jobDescription')"
              prop="jobDescription"
            >
              <el-input
                v-model="jobBasicData.jobDescription"
                :autosize="{ minRows: 1.5 }"
                :placeholder="$t('job.jobDescriptionTip')"
                type="textarea"
                style="margin-bottom: 5px"
              />
            </el-form-item>
            <el-form-item :label="$t('job.jobPriority')" prop="jobPriority">
              <el-radio-group v-model="jobBasicData.jobPriority">
                <el-radio :label="0">{{ $t("job.highPriority") }}</el-radio>
                <el-radio :label="1">{{ $t("job.mediumPriority") }}</el-radio>
                <el-radio :label="2">{{ $t("job.lowPriority") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-button icon="el-icon-back" @click="onReturn">{{
            $t("job.new.back")
          }}</el-button>
          <el-button
            type="primary"
            icon="el-icon-right"
            @click="onCreateInfo"
          >{{ $t("job.new.next") }}</el-button>
        </el-row>
      </div>
      <div v-if="activeStep === 1">
        <el-row style="margin-top: 15px">
          <el-form>
            <el-form-item :label="$t('job.new.algoSelection')">
              <el-form :inline="true">
                <el-form-item style="width: 250px">
                  <el-autocomplete
                    v-model="keyFilterData.ownerAgencyName"
                    :fetch-suggestions="fetchAgencyNameSuggestions"
                    :placeholder="$t('job.filter.ownerAgencyNameTip')"
                    :trigger-on-focus="false"
                    style="width: 250px"
                    @keyup.enter.native="onAlgoSearch"
                  />
                </el-form-item>
                <el-form-item style="width: 250px">
                  <el-autocomplete
                    v-model="keyFilterData.algorithmTitle"
                    :fetch-suggestions="fetchAlgoTitleSuggestions"
                    :placeholder="$t('job.filter.ownerAlgoTitleTip')"
                    :trigger-on-focus="false"
                    style="width: 250px"
                    @keyup.enter.native="onAlgoSearch"
                  />
                </el-form-item>
                <el-form-item style="width: 400px">
                  <el-button-group>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click="onAlgoSearch"
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
          <el-card
            v-loading="algorithmLoading"
            shadow="never"
            style="margin-top: 10px"
          >
            <div slot="header" class="clearfix" style="height: 15px">
              <span>
                <b>{{ $t("job.new.chooseAlgorithm") }}</b>
              </span>
            </div>
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
                prop="algorithmType"
                width="145px"
                :label="$t('algorithm.algorithmType')"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.algorithmType }}</span>
                </template>
              </el-table-column>
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
              <el-table-column show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="selectAlgorithm(scope.row)"
                  >{{ $t("common.choose") }}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="algorithmsPagination.currentPage"
              :page-size="pageSize"
              :total="algorithmsPagination.paginationTotal"
              style="
                margin-top: 10px;
                text-align: center;
                height: 20px;
                width: 100%;
              "
              @current-change="onCurrentAlgorithmsPageChange"
              @prev-click="onPrevAlgorithmsPage"
              @next-click="onNextAlgorithmsPage"
            />
          </el-card>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-button icon="el-icon-back" @click="stepBack">{{
            $t("job.new.last")
          }}</el-button>
        </el-row>
      </div>
      <div v-if="activeStep === 2">
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
            <el-table-column
              align="center"
              :label="$t('algorithm.sourceIndex')"
            >
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
        <el-row type="flex" justify="center" style="margin-top: 10px">
          <el-button icon="el-icon-back" @click="stepBack">{{
            $t("job.new.last")
          }}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onCreate">{{
            $t("job.new.create")
          }}</el-button>
        </el-row>
      </div>
    </el-card>
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

export default {
  name: 'NewJob',
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
      activeStep: 0,
      agencySet: [],
      agencyNameSet: [],
      datasetIdSet: [],
      datasetTitleSet: [],
      algorithmTitleSet: [],
      jobBasicData: {
        jobTitle: null,
        jobDescription: null,
        jobPriority: 1,
        algorithmTitle: null,
        algorithmVersion: null,
        algorithmType: null,
        algorithmId: null,
        inputCount: ''
      },
      keyFilterData: {
        ownerAgencyName: null,
        algorithmId: null,
        algorithmTitle: null,
        datasetId: null,
        datasetTitle: null
      },
      receivedResultAgency: {
        // format: agencyName(agencyId)
        agency: null,
        agencyId: null,
        agencyName: null
      },
      maxSize: 2048,
      pageSize: 10,
      algorithmsPagination: {
        currentPage: 1,
        paginationTotal: 0
      },
      algorithms: [
        {
          ownerAgencyId: null,
          ownerAgencyName: null,
          algorithmId: null,
          algorithmTitle: null,
          ownerUserName: null,
          createTime: null
        }
      ],
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
      selectedDataset: [],
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
    stepBack() {
      if (this.activeStep > 0) {
        this.activeStep--
      }
      this.datasetPagination.currentPage = 1
      this.algorithmsPagination.currentPage = 1
      this.onStep()
    },
    stepNext() {
      if (this.activeStep < 2) {
        this.activeStep++
      }
      this.datasetPagination.currentPage = 1
      this.algorithmsPagination.currentPage = 1
      this.onStep()
    },
    onStep() {
      if (this.activeStep === 1) {
        this.fetchAlgorithms({ pageOffset: (this.algorithmsPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }

      if (this.activeStep === 2) {
        this.fetchDataset({ pageOffset: (this.datasetPagination.currentPage - 1) * this.pageSize, pageSize: this.pageSize })
      }
    },
    onReturn(jobId) {
      if (jobId) {
        const jobAlgorithmType = this.jobBasicData.algorithmType
        const jobResultReceiverList = [this.receivedResultAgency.agencyId]
        this.clearData()
        this.$router.push({
          name: 'JobIndex',
          params: {
            jobId: jobId,
            jobAlgorithmType: jobAlgorithmType,
            jobStatus: 'WAITING',
            jobCreator: getUsername(),
            jobResultReceiverList: jobResultReceiverList
          }
        })
      } else {
        this.clearData()
        this.$router.push({ name: 'JobIndex' })
      }
    },
    clearData() {
      this.activeStep = 0
      this.jobBasicData.jobTitle = null
      this.jobBasicData.jobDescription = null
      this.jobBasicData.algorithmTitle = null
      this.jobBasicData.algorithmVersion = null
      this.jobBasicData.algorithmId = null
      this.jobBasicData.algorithmType = null
      this.onClear()
    },
    onAlgoSearch() {
      this.algorithmsPagination.currentPage = 1

      var params = {}
      params.pageOffset = (this.algorithmsPagination.currentPage - 1) * this.pageSize
      params.pageSize = this.pageSize

      this.fetchAlgorithms(params)
    },
    onDatasetSearch() {
      this.datasetPagination.currentPage = 1

      var params = {}
      params.pageOffset = (this.datasetPagination.currentPage - 1) * this.pageSize
      params.pageSize = this.pageSize

      params.showAvailable = true
      params.algorithmId = this.jobBasicData.algorithmId
      this.fetchDataset(params)
    },
    onClear() {
      this.keyFilterData = []
    },
    selectAlgorithm(row) {
      this.jobBasicData.algorithmTitle = row.algorithmTitle
      this.jobBasicData.algorithmId = row.algorithmId
      this.jobBasicData.inputCount = row.inputCount
      this.jobBasicData.algorithmType = row.algorithmType
      this.jobBasicData.algorithmVersion = row.algorithmVersion
      this.alertTitle = this.$t('algorithm.inputCount') + ': ' + row.inputCount + this.$t('algorithm.sourceIndexTip')
      this.stepNext()
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
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmVersion') + ': ' + this.jobBasicData.algorithmVersion)
      this.confirmMessage.push('\xa0\xa0' + this.$t('algorithm.algorithmTitle') + ': ' + this.jobBasicData.algorithmTitle)

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
    onCreateInfo() {
      this.$refs['jobFrom'].validate((valid) => {
        if (valid) {
          this.stepNext()
        }
      })
    },
    onCreate() {
      // check Jobdata
      if (!this.areInputsReady()) {
        this.$alert(this.$t('job.new.datasetNumberNotice1') +
          ': ' + this.jobBasicData.inputCount +
          '</br>' +
          this.$t('job.new.datasetNumberNotice2') +
          '</br>' +
          this.$t('job.new.datasetNumberNotice4')
        ,
        {
          title: this.$t('job.new.datasetNumberNotice3'),
          dangerouslyUseHTMLString: true,
          confirmButtonText: this.$t('common.confirm')
        })
        return
      }
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
            algorithmId: this.jobBasicData.algorithmId,
            algorithmVersion: this.jobBasicData.algorithmVersion,
            algorithmType: this.jobBasicData.algorithmType
          },
          jobResultReceiverList: [this.receivedResultAgency.agencyId],
          jobDatasetProviderList: datasetList,
          psiFields: psiFields
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
    fetchAlgorithms(params) {
      this.algorithms = []
      this.algorithmLoading = true

      if (this.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.keyFilterData.ownerAgencyName
      }
      if (this.keyFilterData.algorithmId) {
        params.algorithmId = this.keyFilterData.algorithmId
      }
      if (this.keyFilterData.algorithmTitle) {
        params.algorithmTitle = this.keyFilterData.algorithmTitle
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
