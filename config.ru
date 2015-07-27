require File.join File.dirname(__FILE__), 'lib/events_api'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :get
  end
end

run Rack::Cascade.new [
  Events::API
]
