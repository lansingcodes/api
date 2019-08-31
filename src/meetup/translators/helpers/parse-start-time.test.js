const parseStartTime = require('./parse-start-time')
const moment = require('moment-timezone')

test('missing DTSTART returns undefined', () => {
  expect(parseStartTime({})).toBe(undefined)
})

test('start time without full date and time returns undefined', () => {
  const vevent = { 'DTSTART;TZID=America/New_York': '20191231' }
  expect(parseStartTime(vevent)).toBe(undefined)
})

test('timezone is used to adjust Unix start time', () => {
  // Check for daylight savings and standard time
  expect(
    parseStartTime({ 'DTSTART;TZID=America/New_York': '20190818T130500' })
  ).toEqual(1566147900000)

  expect(
    parseStartTime({ 'DTSTART;TZID=America/New_York': '20191218T130500' })
  ).toEqual(1576692300000)
})

test('missing timezone parses date-time with ISO 8601', () => {
  expect(parseStartTime({ DTSTART: '20190818T130500Z' })).toEqual(1566133500000)
  expect(parseStartTime({ DTSTART: '20190818T130500-0400' })).toEqual(
    1566147900000
  )
  expect(parseStartTime({ DTSTART: '20190818T130500-0500' })).toEqual(
    1566151500000
  )
})
