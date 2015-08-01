# Set environment to test
ENV['RACK_ENV'] = 'test'

# Ensure bundle exec
Bundler.require :default, ENV['RACK_ENV'].to_sym

# Require externals
require 'rack/test'
require 'webmock/rspec'

# Require helpers
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

# Require app
require_relative '../application'

# Configure rspec
RSpec.configure do |config|
  config.order = :random
end
