const initializeFirebaseAdmin = require('./firebase/admin/initialize')
const closeFirebaseAdmin = require('./firebase/admin/close')
const reloadAllSponsors = require('./firebase/sponsors/reload-all')
const reloadAllGroups = require('./firebase/groups/reload-all')
const reloadAllFutureEvents = require('./firebase/events/reload-all-future')

module.exports.handler = function (event, context, callback) {
  const firebaseAdmin = initializeFirebaseAdmin()

  Promise.all([
    reloadAllSponsors(firebaseAdmin),
    reloadAllGroups(firebaseAdmin),
    reloadAllFutureEvents(firebaseAdmin),
  ])
    .then(() => closeFirebaseAdmin(firebaseAdmin))
    .then(() => {
      callback(null, { statusCode: 200, body: 'deployment successful' })
    })
    .catch((error) => {
      closeFirebaseAdmin(firebaseAdmin).then(() => callback(error))
    })
}
