class NotificationsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_notification, only: [:show]

	#GET /notifications.json
	def index
		#Get new notifications
		@results = NotificationChange.get_notifications(current_user, true)
		@new_notifications_count = @results.count
		#Luon hien thi 15 thong bao, neu no lon hon 15 thong bao, thi chi lay 15 cai
		if @results.count > 15
			@results = @results.first(15)
		else
			#Lay cho du 15 thong bao
			so_luong_con_lai = 15 - @results.count
			#Lay notifications cu voi dung so_luong_con_lai
			old_notifications =  NotificationChange.get_notifications(current_user, false)
			old_notifications = old_notifications.first(so_luong_con_lai)
			@results = @results + old_notifications
		end
	end

	#GET /notifications/:id.json
	#Tra ve notificationChange voi id tuong ung
	def show
	end

	#PUT /notifications/:id/watched.json
	def watched
		notification_ids = params.permit(:notification_ids => [])['notification_ids']
		#Lap wa danh sach id va gan gia tri is_new = false
		notification_ids.each do |id|
			NotificationChange.find(id).update_attributes(watched: true)
		end
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	#PUT /notifications/loaded.json
	#Khi ma click vao ul thi danh dau no du da load
	def loaded
		notification_ids = params.permit(:notification_ids => [])['notification_ids']
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