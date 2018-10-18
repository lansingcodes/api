require 'json'

# If it's from a fork, don't re-record cassettes, because they
# would inevitably fail without access to the MEETUP_API_KEY
RE_RECORD_INTERVAL = ENV['MEETUP_API_KEY'] == 'mock_api_key' ? 1000.years : 1.week

describe LansingCodes::API::V1::Events do
  include Rack::Test::Methods

  def app
    LansingCodes::API::V1::Events
  end

  context 'GET /v1/events/upcoming/list' do

    before do
      VCR.use_cassette('v1_events_upcoming_list', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
        get '/v1/events/upcoming/list'
      end
    end

    it 'returns OK' do
      expect(last_response.status).to eq(200)
    end

    it 'returns an object with a "data" key pointing to a non-empty array' do
      results = JSON.parse(last_response.body)['data']
      expect(results).to be_an(Array)
      expect(results.any?).to eq(true)
    end
  end

  context 'GET /v1/events/upcoming/search/:query' do

    context 'query is "devops"' do

      before do
        VCR.use_cassette('v1_events_upcoming_search_devops', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
          get '/v1/events/upcoming/search/devops'
        end
      end

      it 'returns OK' do
        expect(last_response.status).to eq(200)
      end

      it 'returns an object with a "data" key pointing to a single-item array' do
        results = JSON.parse(last_response.body)['data']
        expect(results).to be_an(Array)
        expect(results.size).to eq(1)
      end

    end

    context 'query is "blarshgyblah"' do

      before do
        VCR.use_cassette('v1_events_upcoming_search_blarshgyblah', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
          get '/v1/events/upcoming/search/blarshgyblah'
        end
      end

      it 'returns OK' do
        expect(last_response.status).to eq(200)
      end

      it 'returns an object with a "data" key pointing to an empty array' do
        results = JSON.parse(last_response.body)['data']
        expect(results).to be_an(Array)
        expect(results.empty?).to eq(true)
      end

    end

    context 'query is "rb"' do

      before do
        VCR.use_cassette('v1_events_upcoming_search_js', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
          get '/v1/events/upcoming/search/js'
        end
      end

      it 'returns OK' do
        expect(last_response.status).to eq(200)
      end

      it 'returns the same thing as when searching for javascript' do
        js_response = JSON.parse(last_response.body)
        VCR.use_cassette('v1_events_upcoming_search_javascript', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
          get '/v1/events/upcoming/search/javascript'
        end
        javascript_response = JSON.parse(last_response.body)
        expect(js_response).to eq(javascript_response)
      end

    end

    context 'query is "rb"' do

      before do
        VCR.use_cassette('v1_events_upcoming_search_rb', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
          get '/v1/events/upcoming/search/rb'
        end
      end

      it 'returns OK' do
        expect(last_response.status).to eq(200)
      end

      it 'returns the same thing as when searching for ruby' do
        rb_response = JSON.parse(last_response.body)
        VCR.use_cassette('v1_events_upcoming_search_ruby', re_record_interval: RE_RECORD_INTERVAL, record: :new_episodes) do
          get '/v1/events/upcoming/search/ruby'
        end
        ruby_response = JSON.parse(last_response.body)
        expect(rb_response).to eq(ruby_response)
      end

    end
  end
end
