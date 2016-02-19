require 'garner'

require_relative 'group'

class LansingCodes::Fetchers::Event
  class << self
    include Garner::Cache::Context

    def upcoming query=nil
      data = query ? search_upcoming(query) : all_upcoming
      LansingCodes::Representers::Events.new data
    end

  private

    def all_upcoming
      LansingCodes::Fetchers::Group.all.map do |group|
        fetch_group_events(group['id']).map do |event|
          {
            'event' => event,
            'group' => group
          }
        end
      end.flatten.sort_by do |datum|
        datum['event']['time']
      end
    end

    def search_upcoming query
      matching_group = LansingCodes::Fetchers::Group.search query
      return [] if matching_group.nil?
      fetch_group_events(matching_group['id']).map do |event|
        {
          'event' => event,
          'group' => matching_group
        }
      end
    end

    def fetch_group_events group_id
      garner.options(expires_in: 1.hour).key({group_id: group_id}) do
        LansingCodes::ExternalEndpoints::Meetup.new("events?group_id=#{group_id}&status=upcoming").get
      end
    end

  end
end
