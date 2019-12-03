const getAllEventPaths = require('./firebase/event-paths-get-all')
const deleteEvents = require('./firebase/events-delete')
const setFutureEvents = require('./firebase/events-set-future')

// Get and delete all events first to:
//  1. Remove past events
//  2. Remove canceled events
//  3. Remove events with new keys (happens in Meetup after certain edits)
export function handler(event, context, callback) {
  getAllEventPaths()
    .then(eventPaths => deleteEvents(eventPaths))
    .then(() => setFutureEvents())
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully loaded events'
      })
    })
    .catch(callback)
}
