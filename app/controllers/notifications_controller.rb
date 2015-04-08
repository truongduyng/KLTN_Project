class NotificationsController < ApplicationController
	before_action :authenticate_user!
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
end