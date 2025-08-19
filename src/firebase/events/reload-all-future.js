const deleteAllEvents = require('./delete-all')
const setFutureEvents = require('./set-future')

module.exports = (firebaseAdmin) =>
  deleteAllEvents(firebaseAdmin).then(() => setFutureEvents(firebaseAdmin))
