require File.join File.dirname(__FILE__), 'lib/events_api'

run Rack::Cascade.new [
  Events::API
]
