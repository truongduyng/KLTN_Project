class ClubsController < ApplicationController
  before_action :authenticate_user!
  before_action :is_admin?, only: [:addmember, :makeadmin, :update, :add_cover, :removeadmin]
  before_action :can_remove_member?, only: [:removemember]
  before_action :is_member?, only: [:show]

  def index
    @clubs = current_user.clubs
  end

  def show
    if(club_params[:club_post_id])
      begin
        @club_post = [@club.club_posts.find(club_params[:club_post_id])]
      rescue Exception => e
        render nothing: true, status: :bad_request
      end
    end
  end

  def create
    begin
      @club = Club.new(club_params.except(:members))
      @club.admins = [current_user.id]
      if @club.save
        @club.members = User.where(:fullname.in => (club_params[:members] << current_user.fullname))
        render template: "clubs/show.json.jbuilder", status: :ok
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

  def add_cover
    begin
      if @club.cover_image
        @club.cover_image.destroy
      end
      @club.cover_image = Image.create({image: params[:cover_image]})
      @club.save
      render json: @club.cover_image, status: :ok
    rescue Exception => e
      render nothing: true, status: :bad_request
    end
  end

  def find_members
    begin
      @club = Club.find(club_params[:id])
      @results =  @club.members.any_of({fullname: /#{params[:member_name]}/i}).limit(7).to_a
      @results.delete(current_user)
      render template: "users/find_user_by_username.json.jbuilder"
    rescue Exception => e
      render json: ""
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
      # byebug
      if @club.members.include? @member

        @club.members.delete(@member)

        if @club.members.count == 0
          @club.destroy
          render json: nil, status: :ok
          return
        end

        if @club.admins.include? @member.id
          @club.admins.delete(@member.id)

          if @club.admins.count == 0
            User.where(:fullname.in => club_params[:admins]).each do |admin|
              @club.admins << admin.id
            end
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
    # byebug
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
    params.permit(:id, :name, :description, :admin_id, :member_id, :club_post_id, :admins => [], :members => [])
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

  def can_remove_member?
    begin
      @club = Club.find(club_params[:id])
      @member =  User.find(club_params[:member_id])
      if !(@member.id == current_user.id || @club.admins.include?(current_user.id))
        render nothing: true, status: :bad_request
      end
    rescue Exception => e

    end
  end

end