<template>
  <div>
    <el-form
      ref="params"
      :model="params"
      :rules="rules"
      label-position="right"
      label-width="160px"
      class="from"
    >
      <el-form-item
        :label="$t('algorithm.algorithmTitle')"
        prop="algorithmTitle"
      >
        <el-input v-model="params.algorithmTitle" style="width: 80%" />
      </el-form-item>
      <el-form-item
        :label="$t('algorithm.algorithmVersion')"
        prop="algorithmVersion"
      >
        <el-input v-model="params.algorithmVersion" style="width: 80%" />
      </el-form-item>
      <el-form-item
        :label="$t('algorithm.algorithmDescription')"
        prop="algorithmDescription"
      >
        <el-input
          v-model="params.algorithmDescription"
          type="textarea"
          :autosize="{ minRows: 3 }"
          style="width: 80%"
        />
      </el-form-item>

      <el-form-item :label="$t('algorithm.algorithmType')" prop="algorithmType">
        <el-select
          v-model="params.algorithmType"
          :placeholder="$t('algorithm.rules.algorithmType')"
          style="width: 80%"
          @change="onAlgoTypeChange()"
        >
          <el-option label="PPC_SQL" value="PPC_SQL" />
          <el-option label="PPC_MPC" value="PPC_MPC" />
          <el-option label="PPC_TRAIN" value="PPC_TRAIN" />
          <el-option label="PPC_MATCH" value="PPC_MATCH" />
        </el-select>
      </el-form-item>

      <div v-if="params.algorithmType === 'PPC_SQL'">
        <el-form-item label="PPC_SQL">
          <el-input
            v-model="params.algorithmContent"
            type="textarea"
            :rows="5"
            :placeholder="$t('algorithm.sqlModulePlaceHolder')"
            style="width: 80%"
            @focus="onSqlFocus"
          />
        </el-form-item>
      </div>
      <div v-if="params.algorithmType === 'PPC_MPC'">
        <el-form-item :label="$t('algorithm.mpcModule')">
          <el-upload
            v-if="
              typeof params.algorithmContent === 'undefined' ||
                params.algorithmContent.length == 0
            "
            drag
            action
            accept=".ppc"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="uploadHandler"
            :auto-upload="true"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              {{ $t("algorithm.mpcModuleHelp") }}
              <em>{{ $t("algorithm.moduleUpload") }}</em>
            </div>
          </el-upload>
          <pre
            v-if="
              typeof params.algorithmContent !== 'undefined' &&
                params.algorithmContent.length > 0
            "
            v-highlightjs="params.algorithmContent"
            style="width: 80%; border: 1px solid #dcdfe6"
          >
              <code style="height:250px" class="python" />
          </pre>
          <el-upload
            v-if="
              typeof params.algorithmContent !== 'undefined' &&
                params.algorithmContent.length > 0
            "
            action
            accept=".ppc"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="uploadHandler"
            :auto-upload="true"
          >
            <el-button type="primary" size="small">{{
              $t("algorithm.moduleReupload")
            }}</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- FIXME: -->
      <div v-if="params.algorithmType === 'PPC_MATCH'">
        <el-form-item label="算法文件">
          <el-upload
            v-if="
              typeof params.algorithmContent === 'undefined' ||
                params.algorithmContent.length == 0
            "
            drag
            action
            accept=".json"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="uploadHandler"
            :auto-upload="true"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              {{ '将PPC_MATCH算法文件拖到此处，或' }}
              <em>{{ $t("algorithm.moduleUpload") }}</em>
            </div>
          </el-upload>
          <pre
            v-if="
              typeof params.algorithmContent !== 'undefined' &&
                params.algorithmContent.length > 0
            "
            v-highlightjs="params.algorithmContent"
            style="width: 80%; border: 1px solid #dcdfe6"
          >
              <code style="height:250px" class="python" />
          </pre>
          <el-upload
            v-if="
              typeof params.algorithmContent !== 'undefined' &&
                params.algorithmContent.length > 0
            "
            action
            accept=".json"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="uploadHandler"
            :auto-upload="true"
          >
            <el-button type="primary" size="small">{{
              $t("algorithm.moduleReupload")
            }}</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <div v-if="params.algorithmType === 'PPC_TRAIN'">
        <el-form-item
          :label="$t('algorithm.mpcTrainModule')"
          prop="algorithmContent"
        >
          <el-upload
            v-if="
              typeof params.algorithmContent === 'undefined' ||
                params.algorithmContent.length == 0
            "
            drag
            action
            accept=".json"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="uploadHandler"
            :auto-upload="true"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              {{ $t("algorithm.mpcTrainModuleHelp") }}
              <em>{{ $t("algorithm.moduleUpload") }}</em>
            </div>
          </el-upload>
          <el-input
            v-if="
              typeof params.algorithmContent !== 'undefined' &&
                params.algorithmContent.length > 0
            "
            v-model="params.algorithmContent"
            type="textarea"
            :rows="2"
            :autosize="uploadDataShowConfig"
            style="width: 80%"
          />
          <el-upload
            v-if="
              typeof params.algorithmContent !== 'undefined' &&
                params.algorithmContent.length > 0
            "
            action
            accept=".json"
            :show-file-list="false"
            :file-list="fileList"
            :http-request="uploadHandler"
            :auto-upload="true"
          >
            <el-button type="primary" size="small">{{
              $t("algorithm.moduleReupload")
            }}</el-button>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

import { handleOptResponseMsgBox } from '@/utils/messageBox'
import { uploadAlgorithm } from '@/api/algorithm'
import { getUsername } from '@/utils/auth'
import { Base64 } from 'js-base64'

export default {
  name: 'AlgorithmUpload',
  props: {
    algorithmlanguage: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      fileList: [],
      params: {
        algorithmTitle: '',
        algorithmDescription: '',
        algorithmVersion: '',
        algorithmContent: null,
        algorithmType: ''
      },
      uploadDataShowConfig: {
        minRows: 1, maxRows: 10
      },
      rules: {
        algorithmTitle: [
          { required: true, message: this.$t('algorithm.rules.algorithmTitle'), trigger: 'blur' }
        ],
        algorithmVersion: [
          { required: true, message: this.$t('algorithm.rules.algorithmVersion'), trigger: 'blur' }
        ],
        algorithmDescription: [
          { required: true, message: this.$t('algorithm.rules.algorithmDescription'), trigger: 'blur' }
        ],
        algorithmType: [
          { required: true, message: this.$t('algorithm.rules.algorithmType'), trigger: 'blur' }
        ],
        algorithmContent: [
          { required: true, message: this.$t('algorithm.rules.algorithmContent'), trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.params.userName = getUsername()
  },
  methods: {
    onAlgoTypeChange() {
      this.params.algorithmContent = ''
      this.$refs['params'].clearValidate()
    },
    onSqlFocus() {
      if (this.params.algorithmType === 'PPC_SQL') {
        if (!this.params.algorithmContent) {
          this.params.algorithmContent = 'select source0.field0 > source1.field0 from source0, source1 where source0.id = source1.id'
        }
      }
    },
    uploadHandler(params) {
      const reader = new FileReader()
      if (params.file.size > 1024 * 1024 * 8) { // 8M
        this.$message({
          message: this.$t('algorithm.uploadError'),
          type: 'error',
          duration: 5000
        })
      } else {
        reader.onload = (event) => {
          this.params.algorithmContent = event.target.result
        }
        reader.readAsText(params.file, 'UTF-8')
      }
    },
    onSubmit(onSuccess, onFail) {
      this.$refs['params'].validate((valid) => {
        if (valid) {
          var queryData = {
            algorithmTitle: this.params.algorithmTitle,
            algorithmDescription: this.params.algorithmDescription,
            algorithmVersion: this.params.algorithmVersion,
            algorithmType: this.params.algorithmType,
            algorithmContent: Base64.encode(this.params.algorithmContent) // encode with base64
          }
          this.$message(this.$t('common.uploading'))
          uploadAlgorithm(queryData).then(response => {
            if (handleOptResponseMsgBox(this, response, true)) {
              onSuccess && onSuccess()
            } else {
              onFail && onFail()
            }
          })
        } else {
          onFail && onFail()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload-dragger.dragger-ext {
  width: 80%;
}
</style>
