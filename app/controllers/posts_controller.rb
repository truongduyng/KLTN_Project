# B1: Upload file nao len file do rieng re
# B2: Upload xong tra ve cai id cua cai photo do
# B3: Khi tao post, thi dua thong tin, cung cac id photo do len
# B4: Chi can dua vao id cua photo lay no va gan vao post hien tai
# B5: Neu ma nguoi dung thoat thi truoc khi thoat kiem tra danh sach anh post len va xoa tung anh da post
class PostsController < ApplicationController
	before_action :authenticate_user!, only: [:create]
	before_action :find_post, only: [:show]

	def show	
	end

	def create
		@post = Post.new(post_params)
		@post.user = current_user
		if @post.save
			if params.has_key?(:photos) && params[:photos]
				@post.photos ||=[]
				params[:photos].each do |photo|
					photo = Photo.find(photo[:id])
					if photo
						@post.photos << photo
					end
				end
			end
			render :show, status: :created, location: @post
		else
			render json: @post.errors, status: :unprocessable_entity
		end
	end


	private
		def post_params
			params.require(:post).permit(:title, :body, :photos)
		end

		def find_post
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


# class PostsController < ApplicationController
# 	before_action :authenticate_user!, only: [:create]
# 	before_action :find_post, only: [:show]

# 	def show	
# 	end

# 	def create
# 		if session[:tmp_post_id]
# 			#Update
# 			@post = Post.find(session[:tmp_post_id])
# 			if @post.update_attributes(post_params)
# 				session[:tmp_post_id] = nil
# 				render :show, status: :created, location: @post
# 			else
# 				render json: @post.errors, status: :unprocessable_entity
# 			end
# 		else
# 			#create
# 			@post = Post.new(post_params)
# 			if @post.save
# 				render :show, status: :created, location: @post
# 			else
# 				render json: @post.errors, status: :unprocessable_entity
# 			end
# 		end
# 	end


# 	def add_photo
# 		if session[:tmp_post_id]
# 			post = Post.find(session[:tmp_post_id])
# 		else
# 			post = Post.create(title: 'empty', body: 'empty')
# 			session[:tmp_post_id] = post.id.to_s
# 		end
# 		begin
# 			@photo = Photo.new(image: params[:file])
# 			post.photos ||=[]
# 			post.photos << @photo

# 			render 'add_photo.json.jbuilder'
# 			# render json: {
# 			# 	index: params[:data][:index]
# 			# 	}, status: :created
# 		rescue Exception
# 			render nothing: true, status: :bad_request, content_type: 'application/json'
# 		end
# 	end


# 	def delete_photo
# 		if session[:tmp_post_id]
# 			@post = Post.find(session[:tmp_post_id])
# 			photo = @post.photos.find(params[:id])
# 			photo.destroy
# 			render nothing: true, status: :ok, content_type: 'application/json'
# 		else
# 			render nothing: true, status: :not_found, content_type: 'application/json'
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


