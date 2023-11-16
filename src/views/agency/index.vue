<template>
  <el-card shadow="never">
    <div v-loading="agencyLoading">
      <el-card v-if="selfAgency.agencyId" shadow="never">
        <div slot="header" class="clearfix" style="height: 15px">
          <span>
            <b>{{ $t("agency.selfAgency") }}</b>
          </span>
        </div>
        <el-form :model="selfAgency" label-width="100px" class="form">
          <el-form-item :label="$t('agency.agencyId')">
            <span>{{ selfAgency.agencyId }}</span>
          </el-form-item>
          <el-form-item :label="$t('agency.agencyName')">
            <span>{{ selfAgency.agencyName }}</span>
          </el-form-item>
          <el-form-item :label="$t('agency.publicKey')">
            <el-input
              v-model="selfAgency.agencyPublicKey"
              type="text"
              :disabled="!enableEdit"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item :label="$t('agency.gatewayUrl')">
            <el-input
              v-model="selfAgency.gatewayUrl"
              type="text"
              :disabled="!enableEdit"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item :label="$t('agency.managementUrl')">
            <el-input
              v-model="selfAgency.managementUrl"
              type="text"
              :disabled="!enableEdit"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item :label="$t('agency.description')">
            <el-input
              v-model="selfAgency.agencyDescription"
              :autosize="{ minRows: 3 }"
              type="textarea"
              :disabled="!enableEdit"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item v-if="hasWritePermission">
            <el-button
              v-if="isSuperAdmin()"
              :loading="onRegisterLoading"
              type="danger"
              @click.stop="onClickRemove"
            >{{ $t("common.remove") }}</el-button>
            <el-button type="primary" @click.stop="onEdit">{{
              $t("common.edit")
            }}</el-button>
            <el-button
              v-if="enableUpdate"
              :loading="onUpdateLoading"
              type="primary"
              @click.stop="onUpdate"
            >{{ $t("common.update") }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card v-if="!selfAgency.agencyId && hasWritePermission" shadow="never">
        <div slot="header" class="clearfix" style="height: 15px">
          <span>
            <b>{{ $t("agency.selfAgency") }}</b>
          </span>
        </div>
        <el-form :model="selfAgency" label-width="100px" class="form">
          <el-form-item :label="$t('agency.agencyId')">
            <span>{{ selfAgencyId }}</span>
          </el-form-item>
          <el-form-item :label="$t('agency.agencyName')">
            <span>{{ selfAgencyName }}</span>
          </el-form-item>
          <el-form-item :label="$t('agency.publicKey')">
            <el-input
              v-model="registerForm.agencyPublicKey"
              :placeholder="$t('agency.publicKey')"
              type="text"
              tabindex="1"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item :label="$t('agency.gatewayUrl')">
            <el-input
              v-model="registerForm.gatewayUrl"
              :placeholder="$t('agency.gatewayUrl')"
              type="text"
              tabindex="1"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item :label="$t('agency.managementUrl')">
            <el-input
              v-model="registerForm.managementUrl"
              :placeholder="$t('agency.managementUrl')"
              type="text"
              tabindex="1"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item :label="$t('agency.description')">
            <el-input
              v-model="registerForm.agencyDescription"
              :placeholder="$t('agency.description')"
              type="textarea"
              :autosize="{ minRows: 3 }"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="onRegisterLoading" type="primary" @click.stop="onRegister">{{
              $t("user.register")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card style="margin-top: 15px; margin-bottom: 15px" shadow="never">
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
                    :fetch-suggestions="queryAgencyNameSearch"
                    :trigger-on-focus="false"
                    @keyup.enter.native="onSearch"
                  />
                </el-form-item>
                <el-form-item :label="$t('agency.gatewayUrl')">
                  <el-autocomplete
                    v-model="controllerData.keyFilterData.gatewayUrl"
                    :placeholder="$t('agency.gatewayUrlPlaceHolder')"
                    :fetch-suggestions="queryGatewayUrlSearch"
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
            <el-table-column
              prop="agencyName"
              :label="$t('agency.agencyName')"
            />
            <el-table-column
              prop="agencyPublicKey"
              :label="$t('agency.publicKey')"
            />
            <el-table-column
              prop="gatewayUrl"
              :label="$t('agency.gatewayUrl')"
            />
            <el-table-column
              prop="managementUrl"
              :label="$t('agency.managementUrl')"
            />
            <el-table-column
              prop="agencyDescription"
              :label="$t('agency.description')"
            />
          </el-table>
        </el-row>
        <el-row
          style="
            margin-top: 10px;
            text-align: center;
            height: 40px;
            width: 100%;
          "
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
    </div>
  </el-card>
</template>

<script>

import { parseTime } from '@/utils'
import { uniqueAppend, stringArrToObjectArr } from '@/utils/array'
import { getAgencyId, getAgencyName, getUsername } from '@/utils/auth'
import { handleFetchResponseMsgBox, handleOptResponseMsgBox } from '@/utils/messageBox'
import { listAgencies, deleteAgency, registerAgency, updateAgency } from '@/api/agency'
import { getPermissions } from '@/utils/auth'
import ControllerForm from '@/components/Controller'
import { check_permission, PermissionGroup, AgencyGroup } from '@/utils/permission'

export default {
  name: 'AgencyManager',
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
    },
    textFilter(data, that) {
      if (data) {
        return that.$t('common.yes')
      } else {
        return that.$t('common.no')
      }
    }
  },
  data() {
    return {
      that: this,
      enableEdit: false,
      enableUpdate: false,
      agencyNameSet: [],
      gatewayUrlSet: [],
      controllerData: {
        isNeedDataPicker: false,
        disableWrite: false,
        searchButtonName: this.$t('agency.searchButtonName'),
        keyFilterData: {
          isComputationProvider: null,
          agencyName: null,
          gatewayUrl: null
        }
      },
      addRoleDialog: {
        show: false
      },
      pageSize: 10,
      currentPage: 1,
      paginationTotal: 0,
      registerForm: {
        agencyPublicKey: '',
        agencyDescription: '',
        gatewayUrl: '',
        managementUrl: '',
        isComputationProvider: ''
      },
      selfAgencyId: '',
      selfAgencyName: '',
      selfAgency: {},
      agencyList: [],
      confirmMessage: '',
      agencyLoading: false,
      onRegisterLoading: false,
      onUpdateLoading: false,
      hasWritePermission: false
    }
  },
  created() {
    this.fetchSelf()
    var params = {}
    params.pageOffset = 0
    params.pageSize = this.pageSize
    this.fetchAgencyList(params)
    this.hasWritePermission = check_permission(getPermissions(), PermissionGroup.AgencyGroup, AgencyGroup.WRITE_AGENCY)
  },
  mounted() { },
  methods: {
    onEdit() {
      this.enableEdit = true
      this.enableUpdate = true
    },

    onSearch() {
      var params = {}
      params.pageOffset = 0
      params.pageSize = this.pageSize
      this.fetchAgencyList(params)
    },

    queryAgencyNameSearch(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.agencyNameSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },

    queryGatewayUrlSearch(queryString, cb) {
      var restaurants = stringArrToObjectArr(this.gatewayUrlSet)
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    isSuperAdmin() {
      return getUsername() === 'admin'
    },
    fetchSelf() {
      this.selfAgencyId = getAgencyId()
      this.selfAgencyName = getAgencyName()
      listAgencies({ agencyId: this.selfAgencyId }).then(response => {
        this.agencyLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        if (response.data.content && response.data.content.length > 0) {
          this.selfAgency = response.data.content[0]
        }
      }).catch(_ => {
        this.agencyLoading = false
      })
    },

    fetchAgencyList(params) {
      this.agencyLoading = true
      if (this.controllerData.keyFilterData.isComputationProvider) {
        params.isComputationProvider = this.controllerData.keyFilterData.isComputationProvider
      }
      if (this.controllerData.keyFilterData.gatewayUrl) {
        params.gatewayUrl = this.controllerData.keyFilterData.gatewayUrl
      }
      if (this.controllerData.keyFilterData.agencyName) {
        params.agencyName = this.controllerData.keyFilterData.agencyName
      }
      listAgencies(params).then(response => {
        this.agencyLoading = false
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        this.agencyList = response.data.content
        this.paginationTotal = response.data.total
        this.currentPage = (params.pageOffset / params.pageSize) + 1

        for (var i = 0; i < this.agencyList.length; i++) {
          uniqueAppend(this.agencyNameSet, this.agencyList[i].agencyName)
          uniqueAppend(this.gatewayUrlSet, this.agencyList[i].gatewayUrl)
        }
      }).catch(_ => {
        this.agencyLoading = false
      })
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
    onRegister() {
      this.onRegisterLoading = true
      const agencyParams = {
        agencyId: this.selfAgencyId,
        agencyName: this.selfAgencyName,
        agencyPublicKey: this.registerForm.agencyPublicKey,
        agencyDescription: this.registerForm.agencyDescription,
        isComputationProvider: true,
        gatewayUrl: this.registerForm.gatewayUrl,
        managementUrl: this.registerForm.managementUrl
      }

      registerAgency(agencyParams).then(response => {
        this.onRegisterLoading = false
        if (!handleOptResponseMsgBox(this, response, false)) {
          return
        } else {
          this.fetchSelf()
          const params = { pageOffset: 0, pageSize: this.pageSize }
          this.fetchAgencyList(params)
        }
      })
    },

    onUpdate() {
      this.onUpdateLoading = true
      this.enableEdit = false
      this.enableUpdate = false
      const agencyParams = {
        agencyId: this.selfAgencyId,
        agencyName: this.selfAgencyName,
        agencyPublicKey: this.selfAgency.agencyPublicKey,
        agencyDescription: this.selfAgency.agencyDescription,
        isComputationProvider: this.selfAgency.isComputationProvider,
        gatewayUrl: this.selfAgency.gatewayUrl,
        managementUrl: this.selfAgency.managementUrl
      }

      updateAgency(agencyParams).then(response => {
        this.onUpdateLoading = false
        if (!handleOptResponseMsgBox(this, response, true)) {
          return
        } else {
          this.fetchSelf()
          const params = { pageOffset: 0, pageSize: this.pageSize }
          this.fetchAgencyList(params)
        }
      })
    },

    onClickRemove() {
      const agencyParams = {
        agencyId: this.selfAgencyId,
        agencyName: this.selfAgency.agencyName
      }
      this.removeScmn(agencyParams)
    },
    jointConfirmMessage(action, agency) {
      this.confirmMessage = []
      this.confirmMessage.push('ID' + ': ' + agency.agencyId)
      this.confirmMessage.push(this.$t('common.name') + ': ' + agency.agencyName)
      if (action !== 'REMOVE') {
        this.confirmMessage.push(this.$t('agency.nodeIp') + ': ' + agency.nodeIp)
        this.confirmMessage.push(this.$t('agency.nodePort') + ': ' + agency.nodePort)
        if (action === 'ADD') {
          this.confirmMessage.push(this.$t('agency.message.confirmAddAsk'))
        } else if (action === 'UPDATE') {
          this.confirmMessage.push(this.$t('agency.message.confirmUpdateAsk'))
        }
      } else {
        this.confirmMessage.push(this.$t('agency.message.confirmRemoveAsk'))
      }
    },
    removeScmn(agency) {
      this.jointConfirmMessage('REMOVE', agency)
      const confirmHtmlInfo = []
      const h = this.$createElement
      for (var i = 0; i < this.confirmMessage.length - 1; i++) {
        confirmHtmlInfo.push(h('p', null, this.confirmMessage[i]))
      }
      confirmHtmlInfo.push(h('br', null, null))
      confirmHtmlInfo.push(h('b', null, this.confirmMessage[this.confirmMessage.length - 1]))

      this.$confirm(
        this.$t('common.tip'),
        {
          title: this.$t('common.tip'),
          message: h('div', null, confirmHtmlInfo),
          showCancelButton: true,
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }
      ).then(() => {
        deleteAgency(agency.agencyId).then(response => {
          if (handleOptResponseMsgBox(this, response, true)) {
            const params = { pageOffset: 0, pageSize: this.pageSize }
            this.selfAgency = {}
            this.fetchAgencyList(params)
          }
        })
      }).catch(error => {
        if (error === 'cancel') {
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
