class NotificationsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_notification, only: [:watched, :show]

	#GET /notifications.json
	def index
		#B1: Get new notification changes
		target_user = current_user
		notification_ids = Notification.where(target_user_id: target_user.id).only(:_id).map(&:_id)
		all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
		notification_changes = all_notification_changes.includes(:notification_category, :notification).where(is_new: true).desc(:updated_at).limit(15)
		
		new_notification_changes = notification_changes.to_a
		old_notification_changes = []
		@new_notifications_count  = new_notification_changes.count
		
		#B2: Neu so luong new notification changes nho hon 15, thi get old notification changes cho du 15
		if new_notification_changes.count < 15
			so_luong_con_lai = 15 - @new_notifications_count
			old_notification_changes = all_notification_changes.includes(:notification_category, :notification).where(is_new: false).desc(:updated_at).limit(so_luong_con_lai).to_a
		end
		
		@results = new_notification_changes + old_notification_changes
	end

	#GET /notifications/:id.json
	#Tra ve notificationChange voi id tuong ung
	def show
	end

	#PUT /notifications/:id/watched.json
	def watched
		@notification_change.timeless.update_attributes(watched: true)
		render nothing: true, status: :ok, content_type: 'application/json'
		# notification_ids = params.permit(:notification_ids => [])['notification_ids']
		# #Lap wa danh sach id va gan gia tri is_new = false
		# notification_ids.each do |id|
		# 	NotificationChange.find(id).update_attributes(watched: true)
		# end
		# render nothing: true, status: :ok, content_type: 'application/json'
	end

	#PUT /notifications/loaded.json
	#Khi ma click vao ul thi danh dau no du da load
	def loaded
		notification_ids = params.permit(:notification_ids => [])['notification_ids']
		#Lap wa danh sach id va gan gia tri is_new = false
		notification_ids.each do |id|
			NotificationChange.find(id).timeless.update_attributes(is_new: false)
		end
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	private
		def find_notification
			begin 
				@notification_change = NotificationChange.find(params[:id])
				if @notification_change.notification.target_user != current_user
					# render json: {
					# 	message: 'Bạn không có quyền xử lý notification này'	
					# },
					# status: :bad_request
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end