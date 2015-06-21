#Lop nay danh cho quan ly bai post cua system admin
class SystemAdminPostsController < SystemAdminController
	before_action :find_post, only: [:accept, :deny]
	#GET /system_admin_posts.json
	#Lay tat ca cac post chua dc published
	def index
		if params[:text_search].nil?
			@posts = Post.not_published.asc(:created_at).paginate(page: params[:page], per_page: params[:per_page])
			@total = Post.not_published.count
		else
			@posts = Post.not_published.asc(:created_at).text_search(params[:text_search])
		end
	end

	#Get nhung post ma da qua xu ly: tu choi hoac chap nhan
	#GET /get_accept_and_deny_posts.json
	def get_accept_and_deny_posts

		if params[:text_search].nil?
			@posts = Post.accept_or_deny.desc(:updated_at).paginate(page: params[:page], per_page: params[:per_page])
			@total = Post.accept_or_deny.count
		else
			@posts = Post.accept_or_deny.desc(:updated_at).text_search(params[:text_search])
		end
	end

	#PUT /system_admin_posts/:id/accept.json
	def accept
		@post.post_status = PostStatus.publishedStatus
		if @post.timeless.save
			NotificationChange.delete_notification_change @post.user, @post, current_user, @post, NotificationCategory.tu_choi_bai_viet
			NotificationChange.create_notification @post.user, @post, current_user, @post, NotificationCategory.duyet_bai_viet
		else
			render json: @post.errors, status: :bad_request
		end
	end
	#PUT /system_admin_posts/:id/deny.json
	def deny
		@post.post_status = PostStatus.deny_status
		if @post.timeless.save
			NotificationChange.delete_notification_change @post.user, @post, current_user, @post, NotificationCategory.duyet_bai_viet
			NotificationChange.create_notification @post.user, @post, current_user, @post, NotificationCategory.tu_choi_bai_viet
		else
			render json: @post.errors, status: :bad_request
		end
	end

	private
	def find_post
		begin
			@post = Post.find(params[:id])
		rescue Mongoid::Errors::DocumentNotFound
			render nothing: true, status: :not_found, content_type: 'application/json'
		end
	end

end