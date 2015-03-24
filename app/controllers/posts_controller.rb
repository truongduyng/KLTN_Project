# B1: Upload file nao len file do rieng re
# B2: Upload xong tra ve cai id cua cai photo do
# B3: Khi tao post, thi dua thong tin, cung cac id photo do len
# B4: Chi can dua vao id cua photo lay no va gan vao post hien tai
# B5: Neu ma nguoi dung thoat thi truoc khi thoat kiem tra danh sach anh post len va xoa tung anh da post
# class PostsController < ApplicationController
# 	before_action :authenticate_user!, only: [:create]
# 	before_action :find_post, only: [:show]

# 	def show	
# 	end

# 	def create
# 		@post = Post.new(post_params)
# 		@post.user = current_user
# 		if @post.save
# 			if params.has_key?(:photos) && params[:photos]
# 				@post.photos ||=[]
# 				params[:photos].each do |photo|
# 					photo = Photo.find(photo[:id])
# 					if photo
# 						@post.photos << photo
# 					end
# 				end
# 			end
# 			render :show, status: :created, location: @post
# 		else
# 			render json: @post.errors, status: :unprocessable_entity
# 		end
# 	end


# 	private
# 		def post_params
# 			params.require(:post).permit(:title, :body, :photos)
# 		end

# 		def find_post
# 			begin
# 				@post = Post.find(params[:id])
# 				if !@post.published
# 					render nothing: true, status: :not_found, content_type: 'application/json'
# 				end
# 			rescue Mongoid::Errors::DocumentNotFound
# 				render nothing: true, status: :not_found, content_type: 'application/json'
# 			end
# 		end
# end


class PostsController < ApplicationController
	before_action :authenticate_user!, only: [:create, :add_photo, :delete_photo]
	before_action :find_published_post, only: [:show]
	before_action :find_and_check_post_with_user, only: [:add_photo]

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
end


