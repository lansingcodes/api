module LansingCodes; end

# Helpers
module LansingCodes::Helpers; end
Dir["#{File.dirname(__FILE__)}/app/helpers/**/*.rb"].each { |f| require f }

# Representers
module LansingCodes::Representers; end
Dir["#{File.dirname(__FILE__)}/app/representers/**/*.rb"].each { |f| require f }

# External Endpoints
module LansingCodes::ExternalEndpoints; end
require_relative 'app/external_endpoints/base'
Dir["#{File.dirname(__FILE__)}/app/external_endpoints/**/*.rb"].each { |f| require f }

# Fetchers
module LansingCodes::Fetchers; end
Dir["#{File.dirname(__FILE__)}/app/fetchers/**/*.rb"].each { |f| require f }

# APIs
module LansingCodes::API
  module V1; end
end
require_relative 'app/api/v1/base'
Dir["#{File.dirname(__FILE__)}/app/api/**/*.rb"].each { |f| require f }

ApplicationServer = Rack::Cascade.new [
  LansingCodes::API::Root,
  LansingCodes::API::V1::Docs,
  LansingCodes::API::V1::Events
]
