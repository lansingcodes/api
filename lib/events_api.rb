require 'grape'
require 'garner/mixins/rack'

require_relative 'event'

class EventsAPI < Grape::API
  helpers Garner::Mixins::Rack

  version 'v1', using: :header, vendor: 'meetup'
  prefix 'v1'
  format :json

  # /v1/events
  resource :events do

    # /v1/events/upcoming
    resource :upcoming do

      # /v1/events/upcoming/list
      desc "Return a list of upcoming Lansing coding events."
      get :list do
        garner.options(expires_in: 1.hour) do
          Event.upcoming
        end
      end

      # /v1/events/upcoming/search
      desc "Returns a list of upcoming events for a specific query."
      resource :search do
        params do
          requires :query, type: String, desc: "Event query."
        end

        # /v1/events/upcoming/search/:query
        route_param :query do
          get do
            garner.options(expires_in: 1.hour) do
              Event.upcoming params[:query]
            end
          end
        end

      end
    end
  end
end