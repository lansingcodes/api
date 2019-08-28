const parseName = require('./parse-name')

test('removes backslashes', () => {
  expect(parseName('Selling DevOps\\, with Garrin Ball')).toEqual(
    'Selling DevOps, with Garrin Ball'
  )
})
