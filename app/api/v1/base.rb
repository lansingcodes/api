require 'grape'
require 'garner/mixins/rack'

class LansingCodes::API::V1::Base < Grape::API
  def self.inherited subclass
    super
    subclass.instance_eval do
      version 'v1', using: :header, vendor: 'Lansing.Codes'
      prefix 'v1'
      format :json
    end
  end
end
