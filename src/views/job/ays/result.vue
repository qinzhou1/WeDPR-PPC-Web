<template>
  <div>
    <el-row type="flex" justify="left" style="margin-top: 10px">
      <el-button icon="el-icon-back" @click="stepBack">{{
        $t("ays.data.last")
      }}</el-button>
    </el-row>

    <el-form label-position="right" label-width="120px" class="form">
      <el-form-item size="medium" />
      <el-form-item size="medium">
        <span>{{ $t('ays.result.sourceName') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ datasetTitle }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.searchTime') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ createTime | formatDate }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.index.searchAgency') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ agencyName }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.create.searchFileds') }}</span>
        <span>{{ ":" }}</span>
        <span>{{ searchField }}</span>
      </el-form-item>

      <el-form-item size="medium">
        <span>{{ $t('ays.job.createUser') }}</span>
        <span>{{ ": " }}</span>
        <span>{{ jobCreator }}</span>
      </el-form-item>
    </el-form>

    <el-card>
      <el-row>
        <el-tabs>
          <el-tab-pane :label="$t('ays.result.index')">
            <el-table ref="jobTable" tooltip-effect="light" :data="jobResult" fit stripe style="width: 100%">
              <el-table-column show-overflow-tooltip prop="searchId" :label="$t('ays.result.searchId')" />
              <el-table-column show-overflow-tooltip prop="searchDetail" :label="$t('ays.result.index')" />
              <!-- <el-table-column show-overflow-tooltip prop="obfuscationList" :label="$t('ays.result.obsOrder')" /> -->
            </el-table>
          </el-tab-pane>
        </el-tabs>

      </el-row>
    </el-card>

    <!--
    <el-card shadow="never" style="width: 90%">
      <div slot="header" class="clearfix">
        <span>
          <b>{{ $t("ays.result.index") }}</b>
        </span>
      </div>
      <el-tooltip effect="light" :content="$t('common.tableLimitation')" placement="top">
        <el-table ref="dynamicTable" :data="aysTableResult" fit stripe max-height="600">
          <template v-for="col in aysTableResult.resultTableFileds">
            <el-table-column :key="resultTableFileds.dataItem" :show-overflow-tooltip="true" :prop="resultTableData.dataItem"
              :label="col.dataName" />
          </template>
        </el-table>
      </el-tooltip>
    </el-card> -->

  </div>

</template>

<script>
import { parseTime } from '@/utils'
import { queryAysJobsResult } from '@/api/ays'
export default {
  name: 'AysResult',
  filters: {
    formatDate(time) {
      if (time <= 0) {
        return '-'
      }
      const date = new Date(time)
      return parseTime(date, '{y}-{m}-{d}')
    }
  },
  props: {
    // receiverId: null,
    // agencyId: null,
    // agencyName: null,
    // jobId: null,
    // datasetTitle: null,
    // recordCount: null,
    // columnCount: null,
    // datasetFields: null,
    // createTime: null
  },
  data() {
    return {

      jobResult: [],
      aysTableResult: {
        resultTableFileds: [],
        resultTableData: {
        }
      }

    }
  },
  // watch: {
  //   jobid() {
  //     this.onCreate()
  //   }
  // },
  created() {
    this.onCreate()
  },

  methods: {
    onCreate() {
      this.jobId = this.$route.query.jobId
      this.receiverId = this.$route.query.receiverId
      this.agencyId = this.$route.query.agencyId
      this.agencyName = this.$route.query.agencyName
      this.datasetTitle = this.$route.query.datasetTitle
      this.createTime = parseInt(this.$route.query.createTime)
      this.datasetFields = this.$route.query.datasetFields
      this.jobCreator = this.$route.query.jobCreator
      this.searchField = this.$route.query.searchField

      this.fetchResult(this.datasetTitle)
    },
    // changeDataToTable(datasetFields, resultData) {
    //   if (typeof (datasetFields) === 'undefined' || datasetFields === null) {
    //     return null
    //   }
    //   if (typeof (resultData) === 'undefined' || resultData === null) {
    //     return null
    //   }
    //   const filedArray = datasetFields.split(" ")

    // },
    stepBack() {
      this.$router.go(-1)
    },
    fetchResult() {
      queryAysJobsResult(this.jobId).then(response => {
        this.jobResult = response.data.detail
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

.form {
  margin-bottom: 10px;

  .el-form-item {
    margin-bottom: 3px;
  }
}
</style>
