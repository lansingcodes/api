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
    @data.map do |datum|
      event_hash = {
        links: {
          self: datum['event']['event_url']
        },
        attributes: {
          id: datum['event']['id'],
          name: datum['event']['name'],
          description: datum['event']['description'],
          time: {
            absolute: datum['event']['time'],
            relative: relative_time_of(datum['event']['time'])
          },
          capacity: datum['event']['rsvp_limit'],
          rsvps: {
            yes: datum['event']['yes_rsvp_count'],
            maybe: datum['event']['maybe_rsvp_count'],
          },
          status: datum['event']['status']
        },
        relationships: {
          group: {
            type: 'groups',
            id: datum['event']['group']['id']
          }
        }
      }
      if datum['event']['venue']
        event_hash[:relationships][:venue] = {
          type: 'venues',
          id: datum['event']['venue']['id']
        }
      end
      event_hash
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
    @data.reject do |datum|
      datum['event']['venue'].nil?
    end.uniq do |datum|
      datum['event']['venue']['id']
    end.map do |datum|
      {
        datum['event']['venue']['id'] => {
          attributes: {
            name: datum['event']['venue']['name'],
            address: "#{datum['event']['venue']['address_1']}, #{datum['event']['venue']['city']}, #{datum['event']['venue']['state']}",
            latitude: datum['event']['venue']['lat'],
            longitude: datum['event']['venue']['lon'],
            directions: datum['event']['how_to_find_us']
          }
        }
      }
    end.inject(&:merge)
  end

  def groups_hash
    @data.uniq { |datum| datum['event']['group']['id'] }.map do |datum|
      group_hash = {
        datum['event']['group']['id'] => {
          attributes: {
            name: datum['event']['group']['name'],
            focus: focus_of(datum['event']['group']['urlname']),
            slug: datum['event']['group']['urlname'],
            members: datum['event']['group']['who']
          }
        }
      }
      if datum['group']['group_photo']
        group_hash[
          datum['event']['group']['id']
        ][:attributes][:logo] = datum['group']['group_photo']['photo_link']
      end
      group_hash
    end.inject(&:merge)
  end

  def focus_of slug
    {
      'Mid-Michigan-Agile-Group'                       => 'Agile',
      'Lansing-DevOps-Meetup'                          => 'DevOps',
      'lansing-tech-demos'                             => 'Demo Night',
      'Lansing-Marketing-Hackers'                      => 'Marketing Hackers',
      'Lansing-CocoaHeads'                             => 'CocoaHeads',
      'Lansing-Javascript-Meetup'                      => 'JavaScript',
      'Lansing-Experience-Design-Meetup'               => 'UX Design',
      'lansingweb'                                     => 'Web',
      'GLUGnet'                                        => '.NET',
      'PMI-Capital-Area-Chapter-Lunch-and-Learn'       => 'Project Management',
      'MoMoLansing'                                    => 'Mobile',
      'GLASS-Greater-Lansing-Area-for-SQL-Server'      => 'SQL Server',
      'LansingAreaSoftwareTesters'                     => 'QA',
      'Labor-of-Love-a-technology-side-project-meetup' => 'Side Projects',
      'Greater-Lansing-Infrastructure-Meetup'          => 'Infrastructure',
      'Lansing-Area-R-Users-Group'                     => 'R',
      'Lansing-Atlassian-User-Group'                   => 'Atlassian',
      'Coders-Club-at-Coders-Farm'                     => 'Coders Club',
      'Mid-Michigan-Code-Retreat'                      => 'Code Retreat'
    }[slug] || 'General'
  end

end
