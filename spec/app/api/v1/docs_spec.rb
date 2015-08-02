require 'json'

describe LansingCodes::API::V1::Docs do
  include Rack::Test::Methods

  def app
    LansingCodes::API::V1::Docs
  end

  context 'GET /v1' do

    before do
      get '/v1'
      @links = JSON.parse(last_response.body)['links']
    end

    it 'returns a link to the source' do
      expect(@links['source']).to eq('https://github.com/lansingcodes/api')
    end

    it 'returns a link to the docs' do
      expect(@links['docs']).to eq('https://github.com/lansingcodes/api/blob/master/README.md')
    end

    it 'returns a collection of endpoints' do
      expect(@links['endpoints']).not_to be_nil
    end

  end
end
