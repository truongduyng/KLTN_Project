#Lop nay danh cho quan ly bai post cua system admin
class SystemAdminPostsController < SystemAdminController
	before_action :find_post, only: [:accept, :deny]
	#GET /system_admin_posts.json
	#Lay tat ca cac post chua dc published 
	def index
		@posts = Post.not_published.asc(:created_at).paginate(page: params[:page], per_page: params[:per_page])
		@total = Post.not_published.count
	end

	#PUT /system_admin_posts/:id/accept.json
	def accept
		@post.post_status = PostStatus.publishedStatus
		if @post.timeless.save
			#Tim kiem nay chua test
			# notification  = Notification.all_of(target_user_id: @post.user.id, notificable_id: @post.id).first	
			# #Neu chua co loai notification cho doi tuong nay thi tao no
			# if !notification
			# 	notification = Notification.new
			# 	notification.target_user = @post.user
			# 	notification.notificable = @post
			# 	notification.save
			# end	
			# #Tao ra notification change cho thay: ai tac dong, loai tac dong la gi	
			# notification_change = NotificationChange.new
			# notification_change.trigger_user = current_user
			# notification_change.notification_category = NotificationCategory.duyet_bai_viet
			# notification_change.notification = notification
			# notification_change.save
			##Tao ra notification cho duyet bai viet thanh cong
			NotificationChange.create_notification @post.user, @post, current_user, NotificationCategory.duyet_bai_viet
		else
			render json: @post.errors, status: :bad_request
		end
	end
	#PUT /system_admin_posts/:id/deny.json
	def deny
		@post.post_status = PostStatus.deny_status
		if @post.timeless.save
			#render json: @post, status: :ok
		else
			render json: @post.errors, status: :bad_request
		end
	end

	#Get nhung post ma da qua xu ly: tu choi hoac chap nhan
	#GET /get_accept_and_deny_posts.json
	def get_accept_and_deny_posts
		@posts = Post.accept_or_deny.desc(:created_at).paginate(page: params[:page], per_page: params[:per_page])
		@total = Post.accept_or_deny.count
	end

	private
		# def find_post
		# 	begin
		# 		@post = Post.not_published.find(params[:id])
		# 	rescue Mongoid::Errors::DocumentNotFound
		# 		render nothing: true, status: :not_found, content_type: 'application/json'
		# 	end
		# end
		def find_post
			begin
				@post = Post.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

end