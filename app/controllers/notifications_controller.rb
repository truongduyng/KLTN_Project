class NotificationsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_notification, only: [:watched]
	#GET /notifications.json
	#Tra ve 10 notification moi nhat
	def index
		# @notifications = NOtificationChange.where()
		# notification = 
		# Notification.where(target_user_id: current_user.id).first
		# if notification
		# 	notification = notification.notification_changes.where()
		# end
		notification_ids = Notification.where(target_user_id: current_user.id).only(:_id).map(&:_id)
		@notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
		@notification_changes = @notification_changes.desc(:created_at).limit(10)

	end


	#PUT /notifications/:id/watched.json
	def watched
		@notification_change.watched = true
		@notification_change.save
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	#PUT /notifications/loaded.json
	#Khi ma click vao ul thi danh dau no du da load
	def loaded
		notification_ids = params.permit(:notification_ids => [])['notification_ids']
		#render json: notification_ids, status: :ok
		#Lap wa danh sach id va gan gia tri is_new = false
		notification_ids.each do |id|
			NotificationChange.find(id).update_attributes(is_new: false)
		end
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	private
		def find_notification
			begin 
				@notification_change = NotificationChange.find(params[:id])
				if @notification_change.notification.target_user != current_user
					render json: {
						message: 'Bạn không có quyền xử lý notification này'	
					},
					status: :bad_request
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end