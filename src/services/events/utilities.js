function mergeGroupEvents(mergedEvents, eventsByGroup) {
  return [...mergedEvents, ...eventsByGroup.results];
}

/**
 * Note: See app/representers/events.rb for original ruby logic
 * @param {*} event
 */
function translateEventsForV1Format(events = []) {
  const data = events.map(translateEvent);
  const venues = makeVenuesObject(events);
  const groups = makeGroupsObject(events);
  const included = { venues, groups };

  return { data, included };
}

function translateEvent(event) {
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
        relative: 'TODO'
      },
      capacity: event.rsvp_limit,
      rsvps: {
        yes: event.yes_rsvp_count,
        maybe: event.maybe_rsvp_count
      },
      status: event.status
    },
    relationships: {
      group: {
        type: 'groups',
        id: event.group.id
      }
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
          address: `${venue.address_1}, ${venue.city}, ${venue.state}`,
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
          focus: 'TODO',
          slug: 'TODO',
          members: group.who
        }
      };
    }
    return object;
  }, {});
}

module.exports = { mergeGroupEvents, translateEventsForV1Format };
