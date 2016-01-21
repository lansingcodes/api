require_relative 'base'

class LansingCodes::API::V1::Events < LansingCodes::API::V1::Base

  # /v1/events
  resource :events do

    # /v1/events/upcoming
    resource :upcoming do

      # /v1/events/upcoming/list
      desc "Return a list of upcoming Lansing coding events."
      get :list do
        LansingCodes::Fetchers::Event.upcoming
      end

      # /v1/events/upcoming/search
      desc "Returns a list of upcoming events for a specific query."
      resource :search do
        params do
          requires :query, type: String, desc: "Group focus query."
        end

        # /v1/events/upcoming/search/:query
        route_param :query do
          get do
            LansingCodes::Fetchers::Event.upcoming params[:query]
          end
        end

      end
    end
  end
end
