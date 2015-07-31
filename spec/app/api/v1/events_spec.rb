require 'json'

describe LansingCodes::API::V1::Events do
  include Rack::Test::Methods

  def app
    LansingCodes::API::V1::Events
  end

  context 'GET /v1/events/upcoming/list' do

    before do
      VCR.use_cassette('v1_events_upcoming_list') do
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

    context 'query is "javascript"' do

      before do
        VCR.use_cassette('v1_events_upcoming_search_javascript') do
          get '/v1/events/upcoming/search/javascript'
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
        VCR.use_cassette('v1_events_upcoming_search_blarshgyblah') do
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
        VCR.use_cassette('v1_events_upcoming_search_js') do
          get '/v1/events/upcoming/search/js'
        end
      end

      it 'returns OK' do
        expect(last_response.status).to eq(200)
      end

      it 'returns the same thing as when searching for javascript' do
        js_response = JSON.parse(last_response.body)
        VCR.use_cassette('v1_events_upcoming_search_javascript') do
          get '/v1/events/upcoming/search/javascript'
        end
        javascript_response = JSON.parse(last_response.body)
        expect(js_response).to eq(javascript_response)
      end

    end

    context 'query is "rb"' do

      before do
        VCR.use_cassette('v1_events_upcoming_search_rb') do
          get '/v1/events/upcoming/search/rb'
        end
      end

      it 'returns OK' do
        expect(last_response.status).to eq(200)
      end

      it 'returns the same thing as when searching for ruby' do
        rb_response = JSON.parse(last_response.body)
        VCR.use_cassette('v1_events_upcoming_search_ruby') do
          get '/v1/events/upcoming/search/ruby'
        end
        ruby_response = JSON.parse(last_response.body)
        expect(rb_response).to eq(ruby_response)
      end

    end
  end
end
