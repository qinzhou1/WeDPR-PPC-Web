const user = require('./user')
const job = require('./job')
const dataset = require('./dataset')
const algorithm = require('./algorithm')
const servers = require('./servers')
const agency = require('./agency')
const ays = require('./ays')

const mocks = [
  ...servers,
  ...user,
  ...job,
  ...dataset,
  ...algorithm,
  ...agency,
  ...ays
]

module.exports = {
  mocks
}
