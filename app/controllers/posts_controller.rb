class PostsController < ApplicationController
	before_action :authenticate_user!, only: [:create, :add_photo, :delete_photo, :like, :unlike, :edit, :update, :get_posts_by_current_user, :destroy]
	# before_action :authenticate_user!, only: [:destroy]
	before_action :find_published_post, only: [:like, :unlike, :get_k_first_like, :get_all_likes]
	before_action :find_and_check_post_with_user, only: [:add_photo, :destroy]
	before_action :find_post_for_show, only: [:show]
	before_action :find_post_for_edit, only: [:edit, :delete_photo, :update]

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
			@post.likes.create(user: current_user)
			render nothing: true, status: :created, content_type: 'application/json'
		end
		
	end

	#/posts/:id/unlike
	def unlike
		like = @post.likes.where('user_id' => current_user.id).first
		if like
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



	#cho trang profile
	#Lay tat ca nhung post boi username
	# #GET /posts/get_posts_by_username/:username
	# def get_posts_by_username 
	# 	@posts = User.where(username: )
	# end

	#tra ve tat ca post cho nguoi dung hien tai
	#GET /posts/get_posts_by_current_user.json
	def get_posts_by_current_user
		@all_posts = current_user.posts.all
		render 'get_posts_by_current_user.json.jbuilder', status: :ok
	end


	def get_posts_by_username
		user = User.where(username: params[:username]).first
		page = params[:page]
		per_page = params[:per_page]
		if user
			#Nguoi dung dang nhap chinh la nguoi dung dang xem lay tat cac post
			if user_signed_in? && user == current_user
				@all_posts = user.posts.desc(:updated_at).paginate(page: page, per_page: per_page)
				@total = user.posts.count
			else
				#lay chi nhung post da publish
				publishedStatus = PostStatus.publishedStatus
				@all_posts = user.posts.where(post_status_id: publishedStatus.id).desc(:updated_at).paginate(page: page, per_page: per_page)
				@total = user.posts.where(post_status_id: publishedStatus.id).count
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
			@favorite_posts = user.favorite_posts.desc(:updated_at).paginate(page: page, per_page: per_page)
			@total = user.favorite_posts.count
			render 'get_favorite_posts_by_username.json.jbuilder', status: :ok
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
				if !@post.published
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
				if !@post.published
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
				if @post.published
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


