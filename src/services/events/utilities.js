const { slugMap } = require('./config');

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
      self: event.event_url || null
    },
    attributes: {
      id: event.id || null,
      name: event.name || null,
      description: event.description || null,
      time: {
        absolute: event.time || null,
        relative: getRelativeTime(event.time)
      },
      capacity: event.rsvp_limit || null,
      rsvps: {
        yes: event.yes_rsvp_count,
        maybe: event.maybe_rsvp_count
      },
      status: event.status || null
    },
    relationships: {
      group: event.group
        ? {
          type: 'groups',
          id: event.group.id || null
        }
        : null,
      venue: event.venue
        ? {
          type: 'venues',
          id: event.venue.id || null
        }
        : null
    }
  };
}

function makeVenuesObject(events = []) {
  return events.reduce((object, event = {}) => {
    const { venue = {} } = event;
    if (venue.id && !object[venue.id]) {
      object[venue.id] = {
        attributes: {
          name: venue.name || null,
          address: `${venue.address_1 || ''}, ${venue.city ||
            ''}, ${venue.state || ''}`,
          latitude: venue.lat || null,
          longitude: venue.lon || null,
          directions: venue.how_to_find_us || null
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
          name: group.name || null,
          focus: slugMap[group.urlname] || 'General',
          slug: group.urlname || null,
          members: group.who || null,
          logo: group.group_photo ? group.group_photo.photo_link : null
        }
      };
    }
    return object;
  }, {});
}

function getRelativeTime(eventUnixTime) {
  if (!eventUnixTime || typeof eventUnixTime !== 'number') return 'Unknown';

  const now = new Date();

  return (
    getTimeDifference(eventUnixTime, now.getTime()) +
    (eventUnixTime - now.getTime() < 0 ? ' ago' : '')
  );
}

// Lifted from SO and modified for future/past times:
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
// Used in lieu of the Action View - Date Helpers - distance_of_time_in_words
// from Ruby on Rails
function getTimeDifference(eventUnixTime, currentUnixTime) {
  const seconds = n => n * 1000;
  const minutes = n => n * seconds(60);
  const hours = n => n * minutes(60);
  const days = n => n * hours(24);
  const months = n => n * days(30);
  const years = n => n * days(365);

  const msDiff = eventUnixTime - currentUnixTime;
  const absDiff = Math.abs(msDiff);

  if (absDiff <= seconds(29)) {
    return 'less than a minute';
  } else if (absDiff <= minutes(1) + seconds(29)) {
    return '1 minute';
  } else if (absDiff <= minutes(44) + seconds(29)) {
    return Math.round(absDiff / minutes(1)) + ' minutes';
  } else if (absDiff <= minutes(89) + seconds(29)) {
    return 'about 1 hour';
  } else if (absDiff <= hours(23) + minutes(59) + seconds(29)) {
    const roundedHours = Math.round(absDiff / hours(1));
    const numberOfHours = roundedHours === 1 ? 2 : roundedHours;
    return 'about ' + numberOfHours + ' hours';
  } else if (absDiff <= hours(41) + minutes(59) + seconds(29)) {
    return '1 day';
  } else if (absDiff <= days(29) + hours(23) + minutes(59) + seconds(29)) {
    const roundedDays = Math.round(absDiff / days(1));
    const numberOfDays = roundedDays === 30 ? 29 : roundedDays;
    return numberOfDays + ' days';
  } else if (absDiff <= days(44) + hours(23) + minutes(59) + seconds(29)) {
    return 'about 1 month';
  } else if (absDiff <= days(59) + hours(23) + minutes(59) + seconds(29)) {
    return 'about 2 months';
  } else if (absDiff <= years(1) - seconds(1)) {
    return Math.round(absDiff / months(1)) + ' months';
  } else if (absDiff <= years(1) + months(3) - seconds(1)) {
    return 'about 1 year';
  } else if (absDiff <= years(1) + months(9) - seconds(1)) {
    return 'over 1 year';
  } else if (absDiff <= years(2) - seconds(1)) {
    return 'almost 2 years';
  } else if (absDiff <= years(2) + months(3) - seconds(1)) {
    return 'about 2 years';
  } else if (absDiff <= years(2) + months(9) - seconds(1)) {
    return 'over 2 years';
  } else if (absDiff <= years(3) - seconds(1)) {
    return 'almost 3 years';
  } else {
    return 'over 3 years';
  }
}

module.exports = {
  getTimeDifference,
  mergeGroupEvents,
  translateEventsForV1Format
};
