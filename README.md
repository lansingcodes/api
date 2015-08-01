[![Build Status](https://travis-ci.org/lansingcodes/api.svg?branch=master)](https://travis-ci.org/lansingcodes/api) [![Dependency Status](https://gemnasium.com/lansingcodes/api.svg)](https://gemnasium.com/lansingcodes/api) [![Test Coverage](https://codeclimate.com/github/lansingcodes/api/badges/coverage.svg)](https://codeclimate.com/github/lansingcodes/api/coverage)  [![Code Climate](https://codeclimate.com/github/lansingcodes/api/badges/gpa.svg)](https://codeclimate.com/github/lansingcodes/api)

# Lansing Codes API

A public API to retrieve information about code-related events in Lansing, MI.

## Usage

### Base URL

```
http://api.lansing.codes/v1
```

### Events

#### `/events/upcoming/list`

Returns the next upcoming event for each meetup group.

#### `/events/upcoming/search/:query`

Returns the next upcoming event for the first group matching the query.

#### Response format

This API *sort of* conforms to the [JSON API spec](http://jsonapi.org/). Where it doesn't conform, it's because I either didn't read that part or I [disagree with it](http://discuss.jsonapi.org/t/why-is-included-an-array/76/2).

``` json
{
  "data": [
    {
      "links": {
        "self": "http://www.meetup.com/Lansing-Ruby-Meetup-Group/events/223606469/"
      },
      "attributes": {
        "id": "dwsnthytlbpb",
        "name": "Ruby Hack Night",
        "description": "<p>Our summer events will focus on programming Ruby. Bring a project or something small you're passionate about and we'll give you five minutes to talk about it at the start of the meeting. Afterward, we'll be having pizza and beer and hacking away on whatever people bring.</p>",
        "time": {
          "absolute": 1439334000000,
          "relative": "12 days"
        },
        "capacity": 20,
        "rsvps": {
          "yes": 3,
          "maybe": 0
        },
        "status": "upcoming"
      },
      "relationships": {
        "venue": 19922032,
        "group": 11398352
      }
    }
  ],
  "included": {
    "venues": {
      "19922032": {
        "name": "The Technology Innovation Center",
        "address": "325 East Grand River Avenue, East Lansing, MI",
        "latitude": 42.73457,
        "longitude": -84.481125,
        "directions": "On the 3rd Floor (take the elevator past Douglas J)"
      }
    },
    "groups": {
      "11398352": {
        "name": "Lansing Ruby Meetup Group",
        "slug": "Lansing-Ruby-Meetup-Group",
        "members": "Members"
      }
    }
  }
}
```

## Contributing

To run the API and its specs locally, you'll need to [register for a meetup.com API key](https://secure.meetup.com/meetup_api/key/), which actually only takes a few seconds.

Then to run the API server:

```
MEETUP_API_KEY=<MY_API_KEY> bundle exec rackup
```

And to run the tests:

```
MEETUP_API_KEY=<MY_API_KEY> bundle exec rspec
```
