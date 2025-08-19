const parseVenue = require('./parse-venue')

test('returns empty string when venue is undefined', () => {
  expect(parseVenue(undefined)).toEqual('')
})

test('returns trimmed string', () => {
  expect(parseVenue('  venue  ')).toEqual('venue')
})

test('returns everything before last ( character', () => {
  expect(
    parseVenue(
      'MSU (Comm Arts Room 233) (404 Wilson Rd, East Lansing, MI 48824)',
    ),
  ).toEqual('MSU (Comm Arts Room 233)')
})

test('returns whole value when no parentheses present', () => {
  expect(parseVenue('The Fledge')).toEqual('The Fledge')
})

test('extra backslashes are removed', () => {
  expect(parseVenue('The Fledge\\, Lansing')).toEqual('The Fledge, Lansing')
})
