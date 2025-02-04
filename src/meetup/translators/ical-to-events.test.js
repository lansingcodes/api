const icalToEvents = require('./ical-to-events')

describe('icalToEvents', () => {
  const mockIcal = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meetup//Meetup Calendar 1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
NAME:Capital Area Tech Hub CATECH
X-WR-CALNAME:Capital Area Tech Hub CATECH
BEGIN:VTIMEZONE
TZID:America/New_York
TZURL:http://tzurl.org/zoneinfo-outlook/America/New_York
X-LIC-LOCATION:America/New_York
BEGIN:DAYLIGHT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:event_305626180@meetup.com
SEQUENCE:1
DTSTAMP:20250204T000508Z
DTSTART;TZID=America/New_York:20250219T113000
DTEND;TZID=America/New_York:20250219T130000
SUMMARY:Network Design with Security in Mind
DESCRIPTION:Capital Area Tech Hub CATECH\\n**Overview:**\\nPlease join our speaker Andrew Lecrone for a discussion on protecting your internet circuit from attacks.
URL;VALUE=URI:https://www.meetup.com/catech/events/305626180/
STATUS:CONFIRMED
CREATED:20250115T132155Z
LAST-MODIFIED:20250115T132155Z
CLASS:PUBLIC
END:VEVENT
END:VCALENDAR`

  test('converts iCal data to event objects', () => {
    const expectedEvent = {
      'event_305626180@meetup.com': {
        id: 'event_305626180@meetup.com',
        group: 'catech',
        name: 'Network Design with Security in Mind',
        description: 'Capital Area Tech Hub CATECH\n**Overview:**\nPlease join our speaker Andrew Lecrone for a discussion on protecting your internet circuit from attacks.',
        url: 'https://www.meetup.com/catech/events/305626180/',
        startTime: 1739982600000, // Feb 19, 2025, 11:30 AM EST
        venue: "",
        address: ""
      }
    }

    const result = icalToEvents('catech', mockIcal)
    expect(result).toEqual(expectedEvent)
  })

  test('returns empty array for invalid calendar data', () => {
    const result = icalToEvents('catech', 'INVALID:CALENDAR')
    expect(result).toEqual([])
  })

  test('returns null when no events present', () => {
    const noEventsCalendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meetup//Meetup Calendar 1.0//EN
END:VCALENDAR`
    
    const result = icalToEvents('catech', noEventsCalendar)
    expect(result).toEqual({})
  })
})