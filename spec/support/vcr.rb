require 'vcr'

ENV['MEETUP_API_KEY'] ||= 'mock_api_key'

VCR.configure do |config|
  config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  config.hook_into :webmock
  config.filter_sensitive_data('<MEETUP_API_KEY>') { ENV['MEETUP_API_KEY'] }
  config.ignore_localhost = true
  config.ignore_hosts 'codeclimate.com'
end
