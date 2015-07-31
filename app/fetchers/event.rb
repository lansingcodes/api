require_relative 'group'

class LansingCodes::Fetchers::Event
  class << self

    def upcoming query=nil
      events = query ? search_upcoming(query) : all_upcoming
      LansingCodes::Representers::Events.new events
    end

  private

    def all_upcoming
      LansingCodes::Fetchers::Group.all.map do |group|
        LansingCodes::ExternalEndpoints::Meetup.new("events?group_id=#{group['id']}&status=upcoming&page=1").get
      end.flatten.sort_by do |event|
        event['time']
      end
    end

    def search_upcoming query
      matching_group =  LansingCodes::Fetchers::Group.search query
      return [] if matching_group.nil?
      LansingCodes::ExternalEndpoints::Meetup.new("events?group_id=#{matching_group['id']}&status=upcoming&page=1").get
    end

  end
end
