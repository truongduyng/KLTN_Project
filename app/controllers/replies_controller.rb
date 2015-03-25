class RepliesController < ApplicationController

	before_action :authenticate_user!, only: [:create, :update, :destroy, :like, :unlike]
	before_action :find_comment, only: [:index, :create]
	before_action :find_reply, only: [:destroy, :update]
	before_action :find_reply_for_like_and_unlike, only: [:like, :unlike]
	
	#GET /comments/comment_id/replies.json
	def index
		# sleep(5);
		@replies =  @comment.replies.all
	end

	#POST /comments/comment_id/replies
	def create
		
		@reply = Reply.new(reply_params)
		@reply.user = current_user
		@reply.comment = @comment
		
		if @reply.save 
			render 'show.json.jbuilder', status: :created
		else
			render json: @reply.errors, status: :bad_request
		end

	end

	#PUT 'comments/comment_id/relies/:id.json'
	def update
		sleep(2)
		@reply.update_attributes(reply_params)
		if @reply.save
			render 'show.json.jbuilder', status: :ok
		else
			render json: @reply.errors, status: :bad_request
		end
	end

	def destroy
		@reply.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end


	#PUT comments/comment_id/relies/:id/like
	def like
		if @reply.likes.where('user_id' => current_user.id).first
			render nothing: true, status: :bad_request, content_type: 'application/json'
		else
			@reply.likes.create(user: current_user)
			render nothing: true, status: :created, content_type: 'application/json'
		end
		
	end

	#PUT comments/comment_id/relies/:id/unlike
	def unlike
		like = @reply.likes.where('user_id' => current_user.id).first
		if like
			like.destroy
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end		
	end

	private

		def reply_params
			params.require(:reply).permit(:content)
		end

		def find_comment
			begin
				@comment = Comment.find(params[:comment_id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		#find reply cho edit xoa
		def find_reply
			begin
				comment = Comment.find(params[:comment_id])
				@reply = comment.replies.find(params[:id])
				if @reply.user != current_user
					render json: {error: 'Sporta.Notfound'}, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render json: {error: 'Sporta.Notfound'}, status: :not_found, content_type: 'application/json'
			end
		end


		def find_reply_for_like_and_unlike
			begin
				comment = Comment.find(params[:comment_id])
				@reply = comment.replies.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render json: {error: 'Sporta.Notfound'}, status: :not_found, content_type: 'application/json'
			end
		end


		


end