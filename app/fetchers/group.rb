class LansingCodes::Fetchers::Group
  class << self

    LANSING_CODES_ID = 189827394

    def all
      LansingCodes::ExternalEndpoints::Meetup.new("groups?member_id=#{LANSING_CODES_ID}").get
    end

    def search query
      all.find do |group|
        %w( name description ).any? do |field|
          group[field].scan(/#{synonyms_of query}/i).any?
        end
      end
    end

  private

    def synonyms_of query
      case query
      when 'js' then 'javascript'
      when 'rb' then 'ruby'
      else query
      end
    end

  end
end
