class NotificationsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_notification, only: [:watched, :show, :loaded]

	#GET /notifications.json
	# def index
	# 	#B1: Get new notification changes
	# 	target_user = current_user
	# 	notification_ids = Notification.where(target_user_id: target_user.id).only(:_id).map(&:_id)
	# 	all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
	# 	notification_changes = all_notification_changes.includes(:notification_category, :notification).where(is_new: true).desc(:updated_at).limit(15)
		
	# 	new_notification_changes = notification_changes.to_a
	# 	old_notification_changes = []
	# 	@new_notifications_count  = new_notification_changes.count
		
	# 	#B2: Neu so luong new notification changes nho hon 15, thi get old notification changes cho du 15
	# 	if new_notification_changes.count < 15
	# 		so_luong_con_lai = 15 - @new_notifications_count
	# 		old_notification_changes = all_notification_changes.includes(:notification_category, :notification).where(is_new: false).desc(:updated_at).limit(so_luong_con_lai).to_a
	# 	end

	# 	@results = new_notification_changes + old_notification_changes
	# end

	def index
		sleep(5)
		#B1: Get new notification changes
		target_user = current_user
		notification_ids = Notification.where(target_user_id: target_user.id).only(:_id).map(&:_id)
		all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
		notification_changes = all_notification_changes.includes(:notification_category, :notification).desc(:updated_at).limit(15)

		@results = notification_changes
		@new_notifications_count  = all_notification_changes.where(is_new: true).count
		
		#Cap nhat loaded = true cho thay no da dc load
		new_notification_changes = all_notification_changes.where(is_new: true).update_all(loaded: true)
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
	# def loaded
	# 	notification_ids = params.permit(:notification_ids => [])['notification_ids']
	# 	#Lap wa danh sach id va gan gia tri is_new = false
	# 	notification_ids.each do |id|
	# 		NotificationChange.find(id).timeless.update_attributes(is_new: false)
	# 	end
	# 	render nothing: true, status: :ok, content_type: 'application/json'
	# end

	#PUT /notifications/loaded.json
	#Khi click vao de xo ra doanh sach thong bao thi danh dau tat ca cac notification moi (is_new = true) thanh is_new = false
	#Xu ly cho truong hop 1 nguoi co 100 thong bao chua dc load, khi load lan dau tien thi load 15 thong bao moi nhat
	#nhung van hien thi co 100 thong bao moi. Va khi nguoi do click vao de xem danh sach thong bao
	#thi danh dau tat ca cac thong bao moi is_new =false de lan sau khi truy cap nguoi do ko con thay thong bao moi con sot lai
	def bo_new
		target_user = current_user
		notification_ids = Notification.where(target_user_id: target_user.id).only(:_id).map(&:_id)
		all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
		new_notification_changes = all_notification_changes.where(is_new: true).update_all(is_new: false, loaded: true)
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	#PUT /notifications/id/loaded.json
	#Ham nay danh 1 dau 1 notification da dc load. Xu ly khi hien thi thong bao realtime, thi thong bao do da xem nhu dc load
	def loaded
		@notification_change.update_attributes(loaded: true)
		render nothing: true, status: :ok, content_type: 'application/json'
	end


	private
		def find_notification
			begin 
				@notification_change = NotificationChange.find(params[:id])
				if @notification_change.notification.target_user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end