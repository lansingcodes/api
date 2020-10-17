const setCollectionToObject = require('../helpers/set-collection-to-object')
const groups = require('../../../data/groups.json')

module.exports = firebaseAdmin =>
  setCollectionToObject(firebaseAdmin, 'groups', groups)
