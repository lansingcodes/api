const parseDescription = require('./parse-description')

test('returns empty string when description is undefined', () => {
  expect(parseDescription(undefined)).toEqual('')
})

test('returns whole description if heading and link are missing', () => {
  expect(parseDescription('plain event description')).toEqual(
    'plain event description',
  )
})

test('double-escaped newlines are single-escaped', () => {
  expect(parseDescription('line 1\\nline 2\\nline 3')).toEqual(
    'line 1\nline 2\nline 3',
  )
})

test('extra backslashes are removed', () => {
  expect(parseDescription('event\\, description')).toEqual('event, description')
})

test('returns body when heading and link are present', () => {
  expect(parseDescription('heading\\n\\nbody\\n\\nlink')).toEqual('body')
})
