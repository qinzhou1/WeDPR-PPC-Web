module.exports = {
  common: {
    title: 'WeDPR-PPC',
    yes: 'Yes',
    no: 'No',
    undefined: 'Undefined',
    undefinedError: 'Undefined error',
    nullResponse: 'The request was not responded',
    abnormal: 'Abnormal',
    networkError: 'Network error',
    runError: 'Execution error', // 执行错误
    success: 'Success',
    error: 'Error',
    tip: 'Tip',
    confirm: 'Confirm',
    cancel: 'Cancel',
    operation: 'Operation',
    choose: 'Select',
    add: 'Add',
    remove: 'Remove',
    update: 'Update',
    name: 'Name',
    tableLimitation: 'Displaying at most first 5 records',
    database: 'Database',
    port: 'Port',
    ownerUserName: 'Owner',
    jobCreator: 'Job Creator',
    issue: 'Issues',
    uploading: 'Uploading, please wait',
    preTip: '[Required] Notes',
    preNotice: 'Do not upload violation data',
    edit: 'Edit'
  },
  status: {
    yes: 'YES',
    no: 'NO',
    normal: 'NORMAL',
    abnormal: 'ERROR',
    notStarted: 'NOT STARTED',
    toBeAuthorized: 'AUTH PENDING',
    waiting: 'WAITING',
    running: 'RUNNING',
    success: 'SUCCESS',
    failure: 'FAILURE',
    pending: 'PENDING',
    approved: 'APPROVED',
    rejected: 'REJECTED',
    revoked: 'REVOKED',
    submitted: 'SUBMITTED'
  },
  index: {
    homepage: 'Homepage',
    agencyManager: 'Agency Management',
    datasetManager: 'Dataset Management', // 数据管理
    authManager: 'Authorization Management', // 授权管理
    algorithmManager: 'Algorithm Management', // 算法管理
    datasetJob: 'Participant Job',
    algorithmJob: 'Participant Job',
    jobManager: 'Job Management', // 任务管理
    newJob: 'New Job', // 新建任务
    document: 'Help', // 参考文档
    jobControl: 'Job Control',
    JobAys: 'PIR',
    jobPsi: 'PSI',
    jobPredict: 'Union Predict',
    jobJoint: 'Table Joint',
    jobMpc: 'Compute',
    aysNew: 'Search',
    requestAuth: 'Request Authorization',
    combineModelSet: 'Joint modeling',
    combineModelSetDetail: 'Result',
    combineModelSetCreate: 'Start modeling',
    combineModelSetResult: 'Variable weight',
    combineModelSetParamSet: 'Set parameters',
    combinePredict: 'Joint predict',
    combinePredictDetail: 'Result',
    combinePredictCreate: 'Start predict',
    combinePredictResult: 'Predict result',
    inflJudge: 'Model evaluation'
  },
  controller: {
    date: 'Date',
    startDate: 'Start Date', // 开始日期
    endDate: 'End Date', // 结束日期
    to: 'to',
    clear: 'Clear',
    lastWeek: 'Last Week', // 最近一周
    lastMonth: 'Last Month', // 最近一个月
    last3months: 'Last 3 Months' // 最近三个月
  },
  user: {
    email: 'Email',
    emailCode: 'Email Code',
    getEmailCode: 'Send',
    userRole: 'Role',
    admin: 'Admin',
    superAdmin: 'Super Admin',
    dataProvider: 'Data Provider',
    algoProvider: 'Algorithm Provider',
    dataConsumer: 'Data Consumer',
    testUser: 'Test User',
    ownerAgency: 'Agency ID',
    ownerAgencyName: 'Agency Name',
    invitedAgencyId: 'Invited Agency ID',
    personalSig: 'Personal Signature',
    invitationCode: 'Invitation Code',
    availableTimes: 'Available Times',
    user: 'Individual Center',
    login: 'Login',
    register: 'Register',
    loginWelcome: 'Welcome',
    registerWelcome: 'Welcome',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    authCode: 'Captcha Code',
    changePassword: 'Change Password',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm New Password',
    logout: 'Logout',
    loginTip: 'Not registered yet?', // 还没有账号？
    registerTip: 'Has an account?', // 已有账号？
    deleteAccount: 'Delete Account',
    confirmDeleteAccount: 'Confirm Delete',
    rules: {
      invitationCode: 'Please enter invitation code',
      availableTimes: 'Invalid available times, 1-128 is ok',
      role: 'Please choose user role',
      username: 'Please enter username', // 请输入用户名
      password: 'Please enter password', // 请输入密码
      invalidUsername: 'Invalid username',
      invalidPassword: 'Invalid password',
      confirmPassword: 'Please confirm password', // 请再次输入密码
      diffPassword: 'Those passwords did not match', // 两次输入密码不一致
      authCode: 'Please enter the number and letter in the picture', // 请输入验证码
      oldPassword: 'Please enter the old password',
      newPassword: 'Please enter the new password'
    },
    tooltip: {
      username: 'Username must be between 3 and 18 characters long, with digits, letter, _, - only', // 用户名长度3～18个字符，支持数字、大小写字母、下划线_、连接符-
      password: 'Password must be between 6 and 18 characters long, containing at least 1 digit and 1 letter', // 密码长度6~18个字符，支持数字、大小写字母、特殊字符~!@#$%^&*()，至少包含一个数字和字母
      availableTimes: 'Available times of invitation code, 1-128 is ok'
    },
    message: {
      invalid: 'Invalid username or password. Please try again', // 用户名或密码无效，请重新输入
      success: 'Registration succeeded! Please login', // 注册成功! 请登录
      invalidRequest: 'Invalid Request', // 无效的参数请求
      existedAccount: 'Username has been used', // 账户已经存在
      expiredAuthCode: 'Captcha expired', // 验证码过期
      createFailed: 'Registration failed!', // 创建新账户失败
      invalidParameters: 'Invalid parameters',
      accountError: 'Account or password error',
      passwordError: 'Error password',
      authTokenNotMatch: 'Captcha error',
      tokenError: 'Token and username do not match',
      loginError: 'Login failed',
      newPwdAgain: 'Please entry the new password again',
      differentPasswords: 'Two new passwords are inconsistent',
      changePwdSuccess: 'Change password successfully, please login again'
    }
  },
  homepage: {
    unit: '',
    jobCount: 'Total Jobs',
    initiatedJobs: 'Created Jobs', // 发起任务数
    jobFinishCount: 'Finished Jobs',
    receivedJobs: 'Participating Jobs', // 接收任务数
    runningJobs: 'Running Jobs', // 运行中任务数
    algorithms: 'Total Algorithms', // 算法数
    myAlgorithms: 'My Algorithms', // 本方算法数
    datasets: 'Total Datasets', // 数据集
    myDatasets: 'Datasets', // 本方数据集
    agencyCount: 'Agencies',
    serviceName: 'Service Name', // 服务名称
    serviceDescription: 'Description', // 服务描述
    serviceStatus: 'Status', // 服务状态
    serviceNames: {
      authService: 'Account Service', // 注册认证服务
      managerService: 'Manager Service' // 管理服务
    }
  },
  agency: {
    agencyId: 'Agency ID',
    agencyName: 'Agency Name',
    searchButtonName: 'Search',
    agencyNamePlaceHolder: 'Please Enter Agency Name',
    description: 'Description',
    isComputationProvider: 'Is Computation Provider',
    gatewayUrl: 'Gateway',
    managementUrl: 'Management Service Url',
    gatewayUrlPlaceHolder: 'Please Enter Gateway',
    selfAgency: 'Agency List',
    agencyList: 'Other Agencies',
    nodeIp: 'Node IP',
    nodePort: 'Node Port',
    publicKey: 'Public Key',
    addTime: 'Add Time',
    registerTime: 'Register Time',
    tooltip: {
      add: 'The registration information of this agency has changed. Please update.'
    },
    message: {
      extra: 'Extra',
      confirmAddAsk: 'Confirm to add this agency?',
      confirmUpdateAsk: 'Confirm to update this agency?',
      confirmRemoveAsk: 'Confirm to remove this agency?'
    }
  },
  algorithm: {
    confirmAlgorithm: 'Confirm the algorithm',
    algorithmVersion: 'Algorithm Version',
    algorithmId: 'Algorithm ID', // 算法ID
    algorithmTitle: 'Title', // 算法标题
    algorithmTitlePlaceHolder: 'Please enter algorithm title', // 请输入算法标题
    algorithmDescription: 'Description', // 算法描述
    algorithmDescriptionPlaceHolder: 'Please enter algorithm description', // 请输入算法描述
    algorithmInfo: 'Details', // 算法信息
    algorithmCreation: 'Create algorithm', // 新建算法
    algorithmSearching: 'Search', // 搜索
    algorithmType: 'Type',
    algorithmSubtype: 'Subtype',
    layers: 'Layers',
    participantAgency: 'Participant Agency',
    inputCount: 'Needed Participants',
    ownerAgencyName: 'Agency Name', // 机构名称
    ownerAgencyId: 'Agency ID', // 机构ID
    modelId: 'Model ID',
    modelVersion: 'Model Version',
    guestId: 'Guest ID',
    hostId: 'Host ID',
    guestDatasetId: 'Guest Dataset ID',
    hostDatasetId: 'Host Dataset ID',
    ownerAgencyNamePlaceHolder: 'Please enter agency name', // 请输入机构名称
    ownerAgency: 'My Agency', // 本机构
    allAgency: 'All Agencies', // 所有机构
    createTime: 'Upload Time', // 上传时间
    detail: 'Details', // 详情
    jobs: 'Jobs', // 任务
    userName: 'Upload User', // 上传用户
    mpcModule: 'MPC File',
    mpcFlowModule: 'MPC Flow File',
    mpcTrainModule: 'MPC Train Config',
    mpcModelModule: 'MPC Model Config',
    fateModule: 'FATE Config',
    fateTraining: 'FATE-TRAINING',
    fatePrediction: 'FATE-PREDICTION',
    psu: 'Joint-Union',
    tpsi: 'Two-PSI',
    mpsi: 'Multi-PSI',
    deleteAlgo: 'Delete Algorithm',
    deleteChecking: 'Delete the Algorithm',
    sqlModulePlaceHolder: 'Please enter the algorithm formed as SQL, for example:\nselect source0.field0 > source1.field0 from source0, source1 where source0.id = source1.id', // 请输入PPC-SQL
    mpcModuleHelp: 'Please drag MPC algorithm file here，or',
    mpcFlowModuleHelp: 'Please drag MPC algorithm config file here，or',
    fateModuleHelp: 'Please drag FATE file here，or',
    mpcTrainModuleHelp: 'Please drag ai mpc file here，or',
    moduleUpload: 'Upload', // 点击上传
    moduleReupload: 'Re-upload', // 重新上传
    uploadError: 'Error: File size exceeds 8M', // 错误：文件大小超过8M
    rules: {
      algorithmTitle: 'Algorithm title cannot be empty', // 算法标题不能为空
      algorithmDescription: 'Algorithm description cannot be empty', // 算法描述不能为空
      algorithmVersion: 'Algorithm version cannot be empty',
      algorithmType: 'Please select algorithm language', // 请选择算法语言
      algorithmDraft: 'Algorithm content Cannot be empty' // 不能为空
    },
    sourceIndex: 'Source Index',
    sourceIndexTip: '. The "source0" described in mpc algorithm must be the input of result receiver, and the others depend on the order in which they are added.'
  },
  dataset: {
    limitedAuth: 'Limited Auth',
    allAuth: 'Auth All',
    batchedOp: 'Batched Operation',
    requestAuth: 'Request Authorization',
    originAlgorithm: 'System Algorithm',
    userAlgorithm: 'User Algorithm',
    chooseAlgorithm: 'Select Algorithms',
    authAgency: 'Please select agency',
    authExpiredTime: 'Please select expired time',
    registerData: 'File Path',
    filePath: 'File Path',
    local: 'Local',
    remote: 'Remote',
    jobId: 'Job ID', // 任务ID
    jobTitle: 'Title', // 任务标题
    jobTitlePlaceHolder: 'Please enter job title', // 请输入任务标题
    jobDescription: 'Description', // 任务描述
    requesterAgencyId: 'Requester Agency ID', // 请求机构ID
    requesterAgencyName: 'Requester Agency Name', // 请求机构名称
    requesterAgencyNamePlaceHolder: 'Please enter requester agency name', // 请输入机构名称
    authList: 'Authorization List',
    authStatus: 'Authorization Status', // 授权状态
    authStatusPlaceHolder: 'Please select authorization status', // 请选择授权状态
    authorizationDate: 'Authority Term', // 授权请求时间
    approveTime: 'Approve Time', // 授权生效时间
    approveOperation: 'Operations', // 授权操作
    datasetId: 'Dataset ID', // 数据集ID
    datasetTitle: 'Dataset Title', // 数据集标题
    datasetTitlePlaceHolder: 'Please enter dataset title', // 请输入数据集标题
    datasetSearching: 'Search', // 搜索
    ownerAgencyId: 'Agency ID', // 机构ID
    ownerAgencyName: 'Agency Name', // 机构名称
    ownerAgencyNamePlaceHolder: 'please enter agency name', // 请输入机构名称
    createTime: 'Upload Time', // 上传时间
    datasetFields: 'Dataset Fields', // 数据集字段
    rowCount: 'Record Count', // 数据集记录数
    columnCount: 'Column Count',
    datasetSize: 'Dataset size', // 数据集大小
    datasetSizeUnit: 'bytes', // 字节
    datasetHash: 'Version Hash', // 版本哈希
    dataFileLink: 'Download Link', // 下载链接
    datasetDescription: 'Dataset Description', // 数据集描述
    datasetDescriptionPlaceHolder: 'Please enter dataset description', // 请输入数据集描述
    dataSourceType: 'Data Source Type',
    datasetDetails: 'Dataset Details', // 数据集明细
    ownerAgency: 'My Agency', // 本机构
    allAgency: 'All Agencies', // 所有机构
    operation: 'Operation', // 操作
    details: 'Details', // 详情
    jobs: 'Jobs', // 任务
    storagePath: 'Storage Path',
    storageType: 'Dataset Type',
    dataDetailDialog: 'Dataset Details', // 数据集信息
    uploadDialog: 'Upload Dataset', // 上传数据集
    userData: 'Dataset File', // 数据集文件
    csvFile: 'CSV File',
    userDataHelp: 'Drag CSV file here, or', // 将csv文件拖到此处，或
    userDataUpload: 'Click Upload', // 点击上传
    userDataReupload: 'Re-upload', // 重新上传
    uploadError: 'Error: File size exceeds 8M', // 错误：文件大小超过8M
    auth: 'Authorization Management', // 授权管理
    dbInfo: 'Database Info',
    dbName: 'Database',
    selectAgency: 'Select Agency',
    operationChecking: {
      approve: 'Grant', // 同意
      approveChecking: 'Grant authorization?', // 同意数据授权请求？
      reject: 'Reject', // 拒绝
      rejectChecking: 'Reject the request?', // 拒绝数据授权请求？
      revoke: 'Revoke', // 撤销
      revokeChecking: 'Revoke the authorization?', // 撤销数据授权请求？
      remove: 'Delete', // 删除数据集
      deleteChecking: 'Delete the dataset', // 删除数据集？
      checking: 'Attention' // 提示
    },
    rules: {
      filePath: 'Please enter the absolute path of the file in the management server, /dataset/{username}/{filename}',
      datasetTitle: 'Please enter dataset title', // 请输入数据集标题
      dataSourceType: 'Please select data source type',
      datasetDescription: 'Please enter dataset description', // 请输入数据集描述
      userData: 'Please select dataset file', // 请选择数据集文件
      ip: 'Please enter IP',
      port: 'Please enter Port',
      databaseName: 'Please enter database name',
      userName: 'Please enter username',
      password: 'Please enter password',
      sql: 'Please enter SQL, for example:\nselect id, x1, x2 from test'
    },
    waitAuth: 'Waiting authority List',
    waitAuthorizationDate: 'Authorization Date',
    waitAuthTips: 'Other agencies obtain this dataset\'s request'
  },
  job: {
    jobId: 'Job ID',
    jobTitle: 'Job Title',
    jobModelType: 'Model type',
    jobTitleTip: 'Please enter job title',
    jobSetting: 'Job setting',
    predictType: 'Predict type',
    selectPredictType: 'Please enter predict type',
    jobModelAlgTypeTips: 'Please select algorithm',
    jobAlgSettingTips: 'Please select algorithm setting',
    jobModelTypeTips: 'Please enter model type',
    initiatedAgencyId: 'Initiated Agency ID',
    initiatedAgencyName: 'Initiated Agency Name',
    receivedResultAgencyName: 'Result Receiver',
    jobDescription: 'Description', // 任务描述
    jobDescriptionTip: 'Please enter job description', // 请输入任务描述
    jobPriority: 'Priority', // 任务优先级
    highPriority: 'High',
    mediumPriority: 'Medium',
    lowPriority: 'Low',
    createTime: 'Create Time', // 创建时间
    allAuthStatus: 'All Dataset Access Granted', // 所有数据集已授权
    jobStatus: 'Job Status', // 任务状态
    deleteJob: 'Delete Job',
    deleteChecking: 'Delete the Job',
    filter: {
      search: 'Search',
      clear: 'Clear',
      username: 'Username', // 用户名
      usernameTip: 'Please enter the username', // 请输入用户名
      ownerAgencyNameTip: 'Please enter agency name', // 请输入机构名称
      ownerAlgoTitleTip: 'Please enter algorithm title', // 请输入算法集标题
      ownerDatasetTitleTip: 'Please enter dataset title', // 请输入数据集标题
      creatorTip: 'Please enter job creator',
      receiverTip: 'Please enter result receiver'
    },
    index: {
      psiButtonName: 'Create Psi Job',
      deployResultTip: 'Please click on the result bar to see the status of task execution',
      statusTip: 'Some of input dataset authorization request pending. You can run the job only after all dataset access are granted', // 部分数据集未授权，获得所有数据集授权后才可运行该任务
      operation: 'Operation', // 操作
      reoperation: 'Modify parameters and rerun',
      run: 'Run',
      rerun: 'Rerun',
      deploy: 'Deploy',
      killJob: 'Terminate',
      confirmKill: 'Confirm to terminate the job?',
      detail: 'Detail', // 详情
      result: 'Result',
      searchButtonName: 'Search',
      createButtonName: 'New Job', // 新建任务
      confirmRun: 'Confirm to run the job?', // 确认运行任务？
      confirmDeploy: 'Confirm to deploy?',
      confirmRerun: 'Confirm to rerun the job?',
      runTip: 'Job is running. Please wait for the results', // 任务已开始运行，请查看任务状态，等待执行结果
      deployTip: 'Please check the status and wait for the results',
      killTip: 'Job has been terminated',
      dataProviderAgency: 'dataProviderAgency',
      dataProviderAgencyInput: 'Please input dataProviderAgency',
      initiatorAgency: 'initiatorAgency',
      initiatorAgencyInput: 'Please input initiatorAgency',
      searchRuls: 'searchRules',
      searchRulsInput: 'Please input searchRules',
      mySearch: 'mySearch',
      requireData: 'requireData',
      fields: 'fields',
      datasetUsed: 'datasetUsed',
      lookDetail: 'lookDetail',
      requireFields: 'requireFields',
      requireDataset: 'requireDataset',
      datasetName: 'datasetName',
      startMatch: 'startMatch',
      matchFields: 'matchFields',
      matchFieldsValue: 'matchFieldsValue',
      importField: 'importField',
      selectField: 'selectField',
      fieldCantBeNull: 'field cant be null',
      pleaseSelect: 'pleaseSelect',
      fieldValueCantBeNull: 'field value cant be null',
      inputMatchValue: 'input match value',
      requirer: 'requirer',
      dataProvider: 'dataProvider',
      matchResult: 'matchResult',
      danger: 'danger',
      safe: 'safe',
      rquireFields: 'rquireFields',
      matchDataset: 'matchDataset',
      matchTimes: 'matchTimes',
      dangerResult: 'dangerResult',
      rule: 'rule',
      jsonStringError: 'match algorithm error,please provider valid jsonstring'
    },
    jobDetail: {
      title: 'Job Detail',
      basicInfo: 'Basic Info',
      dataset: 'Dataset',
      datasetTitle: 'Dataset Title', // 数据集标题
      ownerAgencyId: 'Agency ID', // 机构ID
      datasetId: 'Dataset ID', // 数据集ID
      algorithmTitle: 'Algorithm Title',
      audit: 'Audit',
      inputDatasetHash: 'Input Dataset Hash',
      psiInputHash: 'PSI Input Hash',
      psiOutputHash: 'PSI Outpu Hash',
      mpcResultHash: 'Job Result Hash',
      dataReceiverAgencyId: 'Data Receiver ID',
      outputFactor: 'Result Output Factor',
      cipherSuite: 'Cipher Suite',
      updateTime: 'On Chain Time',
      log: 'Log',
      dataAuthStatus: 'Authorization Status', // 数据授权状态
      downloadLog: 'Download Log', // 点击下载日志
      progress: 'Progress',
      workflowView: 'Workflow View'
    },
    jobResult: {
      title: 'Job Result',
      baseResult: 'Outputs',
      elapsedTime: 'Execution Time', // 任务耗时
      trafficVolume: 'Network Volume', // 数据交互量
      outputFileLink: 'Output File Link', // 结果文件
      resultPreview: 'Output Preview', // 结果预览
      fateDeployTip: 'Jump to FATE Board to see the result',
      modelResult: 'Model Result'
    },
    new: {
      selectPsiFields: 'Select Psi Field',
      step1: '1. Fill Job Information', // 1. 填写信息
      step2: '2. Select Algorithm', // 2. 选择算法
      step3: '3. Select Input and Output', // 3. 选择数据集
      step4: '4. Finish', // 4. 完成
      back: 'Back', // 回前页
      last: 'Previous', // 上一步
      next: 'Next',
      chooseAlgorithm: 'Select Algorithm', // 选择算法
      algoSelection: 'Algorithm Selection',
      datasetSelection: 'Dataset Selection', // 数据集筛选
      outputSelection: 'Result Receiver',
      selectedDataset: 'Selected Datasets', // 已选数据集
      selectedAlgo: 'Selected Algorithm',
      allDataset: 'All', // 待选数据集
      authAsk: 'Is Authorized', // 是否已授权
      operation: 'Select', // 取消/选中
      create: 'Create',
      createAsk: 'Confirm to create new job?', // 确认新建任务？
      selectMsg: 'Please select dataset', // 请选择数据集
      datasetNumberNotice1: 'The number of datasets required by the selected algorithm',
      datasetNumberNotice2: 'The result receiver needs to provide data source',
      datasetNumberNotice3: 'Please confirm',
      datasetNumberNotice4: 'The initiator agency needs to provide data source',
      datasetSelectedNotice: 'At most one dataset from the same agency can be selected',
      resultReceiverTip: 'The result receiver of FATE job is job initiator',
      datasetsLengthLimit: 'The selected algorithm needs {x} datasets, please select datasets from {x} agencies',
      finishJobBaseInfo: 'Please improve basic information of this task',
      selectAl: 'Please select the algorithm first',
      rebuild: 'Modify parameters and rerun',
      resetmodel: 'Rebuild model',
      createModel: 'Start modeling',
      createPredict: 'Start predict',
      HeteroLR: 'Hetero LR',
      HomoLR: 'Homo LR',
      HeteroNN: 'Hetero NN',
      HomoNN: 'Homo NN',
      HeteroXGB: 'Hetero XGB'
    },
    rules: {
      jobTitleTip: 'Job title cannot be empty', // 任务标题不能为空
      jobTitleLimitation: 'Job title cannot exceed 128 characters', // 任务标题不能超过128字符
      jobDescriptionTip: 'Job description cannot be empty', // 任务描述不能为空
      jobDescriptionLimitation: 'Job description cannot exceed 4096 characters', // 任务描述不能超过4096字符
      receiverTip: 'Result receiver cannot be empty'
    }
  },
  ays: {
    index: {
      resource: 'Search Resource',
      myData: 'self Agency',
      allData: 'All Agencies',
      createTime: 'search time',
      newTime: 'create time',
      newDay: 'create date',
      titleFileds: 'label',
      col: 'column',
      row: 'row',
      isAuth: 'Is Authorized',
      isTrue: 'True',
      isFalse: 'False',
      authOperation: 'authOperation',
      datasetDetail: 'datasetDetail',
      providerAgency: 'providerAgency',
      search: 'search',
      clearCache: 'clearCache',
      resourceName: 'resourceName',
      resourceProb: 'resourceProb',
      validTime: 'validTime',
      searchTime: 'searchTime',
      resourceDetail: 'resourceDetail',
      resourceDelete: 'resourceDelete',
      history: 'history',
      mySearch: 'mySearch',
      mySearched: 'mySearched',
      searchAgency: 'searchAgency',
      requestAgency: 'requestAgency',
      operation: 'operation',
      searchDetail: 'searchDetail',
      createAysButtonName: 'start search',
      requestAysButtonName: 'request auth'
    },
    data: {
      index: 'resource detail',
      last: 'return'
    },
    job: {
      index: 'seach history',
      sourceName: 'sourceName',
      createUser: 'createUser',
      searchCount: 'searchCount',
      createTime: 'createTime',
      searchRecord: 'searchRecord',
      jobTitle: 'jobTitle',
      searchAgency: 'searchAgency',
      searchName: 'searchUserName',
      searchTime: 'searchTime'
    },
    result: {
      index: 'result',
      sourceName: 'sourceName',
      searchId: 'searchId',
      obsOrder: 'obsOrder'
    },
    new: {
      step1: 'Search resource',
      step2: 'Search detail'
    },
    create: {
      obsRange: 'obsRange',
      sourceName: 'sourceName',
      obsTips: 'Please input obfuscation order',
      numberTips: 'Please input integer',
      patternTips: 'Please input 1~9 integer',
      searchType: 'searchType',
      searchType1: 'is contain',
      searchType2: 'search detail',
      searchId: 'searchId',
      removeInput: 'delete',
      addInput: 'addInput',
      resetForm: 'reset',
      submitForm: 'submit',
      createTips: 'succeed，go to result page',
      searchFileds: 'searchFileds',
      filedTips: 'Please choose search labels'
    },
    tips: {
      authRequestAlert1: 'Auth request had been send to data provider',
      authRequestAlert2: 'Please refresh and check your authorization'
    }
  }
}
