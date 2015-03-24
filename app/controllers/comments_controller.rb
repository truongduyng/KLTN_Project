class CommentsController < ApplicationController
	before_action :authenticate_user!, only: [:create, :update, :destroy]
	before_action :find_comment, only: [:destroy, :update]
	
	def show
	end

	#POST /posts/post_id/comments
	def create
		@comment = Comment.new(comment_params) 
		@comment.user = current_user
		@comment.post_id = params[:post_id]

		if @comment.save
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
		@comment.destroy
		render nothing: true, status: :ok, content_type: 'application/json'	
	end

	private 
	
		def comment_params
			params.require(:comment).permit(:content)
		end

		def find_comment
			begin 
				post = Post.find(params[:post_id])
			    @comment = post.comments.find(params[:id])
			    if @comment.user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end

		end

		def check_comment_with_user
			
		end
end