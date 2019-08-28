const ical2json = require('ical2json')
const parseName = require('./helpers/parse-name')
const parseDescription = require('./helpers/parse-description')
const parseVenue = require('./helpers/parse-venue')
const parseAddress = require('./helpers/parse-address')
const parseStartTime = require('./helpers/parse-start-time')

// Input:
// {
//   "VCALENDAR": [
//     {
//       "VERSION": "2.0",
//       "PRODID": "-//Meetup//RemoteApi//EN",
//       "CALSCALE": "GREGORIAN",
//       "METHOD": "PUBLISH",
//       "X-ORIGINAL-URL": "https://www.meetup.com/lansing-tech-demos/events/ical/",
//       "X-WR-CALNAME": "Events - Lansing Tech Demo Night",
//       "VTIMEZONE": [
//         {
//           "TZID": "America/New_York",
//           "TZURL": "http://tzurl.org/zoneinfo-outlook/America/New_York",
//           "X-LIC-LOCATION": "America/New_York",
//           "DAYLIGHT": [
//             {
//               "TZOFFSETFROM": "-0500",
//               "TZOFFSETTO": "-0400",
//               "TZNAME": "EDT",
//               "DTSTART": "19700308T020000",
//               "RRULE": "FREQ=YEARLY;BYMONTH=3;BYDAY=2SU"
//             }
//           ],
//           "STANDARD": [
//             {
//               "TZOFFSETFROM": "-0400",
//               "TZOFFSETTO": "-0500",
//               "TZNAME": "EST",
//               "DTSTART": "19701101T020000",
//               "RRULE": "FREQ=YEARLY;BYMONTH=11;BYDAY=1SU"
//             }
//           ]
//         }
//       ],
//       "VEVENT": [
//         {
//           "DTSTAMP": "20190808T165032Z",
//           "DTSTART;TZID=America/New_York": "20190813T190000",
//           "DTEND;TZID=America/New_York": "20190813T210000",
//           "STATUS": "CONFIRMED",
//           "SUMMARY": "Tech demos at The Fledge!",
//           "DESCRIPTION": "Lansing Tech Demo Night\\nTuesday\\, August 13 at 7:00 PM\\n\\nHave you made something that you're proud of? Is there a hot new app you want everyone to know about? What about that startup idea you've been working...\\n\\nhttps://www.meetup.com/lansing-tech-demos/events/262869316/",
//           "CLASS": "PUBLIC",
//           "CREATED": "20190129T152939Z",
//           "GEO": "42.77;-84.58",
//           "LOCATION": "The Fledge (1300 Eureka St\\, Lansing\\, MI 48912)",
//           "URL": "https://www.meetup.com/lansing-tech-demos/events/262869316/",
//           "LAST-MODIFIED": "20190722T171936Z",
//           "UID": "event_lvlvqqyzlbrb@meetup.com"
//         }
//       ]
//     }
//   ]
// }
//
// Output:
// {
//   id: 'event_lvlvqqyzlbrb@meetup.com',
//   group: 'demo-night',
//   name: 'Tech demos at The Fledge!',
//   description: 'Have you made something that you're proud of? Is there a hot new app you want everyone to know about? What about that startup idea you've been working...',
//   url: 'https://www.meetup.com/lansing-tech-demos/events/262869316/',
//   startTime: 1565722800000,
//   venue: 'The Fledge',
//   address: '1300 Eureka St, Lansing, MI 48912'
// }

module.exports = (groupKey, ical) => {
  const icalJson = ical2json.convert(ical)
  if (!icalJson.VCALENDAR) return []

  const events = []
  icalJson.VCALENDAR.forEach(calendar => {
    if (!calendar.VEVENT) return
    calendar.VEVENT.forEach(vevent => {
      const event = {
        id: vevent.UID,
        group: groupKey,
        name: parseName(vevent.SUMMARY),
        description: parseDescription(vevent.DESCRIPTION),
        url: vevent.URL,
        venue: parseVenue(vevent.LOCATION),
        address: parseAddress(vevent.LOCATION),
        startTime: parseStartTime(vevent)
      }
      console.log('parsed event:', JSON.stringify(event))
      events.push(event)
    })
  })
  return events
}
