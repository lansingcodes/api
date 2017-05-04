require 'rest-client'
require 'json'

class LansingCodes::ExternalEndpoints::Base

  MAX_RETRIES = 3

private

  def get_json
    json = ''
    attempts = 0

    # Temporary workaround for https://github.com/meetup/api/issues/220
    loop do
      json = RestClient.get(@url)
      attempts += 1
      break if attempts >= MAX_RETRIES || (json && json.length >= 2)
    end

    JSON.parse(json)
  end

end
