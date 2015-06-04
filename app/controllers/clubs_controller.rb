class ClubsController < ApplicationController

  def index

  end

  def create
    begin
      byebug
      @club = Club.create(club_params)
      render json: @club, status: :ok
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  private
  def club_params
    params[:members] ||= []
    params.permit(:id, :name, :description, members: [:user_id])
  end

end