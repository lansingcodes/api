const initializeHttpClient = require('./http/initialize-http-client')
const icalToEvents = require('./translators/ical-to-events')

module.exports = (groupKey, group) => {
  if (!group.slug) return Promise.resolve()

  return initializeHttpClient().then(meetupHttpClient =>
    meetupHttpClient
      .get(`/${group.slug}/events/ical/`)
      .then(response => {
        const events = icalToEvents(groupKey, response.data)
        return events
      })
      .catch(error => {
        console.error(
          `Failed to get events for group ${groupKey}. Reason:\n`,
          error.response
        )
      })
  )
}
