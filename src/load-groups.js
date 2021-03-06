const initializeFirebaseAdmin = require('./firebase/admin/initialize')
const closeFirebaseAdmin = require('./firebase/admin/close')
const reloadAllGroups = require('./firebase/groups/reload-all')

export function handler(event, context, callback) {
  const firebaseAdmin = initializeFirebaseAdmin()

  reloadAllGroups(firebaseAdmin)
    .then(() => closeFirebaseAdmin(firebaseAdmin))
    .then(() => {
      callback(null, { statusCode: 200, body: 'successfully loaded groups' })
    })
    .catch(error => {
      closeFirebaseAdmin(firebaseAdmin).then(() => callback(error))
    })
}
