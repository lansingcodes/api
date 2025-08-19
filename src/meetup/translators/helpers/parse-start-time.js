const moment = require('moment-timezone')

const tzDelim = ';TZID='

// Meetup start time uses a key that starts with "DTSTART" and optionally ends
// with the timezone. The value is often formatted like this:
//
//   DTSTART;TZID=America/New_York:20190818T130500
//
// This function extracts and returns the start time intermediately as this:
//
//   2019-08-18T13:05:00-04:00
//
// And returns the Unix timestamp value:
//
//   1566133500000
module.exports = (vevent) => {
  const dtstartKey = Object.keys(vevent).find((veventKey) =>
    veventKey.startsWith('DTSTART'),
  )
  if (!dtstartKey) return
  const timezoneIndex = dtstartKey.indexOf(tzDelim)
  const timezoneName =
    timezoneIndex >= 0
      ? dtstartKey.slice(timezoneIndex + tzDelim.length)
      : undefined
  const dtstart = vevent[dtstartKey]
  if (dtstart.length < 15) return

  const startTime = timezoneName
    ? moment.tz(dtstart, timezoneName)
    : moment(dtstart)
  return startTime.valueOf()
}
