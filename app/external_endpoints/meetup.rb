class LansingCodes::ExternalEndpoints::Meetup < LansingCodes::ExternalEndpoints::Base

  KEY = ENV['MEETUP_API_KEY']

  def initialize url
    @url = "https://api.meetup.com/2/#{url}&key=#{KEY}"
  end

  def get
    get_json['results']
  end

end
