require 'action_view'

module LansingCodes::Helpers::Time

  def relative_time_of js_time
    distance_of_time_in_words Time.now, Time.at(js_time / 1000.0)
  end

private

  include ActionView::Helpers::DateHelper

end
