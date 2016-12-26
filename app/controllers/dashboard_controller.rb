class DashboardController < ApplicationController
  before_action :authenticate_request, only: [:get_students, :write_bloc_note, :get_bloc_notes]

  def get_students
    students = Bloc.get_students(@current_user.bloc_api_key)
    render json: students
  end

  def get_bloc_notes
      notes = Bloc.get_bloc_notes_for(@current_user.bloc_api_key, params[:slug])
      notes = pull_notes_from(notes)
      render json: notes
  end

  def write_bloc_note
    note = Bloc.write_note(@current_user.bloc_api_key, params[:slug], params[:note][:title], params[:note][:body])
    render json: note
  end

  private

  def pull_notes_from(array)
    array.select {|e| e['name'] == "Note"} #|| e['name'] == "Weekly Update"
  end

end
