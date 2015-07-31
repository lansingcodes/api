require File.join File.dirname(__FILE__), 'application'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :get
  end
end

use Rack::ConditionalGet
use Rack::ETag

run ApplicationServer
