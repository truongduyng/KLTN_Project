class PostsController < ApplicationController
	before_action :authenticate_user!, only: [:create, :add_photo, :delete_photo, :like, :unlike, :edit, :update, :destroy, :follow, :unfollow]
	before_action :find_published_post, only: [:like, :unlike, :get_k_first_like, :get_all_likes, :follow, :unfollow]
	before_action :find_and_check_post_with_user, only: [:add_photo, :destroy]
	before_action :find_post_for_show, only: [:show]
	before_action :find_post_for_edit, only: [:edit, :delete_photo, :update]

	#/posts.json
	#Get all published post for display on home
	def index
		@posts = Post.published.desc(:updated_at).paginate(page: params[:page], per_page: 9)
	end

	def search
		@posts = Post.published.desc(:updated_at).text_search(params[:search_word]).to_a
		render 'index.json.jbuilder'
	end

	def show
	end

	def create
		@post = Post.new(post_params)
		@post.user = current_user
		if @post.save
			render :show, status: :created, location: @post
		else
			render json: @post.errors, status: :unprocessable_entity
		end
	end

	#GET /posts/:id.json
	def edit

	end

	#PUT /posts/:id/update.json
	def update
		#Cap nhap cac thuoc tinh cua post va save
		if @post.update_attributes(post_params)
			#Lay mang danh sach id cua cac anh da bi xoa
			deleted_photos = params.permit(:deleted_photos => [])
			#Tien hanh xoa no
			if deleted_photos[:deleted_photos]
				deleted_photos[:deleted_photos].each do |photo_id|
					begin
						photo = @post.photos.find(photo_id)
						photo.destroy
					rescue Mongoid::Errors::DocumentNotFound
					end
				end
			end
			render :show, status: :ok, location: @post
		else
			render json: @post.errors, status: :unprocessable_entity
		end
	end

	#/DELETE posts/:id.json
	def destroy
		#xoa tat ca bai viet yeu thich gan voi post nay
		FavoritePost.where(post_id: @post.id).destroy_all
		#Neu photo ko embeded in post thi xoa lun photo
		@post.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	#/posts/:id/add_photo
	def add_photo
		begin
			@photo = Photo.new(image: params[:file])
			@post.photos ||=[]
			@post.photos << @photo
			render json: @post.photos, status: :created
		rescue Exception
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	#DELETE /posts/:id/delete_photo
	def delete_photo
		begin
			@photo = @post.photos.find(params[:photo_id])
			@photo.destroy
			render nothing: true, status: :ok,  content_type: 'application/json'
		rescue Mongoid::Errors::DocumentNotFound
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

	# /posts/:id/like
	def like
		if @post.likes.where('user_id' => current_user.id).first
			render nothing: true, status: :bad_request, content_type: 'application/json'
		else
			like = @post.likes.create(user: current_user)
			#Tao thong bao
			#Chi thong bao khi ai do thich bai viet ma ai do theo doi va ko thong bao khi chu bai viet tu thich bai viet cua minh
			if @post.user != current_user
				#TH2: Neu ai do thich bai post cua nguoi do, thi
				#gui thong bao den tat ca nguoi theo doi, nguoi chu bai viet , tuy
				#nhien ko gui thong bao den nguoi thich
				#B1: Gui thong bao den cac nguoi theo doi vs loai "ai do thich bai viet ban dang theo doi"
				target_user_ids = @post.follower_ids.clone
				target_user_ids.delete(current_user.id)
				NotificationChange.create_notifications(target_user_ids, @post, current_user, like, NotificationCategory.thich_bai_viet_ban_dang_theo_doi)
				#B2: Gui thong bao den chu bai viet vs loai "ai do thich bai viet cua ban"
				NotificationChange.create_notifications([@post.user.id], @post,  current_user, like, NotificationCategory.thich_bai_viet)
			end
			render nothing: true, status: :created, content_type: 'application/json'
		end
	end

	#/posts/:id/unlike
	def unlike
		like = @post.likes.where('user_id' => current_user.id).first
		if like
			#Xoa thong bao neu co the
			#Neu thong bao do chua dc load va xem (is_new = true) thi xoa no di, con neu da dc xem rui thi coi nhu la lich su
			if @post.user != current_user
				#TH2: Xoa cac thong bao dc gui toi followers duoi dang "ai do thich bai viet ban dang theo doi" va
				#xoa thong bao gui toi chu bai viet duoi dang "binh luan len bai viet cua ban"
				target_user_ids = @post.follower_ids.clone
				target_user_ids.delete(current_user.id)
				NotificationChange.delete_notification_changes(target_user_ids, @post, current_user, like, NotificationCategory.thich_bai_viet_ban_dang_theo_doi)
				NotificationChange.delete_notification_changes([@post.user.id], @post,  current_user, like, NotificationCategory.thich_bai_viet)
			end

			like.destroy
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	# /posts/:id/get_k_first_like.json
	def get_k_first_like
		if params.has_key?(:number)
			@likes = @post.likes.limit(params[:number].to_i).to_a
			render 'k_first_like.json.jbuilder', status: :ok
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	#/posts/:id/get_all_likes.json
	def get_all_likes
		@likes = @post.likes.all
		render 'get_all_likes.json.jbuilder', status: :ok
	end


	#PUT /posts/:id/follow.json
	def follow
		#TH1: Nguoi do ko tu theo doi bai viet nguoi do.
		#TH2: Chi follow khi nguoi do chua follow
		if current_user != @post.user &&  !@post.follower_ids.include?(current_user.id) && !current_user.followed_post_ids.include?(@post.id)
			@post.follower_ids << current_user.id
			current_user.followed_post_ids << @post.id
			@post.save
			current_user.save
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	#PUT /posts/:id/unfollow.json
	def unfollow
		#TH1: Nguoi do ko tu bo theo doi bai viet nguoi do.
		#Chi unfollow khi nguoi do da follow
		if  current_user != @post.user &&  @post.follower_ids.include?(current_user.id)  && current_user.followed_post_ids.include?(@post.id)
			@post.follower_ids.delete current_user.id
			current_user.followed_post_ids.delete @post.id
			@post.save
			current_user.save
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	def get_posts_by_username
		user = User.where(username: params[:username]).first
		page = params[:page]
		per_page = params[:per_page]
		if user
			#Nguoi dung dang nhap chinh la nguoi dung dang xem lay tat cac post
			# byebug
			if user_signed_in? && user == current_user
				if params[:text_search].nil?
					@all_posts = user.posts.desc(:updated_at).paginate(page: page, per_page: per_page);
					@total = user.posts.count
				else
					@all_posts = user.posts.desc(:updated_at).text_search(params[:text_search])
				end
			else
				#lay chi nhung post da publish
				publishedStatus = PostStatus.publishedStatus
				if params[:text_search].nil?
					@all_posts = user.posts.where(post_status_id: publishedStatus.id).desc(:updated_at).paginate(page: page, per_page: per_page)
					@total = user.posts.where(post_status_id: publishedStatus.id).count
				else
					@all_posts = user.posts.where(post_status_id: publishedStatus.id).desc(:updated_at).text_search(params[:text_search])
				end
			end
			render 'get_posts_by_username.json.jbuilder', status: :ok
		else
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end


	def get_favorite_posts_by_username
		user = User.where(username: params[:username]).first
		page = params[:page]
		per_page = params[:per_page]
		if user

			if params[:text_search].nil?
				@favorite_posts = user.favorite_posts.desc(:updated_at).paginate(page: page, per_page: per_page)
				@total = user.favorite_posts.count
				render 'get_favorite_posts_by_username.json.jbuilder', status: :ok
			else
				@all_fav_posts = Post.where(:id.in => user.favorite_posts.collect{|fav_post| fav_post.post_id.to_s}).text_search(params[:text_search])
				render 'search_fav_posts.json.jbuilder', status: :ok
			end

		else
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

	private
	def post_params
		params.require(:post).permit(:title, :body)
	end

	def find_and_check_post_with_user
		begin
			@post = Post.find(params[:id])
			if @post.user != current_user
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		rescue Mongoid::Errors::DocumentNotFound
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

	def find_published_post
		begin
			@post = Post.find(params[:id])
			if !@post.published?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		rescue Mongoid::Errors::DocumentNotFound
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

		#Post hoac publish hoac la chinh cua la nguoi do
		def find_post_for_show
			begin
				@post = Post.find(params[:id])
				if !@post.published?
					#chua chung thuc
					if !user_signed_in?
						render nothing: true, status: :not_found, content_type: 'application/json'
					else
						#chung thuc rui ma ko phai bai viet cua nguoi do
						if @post.user != current_user
							render nothing: true, status: :not_found, content_type: 'application/json'
						end
					end
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		def find_post_for_edit
			begin
				@post = Post.find(params[:id])
				#neu da publish thi ko cho chinh sua
				if @post.published?
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
				#chi cho phep nguoi so huu post de chinh sua
				if @post.user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

	end
