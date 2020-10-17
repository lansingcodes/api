const getEventsForAllGroups = require('../../meetup/events-get-for-all-groups')
const setCollectionToObject = require('../helpers/set-collection-to-object')

module.exports = firebaseAdmin =>
  getEventsForAllGroups().then(events =>
    setCollectionToObject(firebaseAdmin, 'events', events)
  )
