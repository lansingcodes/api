const setFutureEvents = require('./firebase/events-set-future')

export function handler(event, context, callback) {
  setFutureEvents()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully loaded events'
      })
    })
    .catch(callback)
}
