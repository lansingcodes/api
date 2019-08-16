const insertString = require('./insert-string')

// Meetup start time uses a key that starts with "DTSTART" and optionally ends
// with the timezone. The value is often formatted like this:
//
//   20190818T130500
//
// This function extracts and returns the start time intermediately as this:
//
//   2019-08-18T13:05:00Z
//
// And returns the Unix timestamp value:
//
//   1566133500000

module.exports = vevent => {
  const dtstartKey = Object.keys(vevent).find(veventKey =>
    veventKey.startsWith('DTSTART')
  )
  const dtstart = vevent[dtstartKey]
  console.error('dtstart:', dtstart)
  if (!dtstart || dtstart.length < 15) return

  // 012345678901234 Indexes
  // 20190813T190000 => 2019-08-13T19:00:00
  let timeString = dtstart
  timeString = insertString(timeString, 13, ':')
  timeString = insertString(timeString, 11, ':')
  timeString = insertString(timeString, 6, '-')
  timeString = insertString(timeString, 4, '-')

  const startTime = Date.parse(timeString)
  return startTime || undefined
}
