#Lop nay danh cho quan ly bai post cua system admin
class SystemAdminPostsController < SystemAdminController
	before_action :find_post, only: [:accept, :deny]
	#GET /system_admin_posts.json
	#Lay tat ca cac post chua dc published 
	def index
		sleep(2)
		@posts = Post.not_published.asc(:created_at).paginate(page: params[:page], per_page: params[:per_page])
		@total = Post.not_published.count
	end

	#PUT /system_admin_posts/:id/accept.json
	def accept
		@post.post_status = PostStatus.publishedStatus
		if @post.save
			render json: @post, status: :ok
		else
			render json: @post.errors, status: :bad_request
		end
	end
	#PUT /system_admin_posts/:id/deny.json
	def deny
		@post.post_status = PostStatus.deny_status
		if @post.save
			render json: @post, status: :ok
		else
			render json: @post.errors, status: :bad_request
		end
	end

	private
		def find_post
			begin
				@post = Post.not_published.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

end