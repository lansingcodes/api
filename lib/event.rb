require 'action_view'

require_relative 'endpoint'
require_relative 'group'

class Event
  class << self
    include ActionView::Helpers::DateHelper

    def upcoming query=nil
      events = query ? search_upcoming(query) : all_upcoming
      parse_events events
    end

  private

    def all_upcoming
      Group.all.map do |group|
        Endpoint.new("events?group_id=#{group['id']}&status=upcoming&page=1").get
      end.flatten.sort_by do |event|
        event['time']
      end
    end

    def search_upcoming query
      matching_group = Group.search query
      return [] if matching_group.nil?
      Endpoint.new("events?group_id=#{matching_group['id']}&status=upcoming&page=1").get
    end

    def parse_events events
      data = {
        data: events.map do |event|
          {
            links: {
              self: event['event_url']
            },
            attributes: {
              id: event['id'],
              name: event['name'],
              description: event['description'],
              time: {
                absolute: event['time'],
                relative: relative_time_of(event['time'])
              },
              capacity: event['rsvp_limit'],
              rsvps: {
                yes: event['yes_rsvp_count'],
                maybe: event['maybe_rsvp_count'],
              },
              status: event['status']
            },
            relationships: {
              venue: event['venue']['id'],
              group: event['group']['id']
            }
          }
        end
      }
      if events.any?
        data.merge({
          includes: {
            venues: events.uniq { |event| event['venue']['id'] }.map do |event|
              {
                event['venue']['id'] => {
                  attributes: {
                    name: event['venue']['name'],
                    address: "#{event['venue']['address_1']}, #{event['venue']['city']}, #{event['venue']['state']}",
                    latitude: event['venue']['lat'],
                    longitude: event['venue']['lon'],
                    directions: event['how_to_find_us']
                  }
                }
              }
            end.inject(&:merge),
            groups: events.uniq { |event| event['group']['id'] }.map do |event|
              {
                event['group']['id'] => {
                  attributes: {
                    name: event['group']['name'],
                    focus: focus_of(event['group']['urlname']),
                    slug: event['group']['urlname'],
                    members: event['group']['who']
                  }
                }
              }
            end.inject(&:merge)
          }
        })
      else
        data
      end
    end

    def relative_time_of time
      distance_of_time_in_words Time.now, Time.at(time / 1000.0)
    end

    def focus_of slug
      {
        'Mid-Michigan-Agile-Group'                 => 'Agile',
        'Lansing-DevOps-Meetup'                    => 'DevOps',
        'Lansing-Ruby-Meetup-Group'                => 'Ruby',
        'Lansing-Javascript-Meetup'                => 'JavaScript',
        'lansingweb'                               => 'Web',
        'GLUGnet'                                  => '.NET',
        'PMI-Capital-Area-Chapter-Lunch-and-Learn' => 'Project Management',
        'MoMoLansing'                              => 'Mobile'
      }[slug]
    end

  end
end
