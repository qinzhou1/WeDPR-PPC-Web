export const ADMIN_PERMISSIONS = 'ADMIN_PERMISSIONS'

export const PermissionGroup = {
  AGENCY_GROUP: 'AGENCY_GROUP',
  DATA_GROUP: 'DATA_GROUP',
  ALGO_GROUP: 'ALGO_GROUP',
  JOB_GROUP: 'JOB_GROUP'
}

export const AgencyGroup = {
  LIST_AGENCY: 'LIST_AGENCY',
  WRITE_AGENCY: 'WRITE_AGENCY'
}

export const DataGroup = {
  LIST_DATA: 'LIST_DATA',
  READ_DATA_PUBLIC_INFO: 'READ_DATA_PUBLIC_INFO',
  READ_DATA_PRIVATE_INFO: 'READ_DATA_PRIVATE_INFO',
  WRITE_DATA: 'WRITE_DATA'
}

export const AlgoGroup = {
  LIST_ALGO: 'LIST_ALGO',
  READ_ALGO: 'READ_ALGO',
  WRITE_ALGO: 'WRITE_ALGO'
}

export const JobGroup = {
  LIST_JOB: 'LIST_JOB',
  READ_JOB_PUBLIC_INFO: 'READ_JOB_PUBLIC_INFO',
  READ_JOB_PRIVATE_INFO: 'READ_JOB_PRIVATE_INFO',
  WRITE_JOB: 'WRITE_JOB'
}

export function check_permission() {
  var permissions = arguments[0]
  if (!permissions) {
    return false
  }

  if (permissions.includes(ADMIN_PERMISSIONS)) {
    return true
  }
  var needed_permission_group = arguments[1]
  if (permissions.includes(needed_permission_group)) {
    return true
  }
  for (var i = 2; i < arguments.length; i++) {
    if (permissions.includes(arguments[i])) {
      return true
    }
  }
  return false
}
