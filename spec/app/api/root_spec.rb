describe LansingCodes::API::V1::Events do
  include Rack::Test::Methods

  def app
    LansingCodes::API::Root
  end

  context 'GET /' do

    before do
      get '/' do
        follow_redirect!
      end
    end

    it 'redirects to the github repo' do
      expect(last_request.url).to eq('https://github.com/lansingcodes/api')
    end

  end
end
