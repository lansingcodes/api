const getEventsForGroup = require('./events-get-for-group')
const groups = require('../../data/groups.json')

module.exports = () =>
  Promise.all(
    Object.keys(groups).map(groupKey =>
      getEventsForGroup(groupKey, groups[groupKey])
    )
  ).then(allGroupEvents =>
    // Flatten the array of arrays and undefineds into one array of events
    allGroupEvents.reduce((accumulatedEvents, currentEvents) => {
      if (currentEvents) {
        currentEvents.forEach(currentEvent => {
          if (currentEvent) accumulatedEvents.push(currentEvent)
        })
      }
      return accumulatedEvents
    }, [])
  )
