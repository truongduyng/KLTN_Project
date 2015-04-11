class RepliesController < ApplicationController

	before_action :authenticate_user!, only: [:create, :update, :destroy, :like, :unlike]
	before_action :find_comment, only: [:index, :create]
	before_action :find_reply, only: [:destroy, :update]
	before_action :find_reply_for_like_and_unlike, only: [:like, :unlike, :get_k_first_like, :get_all_likes]
	
	#GET /comments/comment_id/replies.json
	def index
		@replies =  @comment.replies.all
	end

	#POST /comments/comment_id/replies
	def create
		
		@reply = Reply.new(reply_params)
		@reply.user = current_user
		@reply.comment = @comment
		
		if @reply.save 
			target_user = @reply.comment.user
			#TH1: Neu nguoi do phan hoi tren comment cua nguoi do thi ko tao thong bao
			if target_user != current_user
				# #TH2: Neu ma da tao ra notification change va is_new = true thi ko can tao nua (vi tao nua cung vay)
				# notification_change =  NotificationChange.find_notification_change(target_user, @reply.comment, current_user, NotificationCategory.phan_hoi_binh_luan)
				# if !notification_change || !notification_change.is_new
				# 	NotificationChange.create_notification(target_user, @reply.comment, current_user, NotificationCategory.phan_hoi_binh_luan)
				# end
				NotificationChange.create_notification(target_user, @reply.comment, current_user, @reply, NotificationCategory.phan_hoi_binh_luan)

			end
			render 'show.json.jbuilder', status: :created
		else
			render json: @reply.errors, status: :bad_request
		end

	end

	#PUT 'comments/comment_id/relies/:id.json'
	def update
		@reply.update_attributes(reply_params)
		if @reply.save
			render 'show.json.jbuilder', status: :ok
		else
			render json: @reply.errors, status: :bad_request
		end
	end

	def destroy
		#Xoa thong bao neu no chua dc xem
		target_user = @reply.comment.user
		NotificationChange.delete_notification_change(target_user, @reply.comment, current_user, NotificationCategory.phan_hoi_binh_luan)
		#Xoa reply
		@reply.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end


	#PUT comments/comment_id/relies/:id/like
	def like
		if @reply.likes.where('user_id' => current_user.id).first
			render nothing: true, status: :bad_request, content_type: 'application/json'
		else
			like = @reply.likes.create(user: current_user)
			#Tao thong bao
			target_user = @reply.user
			#TH1: Ko thong bao khi nguoi do tu like phan hoi cua chinh minh
			if target_user != current_user
				NotificationChange.create_notification(target_user, @reply, current_user, like, NotificationCategory.thich_phan_hoi)
			end
			render nothing: true, status: :created, content_type: 'application/json'
		end
		
	end

	#PUT comments/comment_id/relies/:id/unlike
	def unlike
		like = @reply.likes.where('user_id' => current_user.id).first
		if like
			#Neu thong bao do chua dc load va xem (is_new = true) thi xoa no di, con neu da dc xem rui thi coi nhu la lich su
			target_user = @reply.user
			NotificationChange.delete_notification_change(target_user, @reply, current_user, like, NotificationCategory.thich_phan_hoi)
			#Huy like
			like.destroy
			render nothing: true, status: :ok, content_type: 'application/json'
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end		
	end


	# /comments/:comment_id/replies/:id/get_k_first_like/:number.json
	def get_k_first_like
		if params.has_key?(:number)
			@likes = @reply.likes.limit(params[:number].to_i).to_a
			render 'k_first_like.json.jbuilder', status: :ok
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	def get_all_likes
		@likes = @reply.likes.all
		render 'posts/get_all_likes.json.jbuilder', status: :ok
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