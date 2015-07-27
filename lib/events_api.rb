require 'grape'
require 'rest-client'
require 'json'

KEY = ENV['MEETUP_API_KEY']
LANSING_CODES_ID = 189827394

module Events
  class API < Grape::API
    version 'v1', using: :header, vendor: 'meetup'
    prefix 'api/v1'
    format :json

    resource :events do

      resource :upcoming do
        desc "Return a list of upcoming Lansing coding events."
        get :list do
          Event.upcoming
        end

        desc "Returns a list of upcoming events for a specific query."
        resource :search do
          params do
            requires :query, type: String, desc: "Event query."
          end
          route_param :query do
            get do
              Event.upcoming params[:query]
            end
          end
        end
      end
    end
  end
end

class Group
  class << self
    def all
      Endpoint.get "https://api.meetup.com/2/groups?member_id=#{LANSING_CODES_ID}&key=#{KEY}"
    end
  end
end

class Event
  class << self

    def upcoming query=nil
      query ? upcoming_search(query) : all_upcoming
    end

  private

    def all_upcoming
      Group.all.map do |group|
        Endpoint.get "https://api.meetup.com/2/events?group_id=#{group['id']}&status=upcoming&page=1&key=#{KEY}"
      end.flatten
    end

    def upcoming_search query
      query = case query
      when 'js' then 'javascript'
      when 'rb' then 'ruby'
      else query
      end

      matching_group = Group.all.find do |group|
        %w( name description ).any? do |field|
          group[field].scan(/#{query}/i).any?
        end
      end
      return [] if matching_group.nil?

      Endpoint.get "https://api.meetup.com/2/events?group_id=#{matching_group['id']}&status=upcoming&page=1&key=#{KEY}"
    end

  end
end

class Endpoint
  class << self
    def get url
      JSON.parse(RestClient.get(url))['results']
    end
  end
end
