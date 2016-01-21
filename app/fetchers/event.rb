require 'garner'

require_relative 'group'

class LansingCodes::Fetchers::Event
  class << self
    include Garner::Cache::Context

    def upcoming query=nil
      events = query ? search_upcoming(query) : all_upcoming
      LansingCodes::Representers::Events.new events
    end

  private

    def all_upcoming
      LansingCodes::Fetchers::Group.all.map do |group|
        fetch_group_events group['id']
      end.flatten.sort_by do |event|
        event['time']
      end
    end

    def search_upcoming query
      matching_group = LansingCodes::Fetchers::Group.search query
      return [] if matching_group.nil?
      fetch_group_events matching_group['id']
    end

    def fetch_group_events group_id
      garner.options(expires_in: 1.hour).key({group_id: group_id}) do
        LansingCodes::ExternalEndpoints::Meetup.new("events?group_id=#{group_id}&status=upcoming&page=1").get
      end
    end

  end
end
