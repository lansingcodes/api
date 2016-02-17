require 'action_view'

module LansingCodes::Helpers::Time

  def relative_time_of js_time
    current_time = Time.now
    time_of_event = Time.at(js_time / 1000.0)
    time_in_words = distance_of_time_in_words current_time, time_of_event
    if current_time > time_of_event
      time_in_words += ' ago'
    end
    time_in_words
  end

private

  include ActionView::Helpers::DateHelper

end
