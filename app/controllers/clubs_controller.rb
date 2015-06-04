class ClubsController < ApplicationController
  before_action :authenticate_user!

  def index
    @clubs = current_user.clubs
  end

  def create
    begin
      byebug
      @club = Club.new(club_params.except(:members))
      @club.admins = [current_user.id]
      if @club.save
        @club.members = User.where(:fullname.in => (club_params[:members] << current_user.fullname))
        render json: @club, status: :ok
      end
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  private
  def club_params
    params[:members] ||= []
    params.permit(:id, :name, :description, members: [])
  end

end