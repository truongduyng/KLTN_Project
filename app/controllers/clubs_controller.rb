class ClubsController < ApplicationController
  before_action :authenticate_user!
  before_action :is_admin?, only: [:addmember, :removemember, :makeadmin, :removeadmin, :update]
  before_action :is_member?, only: [:show]

  def index
    @clubs = current_user.clubs
  end

  def show
  end

  def create
    begin
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

  def update
    if @club.update_attributes(club_params.except(*[:id, :members]))
      render template: "clubs/show.json.jbuilder"
    else
      render nothing: true, status: :bad_request
    end
  end

  def addmember
    begin
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
      member =  User.find(club_params[:member_id])
      if @club.members.include? member

        @club.members.delete(member)

        if @club.members.count == 0
          @club.destroy
          render json: nil, status: :ok
        end

        if @club.admins.include? member.id
          @club.admins.delete(admin.id)

          if @club.admins.count == 0
            @club.admins << club_params[:admin_id]
            @club.save
          end

          @club.save
        end

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
      admin =  User.find(club_params[:admin_id])
      if @club.members.include?(admin) && !@club.admins.include?(admin.id)
        @club.admins << admin.id
        @club.save
        render nothing: true, status: :ok
      else
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  def removeadmin
    begin
      admin =  User.find(club_params[:admin_id])
      if @club.members.include?(admin) && @club.admins.include?(admin.id)
        @club.admins.delete(admin.id)
        @club.save
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
    params.permit(:id, :name, :description, :member_id, :admin_id, members: [])
  end

  def is_member?
    begin
      @club= Club.find(club_params[:id])
      if !@club.members.include? current_user
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :not_found
    end
  end

  def is_admin?
    begin
      @club = Club.find(club_params[:id])
      if !@club.admins.include? current_user.id
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :not_found
    end
  end

end