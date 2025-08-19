const initializeFirebaseAdmin = require('./firebase/admin/initialize')
const closeFirebaseAdmin = require('./firebase/admin/close')
const reloadAllFutureEvents = require('./firebase/events/reload-all-future')

module.exports.handler = function (event, context, callback) {
  const firebaseAdmin = initializeFirebaseAdmin()

  reloadAllFutureEvents(firebaseAdmin)
    .then(() => closeFirebaseAdmin(firebaseAdmin))
    .then(() => {
      callback(null, { statusCode: 200, body: 'successfully loaded events' })
    })
    .catch((error) => {
      closeFirebaseAdmin(firebaseAdmin).then(() => callback(error))
    })
}
