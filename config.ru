require File.join File.dirname(__FILE__), 'lib/events_api'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :get
  end
end

use Rack::ConditionalGet
use Rack::ETag

run Rack::Cascade.new [
  EventsAPI
]
