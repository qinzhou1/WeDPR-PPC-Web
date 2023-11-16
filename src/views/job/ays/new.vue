<template>
  <div>
    <el-row type="flex" justify="left" style="margin-top: 10px">
      <el-button icon="el-icon-back" @click="stepBack">{{
        $t("ays.data.last")
      }}</el-button>
    </el-row>

    <el-form>
      <el-row>
        <el-tabs type="card">
          <el-tab-pane :label="$t('ays.new.step1')" />
        </el-tabs>
      </el-row>

      <div v-if="getChocieLabel()">
        <el-form disabled style="margin-left: 200px">
          <el-form-item
            :label="$t('ays.index.searchAgency')"
            :rules="[{ required: true, trigger: 'blur' }]"
          >
            <el-form-item>
              <el-autocomplete
                v-model="keyFilterData.ownerAgencyName"
                :fetch-suggestions="fetchAgencyNameSuggestions"
                :placeholder="$t('job.filter.ownerAgencyNameTip')"
                :trigger-on-focus="false"
                style="width: 250px"
                @keyup.enter.native="fetchDataset"
              />
            </el-form-item>
          </el-form-item>
          <el-form-item
            :label="$t('ays.index.resource')"
            :rules="[{ required: true, trigger: 'blur' }]"
          >
            <el-select
              v-model="dataSelect.source.datasetTitle"
              :placeholder="$t('ays.create.sourceName')"
              value-key="datasetId"
            >
              <el-option
                v-for="item in options"
                :key="item.datasetId"
                :label="dataSelect.source.datasetTitle"
                :value="item"
              >
                <span>{{ dataSelect.source.datasetTitle }}</span>
                <span>{{ dataSelect.source.ownerAgencyName }}</span>
                <span>{{ dataSelect.source.datasetFields }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div v-else>
        <!-- <el-form style="text-align:center" :inline="true"> -->
        <el-form style="margin-left: 200px">
          <el-form-item
            :label="$t('ays.index.searchAgency')"
            :rules="[{ required: true, trigger: 'blur' }]"
          >
            <el-select
              v-model="dataSelect.agency"
              :placeholder="$t('job.filter.ownerAgencyNameTip')"
              @change="onDatasetSearch()"
            >
              <el-option
                v-for="item in agencySet"
                :key="item.agencyId"
                :label="item.agencyName"
                :value="item.agencyName"
              >
                <span>{{ item.agencyName }}</span>
                <span>{{ item.agencyId }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('ays.index.resource')"
            :rules="[{ required: true, trigger: 'blur' }]"
          >
            <el-select
              v-model="dataSelect.source"
              :placeholder="$t('ays.create.sourceName')"
              value-key="datasetId"
            >
              <el-option
                v-for="item in options"
                :key="item.datasetId"
                :label="item.datasetTitle"
                :value="item"
              >
                <span>{{ item.datasetTitle }}</span>
                <span>{{ item.datasetId }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <el-form
        v-if="hasDatasetSelected()"
        style="margin-left: 200px"
        label-position="right"
        label-width="120px"
        class="form"
      >
        <el-form-item size="medium" />
        <el-form-item size="medium">
          <span>{{ $t("ays.job.sourceName") }}</span>
          <span>{{ ": " }}</span>
          <span>{{ dataSelect.source.datasetTitle }}</span>
        </el-form-item>

        <el-form-item size="medium">
          <span>{{ $t("ays.index.providerAgency") }}</span>
          <span>{{ ": " }}</span>
          <span>{{ dataSelect.source.ownerAgencyName }}</span>
        </el-form-item>

        <el-form-item size="medium">
          <span>{{ $t("ays.job.createTime") }}</span>
          <span>{{ ": " }}</span>
          <span>{{ dataSelect.source.createTime | formatDate }}</span>
        </el-form-item>

        <el-form-item size="medium">
          <span>{{ $t("ays.index.titleFileds") }}</span>
          <span>{{ ":" }}</span>
          <span>{{ dataSelect.source.datasetFields }}</span>
        </el-form-item>

        <el-form-item size="medium">
          <span>{{ $t("dataset.datasetDescription") }}</span>
          <span>{{ ": " }}</span>
          <span>{{ dataSelect.source.datasetDescription }}</span>
        </el-form-item>
      </el-form>
    </el-form>

    <el-form>
      <el-row>
        <el-tabs type="card">
          <el-tab-pane :label="$t('ays.new.step2')">
            <el-form
              v-if="hasDatasetSelected()"
              ref="dynamicValidateForm"
              :model="dynamicValidateForm"
              label-width="100px"
              class="demo-dynamic"
            >
              <el-form-item
                prop="obsOrder"
                :label="$t('ays.create.obsRange')"
                :rules="[
                  {
                    required: true,
                    message: this.$t('ays.create.obsTips'),
                    trigger: 'blur',
                  },
                  {
                    type: 'number',
                    message: this.$t('ays.create.numberTips'),
                    trigger: ['blur', 'change'],
                  },
                  {
                    pattern: /^[1-9]{1}$/,
                    message: this.$t('ays.create.patternTips'),
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model.number="dynamicValidateForm.obsOrder" />
              </el-form-item>
              <el-form-item
                :label="$t('ays.create.searchType')"
                :rules="[{ required: true, trigger: 'blur' }]"
              >
                <el-select
                  v-model="dynamicValidateForm.searchType"
                  :placeholder="$t('ays.create.searchType')"
                >
                  <el-option :label="$t('ays.create.searchType1')" value="0" />
                  <el-option :label="$t('ays.create.searchType2')" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('ays.create.searchFileds')"
                :rules="[{ required: true, trigger: 'blur' }]"
              >
                <el-select
                  v-model="dataSelect.field"
                  filterable
                  style="width: 250px"
                  :placeholder="$t('ays.create.filedTips')"
                >
                  <el-option
                    v-for="item in getLabelSelect()"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    <span>{{ item }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-for="(searchId, index) in dynamicValidateForm.searchId"
                :key="searchId.key"
                :label="$t('ays.create.searchId') + index"
                :prop="'searchId.' + index + '.value'"
              >
                <el-input v-model="searchId.value" />
                <el-button @click.prevent="removeInput(searchId)">{{
                  $t("ays.create.removeInput")
                }}</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="addInput">{{
                  $t("ays.create.addInput")
                }}</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">{{
                  $t("ays.create.resetForm")
                }}</el-button>
              </el-form-item>
              <el-form-item v-if="hasCreateJobPerssmision()">
                <el-button
                  type="primary"
                  @click="submitForm('dynamicValidateForm')"
                >{{ $t("ays.create.submitForm") }}
                </el-button>
              </el-form-item>
              <el-form-item v-else>
                <el-button
                  disabled
                  type="primary"
                  @click="submitForm('dynamicValidateForm')"
                >{{ $t("ays.create.submitForm") }}</el-button>
              </el-form-item>
            </el-form>

            <el-form
              v-else
              ref="dynamicValidateForm"
              disabled
              :model="dynamicValidateForm"
              label-width="100px"
              class="demo-dynamic"
            >
              <el-form-item
                prop="obsOrder"
                :label="$t('ays.create.obsRange')"
                :rules="[
                  {
                    required: true,
                    message: this.$t('ays.create.obsTips'),
                    trigger: 'blur',
                  },
                  {
                    type: 'number',
                    message: this.$t('ays.create.numberTips'),
                    trigger: ['blur', 'change'],
                  },
                  {
                    pattern: /^[1-9]{1}$/,
                    message: this.$t('ays.create.patternTips'),
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model.number="dynamicValidateForm.obsOrder" />
              </el-form-item>
              <el-form-item
                :label="$t('ays.create.searchType')"
                :rules="[{ required: true, trigger: 'blur' }]"
              >
                <el-select
                  v-model="dynamicValidateForm.searchType"
                  :placeholder="$t('ays.create.searchType')"
                />
              </el-form-item>

              <el-form-item
                :label="$t('ays.create.searchFileds')"
                :rules="[{ required: true, trigger: 'blur' }]"
              >
                <el-select
                  v-model="dataSelect.field"
                  filterable
                  style="width: 250px"
                  :placeholder="$t('ays.create.filedTips')"
                >
                  <el-option
                    v-for="item in []"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    <span>{{ item }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                v-for="(searchId, index) in dynamicValidateForm.searchId"
                :key="searchId.key"
                :label="$t('ays.create.searchId') + index"
                :prop="'searchId.' + index + '.value'"
              >
                <el-input v-model="searchId.value" />
                <el-button @click.prevent="removeInput(searchId)">{{
                  $t("ays.create.removeInput")
                }}</el-button>
              </el-form-item>
              <el-form-item>
                <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">创建任务</el-button> -->
                <el-button @click="addInput">{{
                  $t("ays.create.addInput")
                }}</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">{{
                  $t("ays.create.resetForm")
                }}</el-button>
              </el-form-item>
              <el-form-item v-if="hasCreateJobPerssmision()">
                <el-button
                  type="primary"
                  @click="submitForm('dynamicValidateForm')"
                >{{ $t("ays.create.submitForm") }}
                </el-button>
              </el-form-item>
              <el-form-item v-else>
                <el-button
                  disabled
                  type="primary"
                  @click="submitForm('dynamicValidateForm')"
                >{{ $t("ays.create.submitForm") }}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-form>
  </div>
</template>

<script>

import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { getAgencyId, getUsername } from '@/utils/auth'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { listDataset } from '@/api/dataset'
import { createAysJob } from '@/api/ays'
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
      jobId: null,
      isFromChoice: false,
      agencySet: [],
      agencyNameSet: [],
      datasetIdSet: [],
      datasetTitleSet: [],
      // datasetFieldsSelect: [],
      dataSelect: {
        source: null,
        input: null,
        field: null,
        agency: null
      },
      createJobParams: {
        obfuscationOrder: null,
        jobSearchIdList: [],
        jobProviderDatasetId: null,
        isContainResult: false
      },
      dynamicValidateForm: {
        searchId: [
          {
            value: null
          }
        ],
        searchType: null,
        obsOrder: 1
      },
      options: [
        // {
        //   ownerAgencyId: null,
        //   ownerAgencyName: null,
        //   datasetId: null,
        //   ownerUserName: null,
        //   datasetDescription: null,
        //   datasetTitle: null,
        //   isSelfParty: false,
        //   isAuthorized: false
        // }
      ],
      keyFilterData: {
        ownerAgencyName: null,
        datasetTitle: null,
        datasetId: null,
        agency: null
      },
      maxSize: 2048,
      pageSize: 10,
      dataset: [
        {
          ownerAgencyId: null,
          ownerAgencyName: null,
          datasetId: null,
          ownerUserName: null,
          datasetDescription: null,
          datasetTitle: null,
          isSelfParty: false,
          isAuthorized: false
        }
      ],
      datasetLoading: false,
      rules: {
        jobTitle: [
          { required: true, message: this.$t('job.rules.jobTitleTip'), trigger: 'blur' },
          { required: true, message: this.$t('job.rules.jobTitleLimitation'), trigger: 'blur', max: 128 }
        ],
        jobDescription: [
          { required: true, message: this.$t('job.rules.jobDescriptionTip'), trigger: 'blur' },
          { required: true, message: this.$t('job.rules.jobDescriptionLimitation'), trigger: 'blur', max: 4096 }
        ]
      }

    }
  },
  created() {
    this.onCreated()
  },
  methods: {
    onCreated() {
      this.fetchAgencyList()
      if (this.$route.query.datasetId) {
        this.dataSelect.source = {
          datasetId: this.$route.query.datasetId,
          datasetTitle: this.$route.query.datasetTitle,
          datasetFields: this.$route.query.datasetFields,
          datasetDescription: this.$route.query.datasetDescription,
          createTime: parseInt(this.$route.query.createTime),
          ownerAgencyName: this.$route.query.ownerAgencyName
        }
        this.keyFilterData.ownerAgencyName = this.dataSelect.source.ownerAgencyName
        this.keyFilterData.datasetTitle = this.dataSelect.source.datasetTitle
        this.isFromChoice = true
      }
    },
    hasPermission() {
      return check_permission(getPermissions(), PermissionGroup.JOB_GROUP, JobGroup.WRITE_JOB)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    hasDatasetSelected() {
      return this.dataSelect.source
    },
    stepBack() {
      this.$router.go(-1)
    },
    fetchDataset(params) {
      this.dataset = []
      this.datasetLoading = true

      params.showAvailable = true
      params.algorithmId = 'a-1001'
      params.pageSize = 999

      if (this.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.keyFilterData.ownerAgencyName
      }
      if (this.keyFilterData.datasetId) {
        params.datasetId = this.keyFilterData.datasetId
      }
      if (this.keyFilterData.datasetTitle) {
        params.datasetTitle = this.keyFilterData.datasetTitle
      }
      if (this.keyFilterData.ownerAgencyId) {
        params.agencyId = this.keyFilterData.ownerAgencyId
      }

      listDataset(params).then(response => {
        this.datasetLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.options = []
        this.dataset = response.data.content
        for (var i = 0; i < this.dataset.length; i++) {
          uniqueAppend(this.datasetIdSet, this.dataset[i].datasetId)
          uniqueAppend(this.datasetTitleSet, this.dataset[i].datasetTitle)
          if (this.dataset[i].isAuthorized) {
            uniqueAppend(this.options, this.dataset[i])
          }
        }
      }).catch(_ => {
        this.datasetLoading = false
      })
    },
    fetchAgencyNameSuggestions(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.agencyNameSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // callback to show suggested words
      cb(results)
    },
    onClear() {
      this.keyFilterData = []
    },
    getChocieLabel() {
      // console.log(this.isFromChoice)
      return this.isFromChoice
    },
    onDatasetSearch() {
      var params = {}
      if (this.keyFilterData.ownerAgencyName) {
        params.ownerAgencyName = this.keyFilterData.ownerAgencyName
      }
      if (this.keyFilterData.datasetId) {
        params.datasetId = this.keyFilterData.datasetId
      }
      if (this.keyFilterData.datasetTitle) {
        params.datasetTitle = this.keyFilterData.datasetTitle
      }
      if (this.keyFilterData.ownerAgencyId) {
        params.agencyId = this.keyFilterData.ownerAgencyId
      }
      if (this.dataSelect.agency) {
        params.ownerAgencyName = this.dataSelect.agency
      }

      this.fetchDataset(params)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var intputIdList = []
          for (var i = 0; i < this.dynamicValidateForm.searchId.length; i++) {
            intputIdList[i] = this.dynamicValidateForm.searchId[i].value
            console.log(intputIdList[i])
          }
          // console.log('this.dynamicValidateForm.searchType')
          // console.log(this.dynamicValidateForm.searchType)
          // console.log(typeof(Number(this.dynamicValidateForm.searchType)))
          var boolChoiceType = false
          if (Number(this.dynamicValidateForm.searchType) === 1) {
            // console('here')
            boolChoiceType = true
          }

          var params = {
            searchFiled: this.dataSelect.field,
            obfuscationOrder: this.dynamicValidateForm.obsOrder,
            jobProviderDatasetId: this.dataSelect.source.datasetId,
            isContainResult: boolChoiceType,
            jobSearchIdList: intputIdList
          }
          // console.log(params)
          this.onCreateAysJob(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeInput(item) {
      var index = this.dynamicValidateForm.searchId.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.searchId.splice(index, 1)
      }
    },
    addInput() {
      this.dynamicValidateForm.searchId.push({
        value: '',
        key: Date.now()
      })
    },
    hasCreateJobPerssmision() {
      if (!this.hasDatasetSelected()) {
        // console.log("1111")
        return false
      }

      if (this.dynamicValidateForm.searchId.length === 0) {
        // console.log("2222")
        return false
      }
      if (!this.dynamicValidateForm.searchId[0].value) {
        // console.log("3333")
        return false
      }
      if (!this.dataSelect.field) {
        return false
      }
      return true
    },
    onCreateAysJob(params) {
      createAysJob(params).then(response => {
        if (handleOptResponseMsgBox(this, response, true)) {
          this.jobId = response.data.jobId
          var resultParams = {
            jobId: this.jobId
          }
          // alert(this.$t('ays.create.createTips'));
          this.onShowAysJobResult(resultParams)
        }
      }).catch(error => {
        if (error === 'cancel') {
          return
        }
      })
    },
    getLabelSelect() {
      var datasetFieldsSelect = this.dataSelect.source.datasetFields.split('[').join('').split(']').join('').split(' ')
      // console.log(datasetFieldsSelect)
      return datasetFieldsSelect
    },
    onShowAysJobResult(resultParams) {
      this.$router.push({
        path: '/job/ays/result',
        query: {
          jobId: resultParams.jobId,
          receiverId: getAgencyId(),
          agencyId: this.dataSelect.source.agencyId,
          agencyName: this.dataSelect.source.ownerAgencyName,
          datasetTitle: this.dataSelect.source.datasetTitle,
          createTime: Date.parse(new Date()),
          datasetFields: this.dataSelect.source.datasetFields,
          searchField: this.dataSelect.field,
          jobCreator: getUsername()
        }
      })
    },
    fetchAgencyList() {
      this.agencySet = []
      listAgencies().then((response) => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }

        const nodes = response.data.content
        for (var i = 0; i < nodes.length; i++) {
          this.agencySet.push(nodes[i])
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
