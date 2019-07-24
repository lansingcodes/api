const setDefaultGroups = require('./firebase/groups-set-default')

export function handler(event, context, callback) {
  setDefaultGroups()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully loaded groups'
      })
    })
    .catch(callback)
}
