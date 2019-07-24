import setDefaultSponsors from './firebase/sponsors-set-default'
import setDefaultGroups from './firebase/groups-set-default'

export function handler(event, context, callback) {
  Promise.all([setDefaultSponsors(), setDefaultGroups()])
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully executed deployment tasks'
      })
    })
    .catch(callback)
}
