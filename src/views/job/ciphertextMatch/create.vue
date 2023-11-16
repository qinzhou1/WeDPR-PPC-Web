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
        <el-form-item
          :label="$t('job.new.algoSelection')"
          prop="ownerAgencyName"
        >
          <el-input
            v-model="algorithmFilterData.ownerAgencyName"
            :placeholder="$t('job.filter.ownerAgencyNameTip')"
            style="width: 250px"
            @keyup.enter.native="onSearch"
          />
        </el-form-item>
        <el-form-item style="width: 250px" prop="algorithmTitle">
          <el-input
            v-model="algorithmFilterData.algorithmTitle"
            :placeholder="$t('algorithm.algorithmTitlePlaceHolder')"
            style="width: 250px"
            @keyup.enter.native="onSearch"
          />
        </el-form-item>
        <el-form-item style="width: 400px">
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">{{
              $t("job.filter.search")
            }}</el-button>
            <el-button type="info" icon="el-icon-refresh" @click="onClear">{{
              $t("job.filter.clear")
            }}</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="algorithmLoading"
        :data="algorithmsList"
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
      <we-pagination
        layout="prev, pager, next"
        :total="AlgorithmTotal"
        :page_offset="AlgorithmPageData.page_offset"
        :page_size="AlgorithmPageData.page_size"
        @paginationChange="AlgorithmPageDataPaginationHandle"
      />
    </el-card>
    <el-card
      v-if="selectedAlgorithm.algorithmId"
      shadow="never"
      style="margin-top: 10px"
    >
      <div slot="header" class="clearfix" style="height: 15px">
        <span>
          <b>{{ $t("job.index.importField") }}</b>
        </span>
      </div>
      <el-form
        ref="userInputForm"
        :model="userInputForm"
        :label-width="formLabelWidth"
      >
        <el-form-item
          :label="$t('job.index.selectField')"
          prop="selectedKeys"
          :rules="{
            required: true,
            message: $t('job.index.fieldCantBeNull'),
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="userInputForm.selectedKeys"
            style="width: 360px; margin-right: 10px"
            multiple
            :placeholder="$t('job.index.pleaseSelect')"
          >
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.key"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <div v-for="params in userInputForm.selectedKeys" :key="params">
          <el-form-item
            :label="params"
            :prop="params"
            :rules="{
              required: true,
              message: $t('job.index.fieldValueCantBeNull'),
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="userInputForm[params]"
              style="width: 360px; margin-right: 10px"
              :placeholder="$t('job.index.inputMatchValue')"
              autocomplete="off"
            />
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div class="bottom">
      <el-button
        :disabled="!selectedAlgorithm.algorithmId"
        type="primary"
        icon="el-icon-plus"
        @click="startMatch"
      >
        {{ $t("job.index.startMatch") }}</el-button>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { handleFetchResponseMsgBox } from '@/utils/messageBox'
import { listAlgorithms, queryAlgorithmDetail } from '@/api/algorithm'
import { createMatch } from '@/api/job'
import wePagination from '@/components/Pagination/wePagination.vue'
export default {
  name: 'CiphertextMatchCreate',
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
  props: {},
  data() {
    return {
      algorithmsList: [],
      formLabelWidth: '120px',
      rules: {},
      selectedAlgorithms: {},
      algorithmFilterData: {
        ownerAgencyName: '',
        algorithmTitle: ''
      },
      AlgorithmTotal: 0,
      AlgorithmPageData: {
        page_offset: 1,
        page_size: 10
      },
      fieldForm: {},
      excelForm: {},
      userInputForm: {
        selectedKeys: []
      },
      selectedAlgorithm: {},
      algorithmLoading: false,
      options: []
    }
  },
  created() {
    this.getAlgorithmsList()
  },
  mounted() {},
  methods: {
    // 查询
    onSearch() {
      this.$refs.algorithmForm.validate((valid) => {
        if (valid) {
          this.AlgorithmPageData.page_offset = 1
          this.getAlgorithmsList()
        } else {
          return false
        }
      })
    },
    // 重置
    onClear() {
      this.$refs.algorithmForm.resetFields()
    },
    // 过滤无效参数
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
    // 获取算法列表
    getAlgorithmsList() {
      const { page_offset, page_size } = this.AlgorithmPageData
      const { ownerAgencyName = '', algorithmTitle = '' } =
        this.algorithmFilterData
      let params = this.handleParamsValid({ ownerAgencyName, algorithmTitle })
      params = {
        ...params,
        pageOffset: (page_offset - 1) * page_size,
        pageSize: page_size,
        algorithmType: 'PPC_MATCH'
      }
      this.algorithmLoading = true
      listAlgorithms(params)
        .then((response) => {
          this.algorithmLoading = false
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          const { total = 0, content = [] } = response.data
          console.log(content, total)
          this.AlgorithmTotal = total
          this.algorithmsList = content
        })
        .catch((_) => {
          this.algorithmLoading = false
        })
    },
    // 获取详情 动态生成下拉数据
    getAlgorithmDetailById(params) {
      const { algorithmVersion, algorithm_id } = params
      queryAlgorithmDetail(algorithm_id, algorithmVersion)
        .then((response) => {
          this.algorithmLoading = false
          if (!handleFetchResponseMsgBox(this, response, false)) {
            return
          }
          this.$refs.userInputForm.resetFields()
          const { matchModule = '' } = response.data
          try {
            const { ruleset = [] } = JSON.parse(matchModule)
            this.options = ruleset.map((v) => {
              return {
                key: v.field
              }
            })
          } catch (err) {
            this.$message({
              message: this.$t('job.index.jsonStringError'),
              type: 'error'
            })
          }
        })
        .catch((_) => {
          this.algorithmLoading = false
        })
    },
    // 分页切换
    AlgorithmPageDataPaginationHandle(pageData) {
      console.log(pageData, 'pageData')
      this.AlgorithmPageData = { ...pageData }
      this.getAlgorithmsList()
    },
    // 选择算法
    selectAlgorithm(seleted, row) {
      this.options = []
      this.$refs.userInputForm && this.$refs.userInputForm.resetFields()
      if (seleted) {
        this.selectedAlgorithm = { ...row }
        const { algorithmId, algorithmVersion } = row
        this.getAlgorithmDetailById({
          algorithm_id: algorithmId,
          algorithmVersion
        })
      } else {
        this.selectedAlgorithm = {}
      }
    },
    // 开始匹配
    startMatch() {
      this.$refs.userInputForm.validate((valid) => {
        if (valid) {
          console.log(this.userInputForm, 'userInputForm')
          const { selectedKeys } = this.userInputForm
          const validSelectedKeys = selectedKeys.filter(
            (key) => this.userInputForm[key]
          )
          const matchFields = validSelectedKeys.map((key) => {
            return {
              fieldName: key,
              plainValue: this.userInputForm[key],
              cipherValue: window.EncodeObject
                ? window.EncodeObject.encrypt_message(this.userInputForm[key])
                : ''
            }
          })
          const {
            algorithmId,
            algorithmVersion,
            algorithmType,
            algorithmTitle
          } = this.selectedAlgorithm
          this.creatMatchJob({
            matchFields,
            jobAlgorithm: {
              algorithmId,
              algorithmVersion,
              algorithmType
            },
            jobTitle: 'macth-' + algorithmTitle
          })
        } else {
          return false
        }
      })
    },
    creatMatchJob(params) {
      createMatch(params).then((response) => {
        if (!handleFetchResponseMsgBox(this, response, false)) {
          return
        }
        const { data = '' } = response
        this.$router.push({
          path: 'ciphertextMatchDetail',
          query: { jobId: data }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  padding-bottom: 40px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .bottom {
    text-align: center;
    padding: 20px 0;
  }
}
</style>
