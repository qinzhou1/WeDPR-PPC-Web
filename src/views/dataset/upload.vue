<template>
  <div>
    <el-form
      ref="paramsForm"
      :model="params"
      :rules="rules"
      label-position="right"
      label-width="200px"
    >
      <el-form-item :label="$t('dataset.datasetTitle')" prop="datasetTitle">
        <el-input
          v-model="params.datasetTitle"
          :placeholder="$t('dataset.datasetTitlePlaceHolder')"
          style="width: 70%"
        />
      </el-form-item>
      <el-form-item
        :label="$t('dataset.datasetDescription')"
        prop="datasetDescription"
      >
        <el-input
          v-model="params.datasetDescription"
          type="textarea"
          :autosize="{ minRows: 3 }"
          :placeholder="$t('dataset.datasetDescriptionPlaceHolder')"
          style="width: 70%"
        />
      </el-form-item>
      <el-form-item :label="$t('dataset.dataSourceType')" prop="dataSourceType">
        <el-select
          v-model="params.dataSourceType"
          :placeholder="$t('dataset.rules.dataSourceType')"
          style="width: 70%"
          @change="clearNotice()"
        >
          <el-option :label="$t('dataset.csvFile')" value="CSV" />
          <el-option :label="$t('common.database')" value="DB" />
          <el-option :label="$t('dataset.registerData')" value="LOCAL_PATH" />
          <el-option label="EXCEL文件" value="XLSX" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="params.dataSourceType === 'CSV'"
        :label="$t('dataset.userData')"
        prop="userData"
      >
        <el-upload
          v-if="
            typeof params.userData === 'undefined' ||
              params.userData.length === 0
          "
          drag
          action
          accept=".csv"
          :show-file-list="false"
          :file-list="fileList"
          :http-request="uploadHandler"
          :auto-upload="true"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            {{ $t("dataset.userDataHelp") }}
            <em>{{ $t("dataset.userDataUpload") }}</em>
          </div>
        </el-upload>
        <el-upload
          v-if="
            typeof params.userData !== 'undefined' && params.userData.length > 0
          "
          action
          accept=".csv"
          :show-file-list="true"
          :file-list="fileList"
          :http-request="uploadHandler"
          :auto-upload="true"
        >
          <el-button type="primary" size="small">{{
            $t("dataset.userDataReupload")
          }}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-if="params.dataSourceType === 'XLSX'"
        :label="$t('dataset.userData')"
        prop="userData"
      >
        <el-upload
          v-if="
            typeof params.userData === 'undefined' ||
              params.userData.length === 0
          "
          drag
          action
          accept=".xls,.xlsx"
          :show-file-list="false"
          :file-list="fileList"
          :http-request="uploadHandlerXlxs"
          :auto-upload="true"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将excel文件拖到此处，
            <em>{{ $t("dataset.userDataUpload") }}</em>
          </div>
        </el-upload>
        <el-upload
          v-if="
            typeof params.userData !== 'undefined' && params.userData.length > 0
          "
          action
          accept=".xls,.xlsx"
          :show-file-list="true"
          :file-list="fileList"
          :http-request="uploadHandler"
          :auto-upload="true"
        >
          <el-button type="primary" size="small">{{
            $t("dataset.userDataReupload")
          }}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="params.dataSourceType === 'DB'" prop="dbType" label="数据库类型">
        <el-select
          v-model="params.dbType"
          placeholder="请选择数据库类型"
          style="width: 70%"
          @change="handleDbTypeChange"
        >
          <el-option label="MYSQL" value="MYSQL" />
          <el-option label="达梦" value="DM" />
          <el-option label="ORACLE" value="ORACLE" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="params.dataSourceType === 'DB'"
        prop="ip"
        :label="$t('dataset.dbInfo')"
      >
        <el-input
          v-model="params.ip"
          :placeholder="$t('dataset.rules.ip')"
          style="width: 70%"
        >
          <template slot="prepend">IP</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="params.dataSourceType === 'DB'" prop="port">
        <el-input
          v-model="params.port"
          :placeholder="$t('dataset.rules.port')"
          style="width: 70%"
        >
          <template slot="prepend">{{ $t("common.port") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="params.dataSourceType === 'DB'" prop="databaseName">
        <el-input
          v-model="params.databaseName"
          :placeholder="dbNamePlaceholder"
          style="width: 70%"
        >
          <template slot="prepend">{{ $t("dataset.dbName") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="params.dataSourceType === 'DB'" prop="userName">
        <el-input
          v-model="params.userName"
          :placeholder="$t('dataset.rules.userName')"
          style="width: 70%"
        >
          <template slot="prepend">{{ $t("user.username") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="params.dataSourceType === 'DB'" prop="password">
        <el-input
          v-model="params.password"
          :placeholder="$t('dataset.rules.password')"
          show-password
          style="width: 70%"
        >
          <template slot="prepend">{{ $t("user.password") }}</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="params.dataSourceType === 'DB'" prop="sql">
        <el-input
          v-model="params.sql"
          :placeholder="dbPlaceholder"
          type="textarea"
          :autosize="{ minRows: 4 }"
          style="width: 70%"
          @focus="onSqlFocus"
        />
      </el-form-item>
      <el-form-item
        v-if="params.dataSourceType === 'LOCAL_PATH'"
        prop="filePath"
        :label="$t('dataset.filePath')"
      >
        <el-input
          v-model="params.filePath"
          :placeholder="$t('dataset.rules.filePath')"
          style="width: 70%"
        />
      </el-form-item>
      <el-form-item
        v-if="params.dataSourceType === 'DB'"
        label="是否即时读取"
        prop="isInstant"
      >
        <el-select
          v-model="params.isInstant"
          placeholder="请选择即时读取数据来源"
          style="width: 70%"
        >
          <el-option label="不即时读取" :value="0" />
          <!-- <el-option label="从文件路径即时读取" :value="1" /> -->
          <el-option label="从数据库即时读取" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否需要加密为密文匹配数据集（默认不加密）"
        label-width="350px"
        prop="hasEncryptForCEM"
      >
        <el-switch v-model="params.hasEncryptForCEM" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { handleOptResponseMsgBox } from '@/utils/messageBox'
import { uploadDataset } from '@/api/dataset'
import { Base64 } from 'js-base64'
export default {
  name: 'DatasetUpload',
  props: {},
  data() {
    return {
      fileList: [],
      params: {
        dataSourceType: '',
        datasetTitle: '',
        datasetDescription: '',
        userData: '',
        datasetSize: 0,
        filePath: '',
        hasEncryptForCEM: false,
        isInstant: 0,
        dbType: 'MYSQL',
        ip: '',
        port: '',
        databaseName: '',
        userName: '',
        password: '',
        sql: ''
      },
      dbPlaceholder: this.$t('dataset.rules.sql'),
      dbNamePlaceholder: this.$t('dataset.rules.databaseName'),
      rules: {
        dataSourceType: [
          {
            required: true,
            message: this.$t('dataset.rules.dataSourceType'),
            trigger: 'blur'
          }
        ],
        datasetTitle: [
          {
            required: true,
            message: this.$t('dataset.rules.datasetTitle'),
            trigger: 'blur'
          }
        ],
        datasetDescription: [
          {
            required: true,
            message: this.$t('dataset.rules.datasetDescription'),
            trigger: 'blur'
          }
        ],
        userData: [
          {
            required: true,
            message: this.$t('dataset.rules.userData'),
            trigger: 'change'
          }
        ],
        hasEncryptForCEM: [
          { required: true, message: '请选择是否需要加密', trigger: 'change' }
        ],
        ip: [
          {
            required: true,
            message: this.$t('dataset.rules.ip'),
            trigger: 'blur'
          }
        ],
        port: [
          {
            required: true,
            message: this.$t('dataset.rules.port'),
            trigger: 'blur'
          }
        ],
        databaseName: [
          {
            required: true,
            message: this.$t('dataset.rules.databaseName'),
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: this.$t('dataset.rules.userName'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('dataset.rules.password'),
            trigger: 'blur'
          }
        ],
        sql: [
          {
            required: true,
            message: '请输入sql语句查询数据集',
            trigger: 'blur'
          }
        ],
        filePath: [
          {
            required: true,
            message: this.$t('dataset.rules.filePath'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  methods: {
    handleDbTypeChange() {
      const resetDbParams = {
        ip: '',
        port: '',
        databaseName: '',
        userName: '',
        password: '',
        sql: ''
      }
      this.params = { ...this.params, ...resetDbParams }
      const { dbType } = this.params
      switch (dbType) {
        case 'MYSQL':
          this.dbNamePlaceholder = this.$t('dataset.rules.databaseName')
          this.dbPlaceholder = this.$t('dataset.rules.sql')
          break
        case 'ORACLE':
          this.dbNamePlaceholder = '请输入Oracle SID'
          this.dbPlaceholder = '请输入SQL语句查询数据集，支持标准的Oracle SQL语句，示例：\nselect id, x1, x2 from test'
          break
        case 'DM':
          this.dbNamePlaceholder = '请输入schema名称'
          this.dbPlaceholder = '请输入SQL语句查询数据集，支持标准的达梦数据库 SQL语句，示例：\nselect id, x1, x2 from'
          break
        default:
          break
      }
    },
    clearNotice() {
      this.$refs['paramsForm'] && this.$refs['paramsForm'].clearValidate()
    },
    onSqlFocus() {
      if (!this.params.sql) {
        const { dbType } = this.params
        switch (dbType) {
          case 'MYSQL':
            this.params.sql = 'select id, x1, x2 from test'
            break
          case 'ORACLE':
            this.params.sql = 'select id, x1, x2 from test'
            break
          case 'DM':
            this.params.sql = 'select id, x1, x2 from test'
            break
          default:
            break
        }
      }
    },
    uploadHandler(params) {
      console.log(params, 'params')
      const reader = new FileReader()
      if (params.file.size > 1024 * 1024 * 8) {
        // 8M
        this.$message({
          message: this.$t('dataset.uploadError'),
          type: 'error',
          duration: 5000
        })
      } else {
        reader.onload = (event) => {
          this.params.userData = event.target.result
        }
        this.fileList = [{ name: params.file.name }]
        reader.readAsText(params.file, 'UTF-8')
        this.params.datasetSize = params.file.size
      }
    },
    uploadHandlerXlxs(params) {
      const that = this
      const reader = new FileReader()
      if (params.file.size > 1024 * 1024 * 8) {
        // 8M
        this.$message({
          message: this.$t('dataset.uploadError'),
          type: 'error',
          duration: 5000
        })
      } else {
        reader.onload = (event) => {
          const data = event.target.result
          that.params.userData = data.split('base64,')[1]
        }
        reader.readAsDataURL(params.file)
        this.fileList = [{ name: params.file.name }]
        this.params.datasetSize = params.file.size
      }
    },

    onSubmit(onSuccess, onFail) {
      this.$refs.paramsForm.validate((valid) => {
        if (valid) {
          var queryData = {
            datasetTitle: this.params.datasetTitle,
            datasetDescription: this.params.datasetDescription,
            hasEncryptForCEM: this.params.hasEncryptForCEM
          }
          if (this.params.dataSourceType === 'CSV') {
            queryData.dataSourceType = 'CSV'
            queryData.datasetContent = Base64.encode(this.params.userData) // encode with base64
            queryData.datasetSize = this.params.datasetSize
          } else if (this.params.dataSourceType === 'XLSX') {
            queryData.dataSourceType = 'XLSX'
            queryData.datasetContent = this.params.userData // encode with base64
            queryData.datasetSize = this.params.datasetSize
          } else if (this.params.dataSourceType === 'DB') {
            queryData.dbType = this.params.dbType
            queryData.isInstant = this.params.isInstant
            queryData.dataSourceType = 'DB'
            queryData.ip = this.params.ip
            queryData.port = Number(this.params.port)
            queryData.databaseName = this.params.databaseName
            queryData.userName = this.params.userName
            queryData.password = this.params.password
            queryData.sql = this.params.sql
          } else if (this.params.dataSourceType === 'LOCAL_PATH') {
            queryData.dataSourceType = 'LOCAL_PATH'
            queryData.filePath = this.params.filePath
          }
          this.$message(this.$t('common.uploading'))

          uploadDataset(queryData).then((response) => {
            if (handleOptResponseMsgBox(this, response, true)) {
              onSuccess && onSuccess()
            } else {
              onFail && onFail()
            }
          }).catch(() => {
            onFail && onFail()
          })
        } else {
          onFail && onFail()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.el-upload-dragger.dragger-ext {
  width: 100%;
}
.el-input-group__prepend {
  width: 110px;
}
.form {
  margin-bottom: 0px;
  .el-form-item {
    margin-bottom: 25px;
  }
  .el-input {
    margin-right: 10px;
    width: 100%;
  }
}
</style>
