class NotesController < ApplicationController
  before_action :authenticate_request, only: [:create, :index, :destroy]
  def index
    @notes = @current_user ? @current_user.notes.order(created_at: :desc) : []
    render json: @notes, include: {user: {only: [:handle]}}
  end

  def create
    @note = @current_user.notes.build(note_params)
    if @note.save
      render json: @note, include: {user: {only: [:handle]}}
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @note = @current_user.notes.find(params[:id])

    if (@current_user.id == @note.user_id) && @note.delete
      head :no_content
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
