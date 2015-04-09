class CommentsController < ApplicationController
	before_action :authenticate_user!, only: [:create, :update, :destroy, :like, :unlike]
	before_action :find_comment, only: [:destroy, :update]
	before_action :find_comment_for_like_and_unlike, only: [:like, :unlike, :get_all_likes]
	before_action :check_post_published, only: [:create]
	def show
	end

	#POST /posts/post_id/comments
	def create
		@comment = Comment.new(comment_params) 
		@comment.user = current_user
		@comment.post_id = params[:post_id]
		if @comment.save
			#Tao thong bao
			post = @comment.post
			NotificationChange.create_notification(post.user, post, current_user, NotificationCategory.binh_luan_bai_viet)
			render 'show.json.jbuilder', status: :created
		else
			render json: @comment.errors, status: :bad_request
		end
	end

	#PUT /posts/post_id/comments/id.josn
	def update
		if @comment.update_attributes(comment_params)
			render 'show.json.jbuilder', status: :ok
		else
			render json: @comment.errors, status: :bad_request
		end
	end

	#DELETE /posts/post_id/comments/id.json
	def destroy
		#Neu co notification ma chua dc xem (trong truong lo binh luan xong xoa lien) thi xoa notification_change do
		post = @comment.post
		NotificationChange.delete_notification_change(post.user, post, current_user, NotificationCategory.binh_luan_bai_viet)
		#Xoa binh luan
		@comment.destroy
		render nothing: true, status: :ok, content_type: 'application/json'	
	end


	#PUT /posts/post_id/comments/:id/like
	def like
		if @comment.likes.where('user_id' => current_user.id).first
			render nothing: true, status: :bad_request, content_type: 'application/json'
		else
			@comment.likes.create(user: current_user)
			render nothing: true, status: :created, content_type: 'application/json'
		end
		
	end

	#PUT /posts/post_id/comments/:id/unlike
	def unlike
		like = @comment.likes.where('user_id' => current_user.id).first
		if like
			like.destroy
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end		
	end

	# /comments/:id/get_k_first_like/:number.json
	def get_k_first_like
		begin
			@comment = Comment.find(params[:id])
		rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
		end
		if params.has_key?(:number)
			@likes = @comment.likes.limit(params[:number].to_i).to_a
			render 'k_first_like.json.jbuilder', status: :ok
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	#/posts/post_id/comments/:id/get_all_likes.json
	def get_all_likes
		@likes = @comment.likes.all
		render 'posts/get_all_likes.json.jbuilder', status: :ok
	end


	private 
	
		def comment_params
			params.require(:comment).permit(:content)
		end

		#tim comment cho  xoa sua
		def find_comment
			begin 
				post = Post.find(params[:post_id])
				if post.published?
					@comment = post.comments.find(params[:id])
				    if @comment.user != current_user
						render nothing: true, status: :not_found, content_type: 'application/json'
					end
				else
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			    
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end

		end

		#tim comment cho like va unlike
		def find_comment_for_like_and_unlike
			begin 
				post = Post.find(params[:post_id])
				if post.published?
					 @comment = post.comments.find(params[:id])
				else
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		def check_comment_with_user
			
		end

		def check_post_published
			post = Post.find(params[:post_id])
			if !post.published?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end