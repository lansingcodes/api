require_relative 'base'

class LansingCodes::API::V1::Docs < LansingCodes::API::V1::Base
  get '/' do
    {
      links: {
        source: 'https://github.com/lansingcodes/api',
        docs: 'https://github.com/lansingcodes/api/blob/master/README.md',
        endpoints: {
          events: {
            get: [
              'http://api.lansing.codes/v1/events/upcoming/list',
              'http://api.lansing.codes/v1/events/upcoming/search/:query'
            ]
          }
        }
      }
    }
  end
end
