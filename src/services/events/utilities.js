function mergeGroupEvents(mergedEvents = [], eventsByGroup = {}) {
  return eventsByGroup.results
    ? [...mergedEvents, ...eventsByGroup.results]
    : mergedEvents;
}

/**
 * Note: See app/representers/events.rb for original ruby logic
 * @param {*} events
 */
function translateEventsForV1Format(events = []) {
  const data = events.map(translateEvent);
  const venues = makeVenuesObject(events);
  const groups = makeGroupsObject(events);
  const included = { venues, groups };

  return { data, included };
}

function translateEvent(event = {}) {
  return {
    links: {
      self: event.event_url
    },
    attributes: {
      id: event.id,
      name: event.name,
      description: event.description,
      time: {
        absolute: event.time,
        relative: getRelativeTime(event.time)
      },
      capacity: event.rsvp_limit,
      rsvps: {
        yes: event.yes_rsvp_count,
        maybe: event.maybe_rsvp_count
      },
      status: event.status
    },
    relationships: {
      group: event.group
        ? {
          type: 'groups',
          id: event.group.id
        }
        : {},
      venue: event.venue
        ? {
          type: 'venues',
          id: event.venue.id
        }
        : {}
    }
  };
}

function makeVenuesObject(events = []) {
  return events.reduce((object, event = {}) => {
    const { venue = {} } = event;
    if (venue.id && !object[venue.id]) {
      object[venue.id] = {
        attributes: {
          name: venue.name,
          address: `${venue.address_1 || ''}, ${venue.city ||
            ''}, ${venue.state || ''}`,
          latitude: venue.lat,
          longitude: venue.lon,
          directions: venue.how_to_find_us
        }
      };
    }
    return object;
  }, {});
}

function makeGroupsObject(events = []) {
  return events.reduce((object, event = {}) => {
    const { group = {} } = event;
    if (group.id && !object[group.id]) {
      object[group.id] = {
        attributes: {
          name: group.name,
          focus: slugLookup[group.urlname] || 'General',
          slug: group.urlname,
          members: group.who,
          logo: group.group_photo ? group.group_photo.photo_link : ''
        }
      };
    }
    return object;
  }, {});
}

const slugLookup = {
  'Mid-Michigan-Agile-Group': 'Agile',
  'Lansing-Area-Maker-Meetup': 'Lansing Makers',
  'Lansing-DevOps-Meetup': 'DevOps',
  'lansing-tech-demos': 'Demo Night',
  'Lansing-Marketing-Hackers': 'Marketing Hackers',
  'Lansing-CocoaHeads': 'CocoaHeads',
  'Lansing-Javascript-Meetup': 'JavaScript',
  'Lansing-Experience-Design-Meetup': 'UX Design',
  lansingweb: 'Web',
  GLUGnet: '.NET',
  'PMI-Capital-Area-Chapter-Lunch-and-Learn': 'Project Management',
  'GLASS-Greater-Lansing-Area-for-SQL-Server': 'SQL Server',
  LansingAreaSoftwareTesters: 'QA',
  'Lansing-Area-R-Users-Group': 'R',
  'Mid-Michigan-Code-Retreat': 'Code Retreat',
  'Lansing-WordPress-Meetup': 'WordPress'
};

function getRelativeTime(eventUnixTime) {
  if (!eventUnixTime || typeof eventUnixTime !== 'number') return 'Unknown';

  const now = new Date();

  return getTimeDifference(now.getTime(), eventUnixTime);
}

// Lifted from SO and modified for future/past times:
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
// Used in lieu of the Action View - Date Helpers - distance_of_time_in_words
// from Ruby on Rails
function getTimeDifference(currentUnixTime, eventUnixTime) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const msDiff = eventUnixTime - currentUnixTime;
  const isPassed = msDiff < 0;
  const absDiff = Math.abs(msDiff);
  const partialGetDiffTimeText = getDiffTimeText.bind(null, absDiff, isPassed);

  if (absDiff < msPerMinute) {
    return partialGetDiffTimeText(1000, 'second');
  } else if (absDiff < msPerHour) {
    return partialGetDiffTimeText(msPerMinute, 'minute');
  } else if (absDiff < msPerDay) {
    return partialGetDiffTimeText(msPerHour, 'hour');
  } else if (absDiff < msPerMonth) {
    return 'about ' + partialGetDiffTimeText(msPerDay, 'day');
  } else if (absDiff < msPerYear) {
    return 'about ' + partialGetDiffTimeText(msPerMonth, 'month');
  } else {
    return 'about ' + partialGetDiffTimeText(msPerYear, 'year');
  }
}

function getDiffTimeText(absDiff, isPassed, divisor, unit) {
  const value = Math.round(absDiff / divisor);
  const unitText = value === 1 ? unit : unit + 's';
  const optionalAgo = isPassed ? ' ago' : '';

  return `${value} ${unitText}${optionalAgo}`;
}

module.exports = { mergeGroupEvents, translateEventsForV1Format };
