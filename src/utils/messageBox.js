import { MessageBox } from 'element-ui'
import Vue from 'vue'

export function handleOptResponseMsgBox(that, response, noticeSuccess, successMsg) {
  if (!response) {
    that.$alert(that.$t('common.nullResponse'), that.$t('common.runError') + '[ errorCode: 500 ]', {
      type: 'error',
      confirmButtonText: that.$t('common.confirm')
    })

    return false
  }

  if (response.errorCode !== 0) {
    that.$alert(response.message, that.$t('common.runError') + ' [ errorCode: ' + response.errorCode + ' ]', {
      type: 'error',
      confirmButtonText: that.$t('common.confirm')
    })
    return false
  }

  var msg = that.$t('common.success')
  if (successMsg) {
    msg = successMsg
  }

  if (noticeSuccess) {
    that.$message({
      showClose: true,
      message: msg,
      type: 'success',
      duration: 3000
    })
  }

  return true
}

export function handleFetchResponseMsgBox(that, response, noticeSuccess, successMsg) {
  if (!response) {
    that.$message({
      showClose: true,
      message: that.$t('common.nullResponse'),
      type: 'error',
      duration: 5000
    })
    return false
  }

  if (response.errorCode !== 0) {
    that.$message({
      showClose: true,
      message: '[ errorCode: ' + response.errorCode + ' ] ' + response.message,
      type: 'error',
      duration: 5000
    })
    return false
  }

  var msg = that.$t('common.success')
  if (successMsg) {
    msg = successMsg
  }

  if (noticeSuccess) {
    that.$message({
      showClose: true,
      message: msg,
      type: 'success',
      duration: 3000
    })
  }

  return true
}
/**
 * handle a long error message output
 * @param {string} message - set to msgBox's main body
 * @param {string} title - set to msgBox's title
 * @param {string} errorMessage - set to textarea, a long output
 * @param {Object|null} options - other msgBox options
 * @return {Promise}
 */
export function handleErrorMsgBox(message, title, errorMessage, options) {
  const vm = new Vue()
  const h = vm.$createElement
  return MessageBox({
    message: h('div', {
      style: {
        display: 'block',
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        width: '100%',
        height: '100%'
      }
    },
    [
      h('i', {
        style: {
          color: '#f56c6c',
          marginRight: '6px'
        },
        attrs: {
          class: 'el-icon-error'
        }
      }, ''),
      h('span', null, message),
      h('div', {
        style: { display: 'block' },
        attrs: {
        }
      }, [
        h('textarea', {
          attrs: {
            readonly: true
          },
          style: {
            color: '#606266',
            margin: '10px 0',
            padding: '8px 10px',
            height: 'auto',
            minHeight: '100px',
            maxHeight: '150px',
            overflow: 'auto',
            width: '100%',
            resize: 'none',
            fontSize: '15px',
            border: '0px'
          }
        }, errorMessage)
      ])
    ]),
    title: title,
    ...options
  })
}

/**
 * handle a long success message output
 * @param {string} message - set to msgBox's main body
 * @param {string} title - set to msgBox's title
 * @param {string} successMessage - set to textarea, a long output
 * @param {Object|null} options - other msgBox options
 * @return {Promise}
 */
export function handleSuccessMsgBox(message, title, successMessage, options) {
  const vm = new Vue()
  const h = vm.$createElement
  return MessageBox({
    message: h('div', {
      style: {
        display: 'block',
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        width: '100%'
      }
    },
    [
      h('i', {
        style: {
          color: '#67C23A',
          marginRight: '6px'
        },
        attrs: {
          class: 'el-icon-success'
        }
      }, ''),
      h('span', null, message),
      h('div', {
        style: { display: 'block' },
        attrs: {
        }
      }, [
        h('textarea', {
          attrs: {
            readonly: true
          },
          style: {
            color: '#606266',
            margin: '10px 0',
            padding: '8px 10px',
            height: 'auto',
            minHeight: '80px',
            maxHeight: '150px',
            overflow: 'auto',
            width: '100%',
            resize: 'none',
            fontSize: '15px',
            border: '0px'
          }
        }, successMessage)
      ])
    ]),
    title: title,
    ...options
  })
}

/**
 * handle a long warning message output
 * @param {string} message - set to msgBox's main body
 * @param {string} title - set to msgBox's title
 * @param {string} warningMessage - set to textarea, a long output
 * @param {Object|null} options - other msgBox options
 * @return {Promise}
 */
export function handleWarningMsgBox(message, title, warningMessage, options) {
  const vm = new Vue()
  const h = vm.$createElement
  return MessageBox({
    message: h('div', {
      style: {
        display: 'block',
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        width: '100%',
        height: '100%'
      }
    },
    [
      h('i', {
        style: {
          color: '#e6a23c',
          marginRight: '6px'
        },
        attrs: {
          class: 'el-icon-warning'
        }
      }, ''),
      h('span', null, message),
      h('div', {
        style: { display: 'block' },
        attrs: {
        }
      }, [
        h('textarea', {
          attrs: {
            readonly: true
          },
          style: {
            color: '#606266',
            margin: '10px 0',
            padding: '8px 10px',
            height: 'auto',
            minHeight: '100px',
            maxHeight: '150px',
            overflow: 'auto',
            width: '100%',
            resize: 'none',
            fontSize: '15px',
            border: '0px'
          }
        }, warningMessage)
      ])
    ]),
    title: title,
    ...options
  })
}
