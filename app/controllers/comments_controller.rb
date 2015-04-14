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
			if post.user == current_user
				#TH1: Neu nguoi do tu comment len bai post cua nguoi do, thi chi gui den nhung nguoi theo doi vs loai "trung nguyen huu cung binh luan len bai viet .. cua anh ay"
				target_user_ids = post.follower_ids.clone
				NotificationChange.create_notifications(target_user_ids, post, current_user, @comment, NotificationCategory.binh_luan_cua_chu_bai_viet)
			else
				#TH2: Neu ai do comment len bai post cua nguoi do, thi
				#gui thong bao den tat ca nguoi theo doi, nguoi chu bai viet , tuy
				#nhien ko gui thong bao den nguoi comment
				#B1: Gui thong bao den cac nguoi theo doi vs loai "ai do binh luan len bai viet ban dang theo doi"
				target_user_ids = post.follower_ids.clone
				target_user_ids.delete(current_user.id)
				NotificationChange.create_notifications(target_user_ids, post, current_user, @comment, NotificationCategory.binh_luan_bai_viet_ban_dang_theo_doi)
				#B2: Gui thong bao den chu bai viet vs loai "ai do binh luan len bai viet cua ban"
				NotificationChange.create_notifications([post.user.id], post,  current_user, @comment, NotificationCategory.binh_luan_bai_viet)
			end
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
		if post.user == current_user
			#TH1: Neu nguoi comment la chu bai post thi xoa nhung thong bao dc gui den cac followers neu no chua dc load realtime
			target_user_ids = post.follower_ids.clone
			NotificationChange.delete_notification_changes(target_user_ids, post, current_user, @comment, NotificationCategory.binh_luan_cua_chu_bai_viet)
		else
			#TH2: Xoa cac thong bao dc gui toi followers duoi dang "binh luan bai viet ban dang theo doi" va
			#xoa thong bao gui toi chu bai viet duoi dang "binh luan len bai viet cua ban"
			target_user_ids = post.follower_ids.clone
			target_user_ids.delete(current_user.id)
			NotificationChange.delete_notification_changes(target_user_ids, post, current_user, @comment, NotificationCategory.binh_luan_bai_viet_ban_dang_theo_doi)
			NotificationChange.delete_notification_changes([post.user.id], post,  current_user, @comment, NotificationCategory.binh_luan_bai_viet)
		end
		#Xoa binh luan
		@comment.destroy
		render nothing: true, status: :ok, content_type: 'application/json'	
	end


	#PUT /posts/post_id/comments/:id/like
	def like
		if @comment.likes.where('user_id' => current_user.id).first
			render nothing: true, status: :bad_request, content_type: 'application/json'
		else
			like = @comment.likes.create(user: current_user)
			#Tao thong bao
			#TH1: Ko thong bao khi nguoi do tu like binh luan cua chinh minh
			if @comment.user != current_user
				NotificationChange.create_notification @comment.user, @comment, current_user, like, NotificationCategory.thich_binh_luan
			end
			render nothing: true, status: :created, content_type: 'application/json'
		end
		
	end

	#PUT /posts/post_id/comments/:id/unlike
	def unlike
		like = @comment.likes.where('user_id' => current_user.id).first
		if like
			#Neu thong bao do chua dc load va xem (is_new = true) thi xoa no di, con neu da dc xem rui thi coi nhu la lich su
			NotificationChange.delete_notification_change(@comment.user, @comment, current_user, like, NotificationCategory.thich_binh_luan)
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