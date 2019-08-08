// Meetup originalDescriptions are often formatted like this:
//
//   Lansing Tech Demo Night\\nTuesday\\, August 13 at 7:00 PM\\n\\nHave you
//   made something that you're proud of? Is there a hot new app you want
//   everyone to know about? What about that startup idea you've been working...
//   \\n\\nhttps://www.meetup.com/lansing-tech-demos/events/262869316/
//
// This function extracts and returns the middle portion:
//
//   Have you made something that you're proud of? Is there a hot new app you
//   want everyone to know about? What about that startup idea you've been
//   working...

const breakPoint = '\\n\\n'

module.exports = originalDescription => {
  if (!originalDescription) return ''
  const from = originalDescription.indexOf(breakPoint)
  const to = originalDescription.lastIndexOf(breakPoint)
  const description = originalDescription.substring(
    from === -1 ? 0 : from + breakPoint.length,
    to === -1 ? originalDescription.length : to
  )
  return description.replace(/\\n/g, '\n').replace(/\\/g, '')
}
