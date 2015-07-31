require 'rest-client'
require 'json'

class LansingCodes::ExternalEndpoints::Base

private

  def get_json
    JSON.parse( RestClient.get(@url) )
  end

end
