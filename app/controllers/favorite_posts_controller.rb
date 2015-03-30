class FavoritePostsController < ApplicationController
	before_action :authenticate_user!, only: [:add, :remove]
	before_action :find_post_and_check_published, only: [:add]
	before_action :check_favorite_post, only: [:add]
	#/favoriteposts/:id/add
	def add
		favorite_post =  FavoritePost.new
		favorite_post.post = @post
		favorite_post.user = current_user
		if favorite_post.save
			render json: favorite_post, status: :created
		else
			render json: favorite_post.errors, status: :bad_request
		end
	end

	#/favoriteposts/:id/remove
	def remove
		favorite_post = FavoritePost.where(post_id: params[:id]).where(user_id: current_user.id).first
		if favorite_post
			favorite_post.destroy
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

	private
		def find_post_and_check_published
			begin
				@post = Post.find(params[:id])
				if !@post.published
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		#kiem tra neu da thich rui ko cho thich nua, chi thich dc 1 lan
		def check_favorite_post
			 favorite_post = FavoritePost.where(post_id: params[:id]).where(user_id: current_user.id).first
			 if favorite_post
			 	render json: {error: 'Đã thích'}, status: :bad_request, content_type: 'application/json'
			 end
		end
end