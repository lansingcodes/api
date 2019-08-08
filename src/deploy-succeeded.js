import setDefaultSponsors from './firebase/sponsors-set-default'
import setDefaultGroups from './firebase/groups-set-default'
import setFutureEvents from './firebase/events-set-future'

export function handler(event, context, callback) {
  Promise.all([setDefaultSponsors(), setDefaultGroups(), setFutureEvents()])
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully executed deployment tasks'
      })
    })
    .catch(callback)
}
