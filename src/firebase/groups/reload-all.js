const deleteAllGroups = require('./delete-all')
const setAllGroups = require('./set-all')

module.exports = firebaseAdmin =>
  deleteAllGroups(firebaseAdmin).then(() => setAllGroups(firebaseAdmin))
