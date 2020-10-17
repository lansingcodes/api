const initializeFirebaseAdmin = require('./firebase/admin/initialize')
const closeFirebaseAdmin = require('./firebase/admin/close')
const reloadAllSponsors = require('./firebase/sponsors/reload-all')

export function handler(event, context, callback) {
  const firebaseAdmin = initializeFirebaseAdmin()

  reloadAllSponsors(firebaseAdmin)
    .then(() => closeFirebaseAdmin(firebaseAdmin))
    .then(() => {
      callback(null, { statusCode: 200, body: 'successfully loaded sponsors' })
    })
    .catch(error => {
      closeFirebaseAdmin(firebaseAdmin).then(() => callback(error))
    })
}
