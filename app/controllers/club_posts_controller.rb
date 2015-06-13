class ClubPostsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :add_photo, :like, :unlike, :destroy, :follow, :unfollow]
  before_action :find_clubpost, only: [:add_photo, :like, :unlike, :get_all_likes, :get_k_first_like]
  before_action :is_member?, only: [:create, :update, :destroy]

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

  def update
    byebug
    @clubpost = ClubPost.find(clubpost_params[:id])
    if @clubpost.update_attribute(:content, clubpost_params[:content])

      if clubpost_params[:deleted_photos]
        clubpost_params[:deleted_photos].each do |photo_id|
          begin
            byebug
            photo = @clubpost.photos.find(photo_id)
            photo.destroy
          rescue Mongoid::Errors::DocumentNotFound
          end
        end
      end

      render json: @clubpost, status: :ok

    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def add_photo
    begin
      # byebug
      @photos = Photo.new(image: params[:file])
      @clubpost.photos ||=[]
      @clubpost.photos << @photos
      render json: @photos, status: :created
    rescue Exception
      render nothing: true, status: :bad_request, content_type: 'application/json'
    end
  end

  def like
    if @clubpost.likes.where('user_id' => current_user.id).first
      render nothing: true, status: :bad_request, content_type: 'application/json'
    else
      like = @clubpost.likes.create(user: current_user)
      #Tao thong bao
      #Chi thong bao khi ai do thich bai viet ma ai do theo doi va ko thong bao khi chu bai viet tu thich bai viet cua minh
      if @clubpost.user != current_user
        #TH2: Neu ai do thich bai post cua nguoi do, thi
        #gui thong bao den tat ca nguoi theo doi, nguoi chu bai viet , tuy
        #nhien ko gui thong bao den nguoi thich
        #B1: Gui thong bao den cac nguoi theo doi vs loai "ai do thich bai viet ban dang theo doi"
        target_user_ids = @clubpost.follower_ids.clone
        target_user_ids.delete(current_user.id)
        NotificationChange.create_notifications(target_user_ids, @clubpost, current_user, like, NotificationCategory.thich_bai_viet_ban_dang_theo_doi)
        #B2: Gui thong bao den chu bai viet vs loai "ai do thich bai viet cua ban"
        NotificationChange.create_notifications([@clubpost.user.id], @clubpost,  current_user, like, NotificationCategory.thich_bai_viet)
      end
      render nothing: true, status: :created, content_type: 'application/json'
    end
  end

  def unlike
    like = @clubpost.likes.where('user_id' => current_user.id).first
    if like
      #Xoa thong bao neu co the
      #Neu thong bao do chua dc load va xem (is_new = true) thi xoa no di, con neu da dc xem rui thi coi nhu la lich su
      if @clubpost.user != current_user
        #TH2: Xoa cac thong bao dc gui toi followers duoi dang "ai do thich bai viet ban dang theo doi" va
        #xoa thong bao gui toi chu bai viet duoi dang "binh luan len bai viet cua ban"
        target_user_ids = @clubpost.follower_ids.clone
        target_user_ids.delete(current_user.id)
        NotificationChange.delete_notification_changes(target_user_ids, @clubpost, current_user, like, NotificationCategory.thich_bai_viet_ban_dang_theo_doi)
        NotificationChange.delete_notification_changes([@clubpost.user.id], @post,  current_user, like, NotificationCategory.thich_bai_viet)
      end

      like.destroy
      render nothing: true, status: :ok, content_type: 'application/json'
    else
      render nothing: true, status: :bad_request, content_type: 'application/json'
    end
  end

  def get_k_first_like
    if params.has_key?(:number)
      @likes = @clubpost.likes.limit(params[:number].to_i).to_a
      render 'k_first_like.json.jbuilder', status: :ok
    else
      render nothing: true, status: :bad_request, content_type: 'application/json'
    end
  end


  def get_all_likes
    @likes = @clubpost.likes.all
    render 'posts/get_all_likes.json.jbuilder', status: :ok
  end

  private
  def clubpost_params
    params.permit(:id, :club_id, :content, :deleted_photos => [])
  end

  def find_clubpost
    begin
      @clubpost = ClubPost.find(clubpost_params[:id])
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found
    end
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
