class ClubPostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :add_photo, :like, :unlike, :destroy, :follow, :unfollow]
  before_action :is_member?

  def show
  end

  def create
    # byebug
    @clubpost = ClubPost.new(content: clubpost_params[:content])
    @clubpost.user = current_user
    @clubpost.club = @club

    if @clubpost.save
      render template: 'club_posts/show.json.jbuilder', status: :created
    else
      render json: @clubpost.errors, status: :unprocessable_entity
    end
  end

  def add_photo
    begin
      # byebug
      @clubpost = ClubPost.find(clubpost_params[:id])
      @photos = Photo.new(image: params[:file])
      @clubpost.photos ||=[]
      @clubpost.photos << @photos
      render json: @photos, status: :created
    rescue Exception
      render nothing: true, status: :bad_request, content_type: 'application/json'
    end
  end

  private
  def clubpost_params
    params.permit(:id, :club_post_id, :club_id, :content)
  end

  def is_member?
    begin
      @club= Club.find(clubpost_params[:club_id])
      if !@club.members.include? current_user
        render nothing: true, status: :bad_request
      end
    rescue Exception => e
      render nothing: true, status: :not_found
    end
  end

end
