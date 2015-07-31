require 'rest-client'
require 'json'

class Endpoint

  KEY = ENV['MEETUP_API_KEY']

  def initialize url
    @url = "https://api.meetup.com/2/#{url}&key=#{KEY}"
  end

  def get
    JSON.parse( RestClient.get(@url) )['results']
  end

end