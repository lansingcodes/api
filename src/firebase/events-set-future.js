const getEventsForAllGroups = require('../meetup/events-get-for-all-groups')
const initializeHttpClient = require('./http/initialize-http-client')
const eventToDocument = require('./translators/event-to-document')

module.exports = () =>
  getEventsForAllGroups().then(events =>
    initializeHttpClient().then(firebaseHttpClient => {
      const promises = events.map(event => {
        const document = eventToDocument(event)
        return firebaseHttpClient.patch(document.name, document)
      })
      return Promise.all(promises)
    })
  )
