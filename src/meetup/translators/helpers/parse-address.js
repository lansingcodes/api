// Meetup locations are often formatted like this:
//
//   The Fledge (1300 Eureka St\\, Lansing\\, MI 48912)
//
// This function extracts and returns the address portion:
//
//   1300 Eureka St, Lansing, MI 48912

module.exports = (location) => {
  if (!location) return ''
  const from = location.lastIndexOf('(')
  const to = location.lastIndexOf(')')
  if (from === -1 && to === -1) return ''
  const address = location.substring(from + 1, to)
  return address.replace(/\\/g, '')
}
