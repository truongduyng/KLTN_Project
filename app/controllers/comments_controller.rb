class CommentsController < ApplicationController

	before_action :authenticate_user!, only: [:create, :update, :destroy, :like, :unlike]
	before_action :find_comment, only: [:destroy, :update]
	before_action :find_comment_for_like_and_unlike, only: [:like, :unlike,:get_k_first_like, :get_all_likes]

	def show
	end

	def create
		begin
			# byebug
			@comment = Comment.new(comment_params[:comment])
			@comment.user = current_user

			if comment_params[:target_object].has_key?(:post_id)
				target_object = Post.find(comment_params[:target_object][:post_id])
				@comment.post_id = target_object.id
			end

			if comment_params[:target_object].has_key?(:club_post_id)
				target_object = ClubPost.find(comment_params[:target_object][:club_post_id])
				@comment.club_post_id = target_object.id
			end

			if @comment.save
				#Tao thong bao
				target_user_ids = target_object.follower_ids.clone
				if target_object.user == current_user
					#TH1: Neu nguoi do tu comment len bai post cua nguoi do, thi chi gui den nhung nguoi theo doi vs loai "trung nguyen huu cung binh luan len bai viet .. cua anh ay"
					NotificationChange.create_notifications(target_user_ids, target_object, current_user, @comment, NotificationCategory.binh_luan_cua_chu_bai_viet)
				else
					#TH2: Neu ai do comment len bai post cua nguoi do, thi
					#gui thong bao den tat ca nguoi theo doi, nguoi chu bai viet , tuy
					#nhien ko gui thong bao den nguoi comment
					#B1: Gui thong bao den cac nguoi theo doi vs loai "ai do binh luan len bai viet ban dang theo doi"
					target_user_ids.delete(current_user.id)
					NotificationChange.create_notifications(target_user_ids, target_object, current_user, @comment, NotificationCategory.binh_luan_bai_viet_ban_dang_theo_doi)
					#B2: Gui thong bao den chu bai viet vs loai "ai do binh luan len bai viet cua ban"
					NotificationChange.create_notifications([target_object.user.id], target_object,  current_user, @comment, NotificationCategory.binh_luan_bai_viet)
				end
				render 'show.json.jbuilder', status: :created
			else
				render json: @comment.errors, status: :bad_request
			end
		rescue Exception => e
			render nothing: true, status: :not_found, content_type: "application/json"
		end

	end


	def update
		# byebug
		if @comment.update_attributes(comment_params[:comment])
			render 'show.json.jbuilder', status: :ok
		else
			render json: @comment.errors, status: :bad_request
		end
	end


	def destroy
		#Neu co notification ma chua dc xem (trong truong lo binh luan xong xoa lien) thi xoa notification_change do

		if @comment.post
			target_object = @comment.post
		end
		if @comment.club_post
			target_object = @comment.club_post
		end

		#Khi xoa binh luan thi xoa luon cac notification lien quan den binh luan cua nguoi do (vi target_object la comment ko the tim thay)
		notification = Notification.all_of(target_user_id: current_user.id, notificable_id: @comment.id).first

		if notification
			notification.notification_changes.destroy_all
			notification.destroy
		end

		target_user_ids = target_object.follower_ids.clone
		if target_object.user == current_user
			#TH1: Neu nguoi comment la chu bai target_object thi xoa nhung thong bao dc gui den cac followers neu no chua dc load realtime

			NotificationChange.delete_notification_changes(target_user_ids, target_object, current_user, @comment, NotificationCategory.binh_luan_cua_chu_bai_viet)
		else
			#TH2: Xoa cac thong bao dc gui toi followers duoi dang "binh luan bai viet ban dang theo doi" va
			#xoa thong bao gui toi chu bai viet duoi dang "binh luan len bai viet cua ban"
			target_user_ids.delete(current_user.id)
			NotificationChange.delete_notification_changes(target_user_ids, target_object, current_user, @comment, NotificationCategory.binh_luan_bai_viet_ban_dang_theo_doi)

			NotificationChange.delete_notification_changes([target_object.user.id], target_object, current_user, @comment, NotificationCategory.binh_luan_bai_viet)
		end

		#Xoa binh luan
		@comment.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end

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

	def get_k_first_like
		if params.has_key?(:number)
			@likes = @comment.likes.limit(params[:number].to_i).to_a
			render 'k_first_like.json.jbuilder', status: :ok
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	def get_all_likes
		@likes = @comment.likes.all
		render 'posts/get_all_likes.json.jbuilder', status: :ok
	end


	private
	def comment_params
		params.permit(:id, :comment => [:content], :target_object => [:post_id, :club_post_id])
	end

	#tim comment cho  xoa sua
	def find_comment
		begin
			@comment = Comment.find(comment_params[:id])
			if @comment.user != current_user
				render nothing: true, status: :not_found, content_type: 'application/json'
			end

		rescue Mongoid::Errors::DocumentNotFound
			render nothing: true, status: :not_found, content_type: 'application/json'
		end

	end

	#tim comment cho like va unlike
	def find_comment_for_like_and_unlike
		begin
			@comment = Comment.find(comment_params[:id])
		rescue Mongoid::Errors::DocumentNotFound
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

end