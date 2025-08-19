const parseAddress = require('./parse-address')

test('returns empty string when address is undefined', () => {
  expect(parseAddress(undefined)).toEqual('')
})

test('returns contents of last parentheses', () => {
  expect(
    parseAddress(
      'MSU (Comm Arts Room 233) (404 Wilson Rd, East Lansing, MI 48824)',
    ),
  ).toEqual('404 Wilson Rd, East Lansing, MI 48824')
})

test('returns empty string when no parentheses', () => {
  expect(parseAddress('The Fledge')).toEqual('')
})

test('extra backslashes are removed', () => {
  expect(
    parseAddress('The Fledge (1300 Eureka St\\, Lansing\\, MI 48912)'),
  ).toEqual('1300 Eureka St, Lansing, MI 48912')
})
