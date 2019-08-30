// Meetup locations are often formatted like this:
//
//   The Fledge (1300 Eureka St\\, Lansing\\, MI 48912)
//
// This function extracts and returns the venue portion:
//
//   The Fledge

module.exports = location => {
  if (!location) return ''
  const to = location.lastIndexOf('(')
  const venue = to >= 0 ? location.substr(0, to) : location
  return venue.replace(/\\/g, '').trim()
}
