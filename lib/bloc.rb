module Bloc
  # Constants
  BASE_URL = 'https://www.bloc.io/api/v1'
  DASHBOARD_VISIBLE_STUDENTS_PATH = "#{BASE_URL}/dashboard/students_visible_on_dashboard"

  # def initialize(email, password)
  #   response = HTTParty.post("#{BASE_URL}/sessions", {body: {email: email, password: password}})
  #   @token = JSON.parse(response.body)['auth_token']
  # end
#
#   "time_zone": {
#     "name": "Mountain Time (US & Canada)",
#     "string": "(GMT-07:00) Mountain Time (US & Canada)",
#     "identifier": "America/Denver"
#   }
#
#   "enrollment": {
#   "current_week": 2,
#   "total_weeks": 54,
#   "start_date": "2016-10-24T00:00:00.000-07:00",
#   "program_end_date": "2017-11-06T00:00:00.000-08:00",
#   "percent_behind": 2,
#   "status": "active",
#   "appointments_per_week": 1,
#   "course_name": "Part-Time Web Developer Track",
# }

  def self.get_students(token)
    response = HTTParty.get(DASHBOARD_VISIBLE_STUDENTS_PATH, headers: {'authorization' => token})
    parsed_response = JSON.parse(response.body)
  end

  def self.get_bloc_notes_for(token, slug)
    response = HTTParty.get("#{BASE_URL}/users/#{slug}/account_events", headers: {'authorization' => token})
    parsed_response = JSON.parse(response.body)
  end

  def self.write_note(token, slug, title, body)
    url = "#{BASE_URL}/users/#{slug}/note?headline=#{title}&body=#{body}"
    response = HTTParty.post(url, {headers: {'authorization' => token}})
    parsed_response = JSON.parse(response.body)
  end
end
