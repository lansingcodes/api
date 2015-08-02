require 'grape'

class LansingCodes::API::Root < Grape::API
  content_type :html, 'text/html'
  default_format :html

  get '/' do
    redirect 'https://github.com/lansingcodes/api'
  end
end
