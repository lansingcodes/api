const initializeFirebaseAdmin = require('./firebase/admin/initialize-firebase-admin')
const closeFirebaseAdmin = require('./firebase/admin/close-firebase-admin')
const setDefaultSponsors = require('./firebase/sponsors-set-default')

export function handler(event, context, callback) {
  const firebaseAdmin = initializeFirebaseAdmin()

  setDefaultSponsors(firebaseAdmin)
    .then(() => closeFirebaseAdmin(firebaseAdmin))
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully loaded sponsors'
      })
    })
    .catch(error => {
      closeFirebaseAdmin(firebaseAdmin).then(() => {
        callback(error)
      })
    })
}
