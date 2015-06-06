class ClubsController < ApplicationController
  before_action :authenticate_user!
  # before_action :is_member?, only: [:show]

  def index
    @clubs = current_user.clubs
  end

  def show
    begin
      # byebug
      @club = Club.find(club_params[:id])
      if !@club.members.include?(current_user)
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  def create
    begin
      # byebug
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

  def addmember
    begin

      @club = Club.find(club_params[:id])
      if !@club.admins.include? current_user.id
        render nothing: true, status: :bad_request
      end
      member =  User.find(club_params[:member_id])
      if !@club.members.include? member
        @club.members << member
        render nothing: true, status: :ok
      else
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  def removemember
    begin
      # byebug
      @club = Club.find(club_params[:id])
      if !@club.admins.include? current_user.id
        render nothing: true, status: :bad_request
      end
      member =  User.find(club_params[:member_id])
      if @club.members.include? member
        @club.members.delete(member)
        render nothing: true, status: :ok
      else
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  def makeadmin
    begin
      byebug
      @club = Club.find(club_params[:id])
      if !@club.admins.include? current_user.id
        render nothing: true, status: :bad_request
      end
      admin =  User.find(club_params[:member_id])
      if !@club.admins.include? admin.id
        @club.admins << admin.id
        render nothing: true, status: :ok
      else
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  private
  def club_params
    params[:members] ||= []
    params.permit(:id, :name, :description,:member_id, members: [])
  end

end