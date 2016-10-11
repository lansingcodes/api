require 'garner'

class LansingCodes::Fetchers::Group
  class << self
    include Garner::Cache::Context

    LANSING_CODES_ID = 189827394

    def all
      garner.options(expires_in: 1.hour) do
        LansingCodes::ExternalEndpoints::Meetup.new("groups?member_id=#{LANSING_CODES_ID}").get
      end
    end

    def search query
      all.find do |group|
        %w( name description ).any? do |field|
          group[field].scan(/\b#{synonyms_of query}\b/i).any?
        end
      end
    end

  private

    def synonyms_of query
      synonym_map[query] || query
    end

    def synonym_map
      {
        "js" => 'javascript',
        "rb" => 'ruby',
        "qa" => 'testers',
      }
    end

  end
end
