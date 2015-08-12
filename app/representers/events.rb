require 'json'

class LansingCodes::Representers::Events
  include LansingCodes::Helpers::Time

  def initialize data
    @data = data
  end

  def to_json
    results = { data: data_array }
    if @data.any?
      results.merge(included_hash)
    else
      results
    end.to_json
  end

private

  def data_array
    @data.map do |event|
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
          venue: {
            type: 'venues',
            id: event['venue']['id']
          },
          group: {
            type: 'groups',
            id: event['group']['id']
          }
        }
      }
    end
  end

  def included_hash
    {
      included: {
        venues: venues_hash,
        groups: groups_hash
      }
    }
  end

  def venues_hash
    @data.uniq { |event| event['venue']['id'] }.map do |event|
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
    end.inject(&:merge)
  end

  def groups_hash
    @data.uniq { |event| event['group']['id'] }.map do |event|
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
  end

  def focus_of slug
    {
      'Mid-Michigan-Agile-Group'                  => 'Agile',
      'Lansing-DevOps-Meetup'                     => 'DevOps',
      'Lansing-Ruby-Meetup-Group'                 => 'Ruby',
      'Lansing-Javascript-Meetup'                 => 'JavaScript',
      'lansingweb'                                => 'Web',
      'GLUGnet'                                   => '.NET',
      'PMI-Capital-Area-Chapter-Lunch-and-Learn'  => 'Project Management',
      'MoMoLansing'                               => 'Mobile',
      'GLASS-Greater-Lansing-Area-for-SQL-Server' => 'SQL Server'
    }[slug]
  end

end
