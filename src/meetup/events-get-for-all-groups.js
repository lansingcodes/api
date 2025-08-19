const getEventsForGroup = require('./events-get-for-group')
const groups = require('../../data/groups.json')

module.exports = () =>
  Promise.all(
    Object.keys(groups).map((groupKey) =>
      getEventsForGroup(groupKey, groups[groupKey]),
    ),
  ).then((allGroupEvents) =>
    // Combine all of the group events into one big events object
    allGroupEvents.reduce((accumulatedEvents, currentEvents) => {
      return Object.assign(accumulatedEvents, currentEvents)
    }, {}),
  )
