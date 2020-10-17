import initializeFirebaseAdmin from './firebase/admin/initialize'
import closeFirebaseAdmin from './firebase/admin/close'
import reloadAllSponsors from './firebase/sponsors/reload-all'
import reloadAllGroups from './firebase/groups/reload-all'
import reloadAllFutureEvents from './firebase/events/reload-all-future'

export function handler(event, context, callback) {
  const firebaseAdmin = initializeFirebaseAdmin()

  Promise.all([
    reloadAllSponsors(firebaseAdmin),
    reloadAllGroups(firebaseAdmin),
    reloadAllFutureEvents(firebaseAdmin)
  ])
    .then(() => closeFirebaseAdmin(firebaseAdmin))
    .then(() => {
      callback(null, { statusCode: 200, body: 'deployment successful' })
    })
    .catch(error => {
      closeFirebaseAdmin(firebaseAdmin).then(() => callback(error))
    })
}
