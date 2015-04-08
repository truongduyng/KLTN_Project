#Nhung actor tham gia vao thay doi notifcation len 1 doi tuong
class NotificationChange
	include Mongoid::Document
	include Mongoid::Timestamps
	#Nguoi tac dong gay ra thong bao
	belongs_to :trigger_user, class_name: 'User', inverse_of: :trigger_notifications
	#Loai tac dong gi
	belongs_to :notification_category
	#Thuoc 1 ve notification nao do
	belongs_to :notification

	#Da xem hay chua
	field :watched, type: Boolean, default: ->{false}
	#Cho thay da load hay chua
	# field :loaded, type: Boolean, default: ->{false}
	field :is_new, type: Boolean, default: ->{true}

	def self.create_notification target_user, target_object,  trigger_user, notification_category
		notification  = Notification.all_of(target_user_id: target_user.id, notificable_id: target_object.id).first	
		#Neu chua co loai notification cho doi tuong nay thi tao no
		if !notification
			notification = Notification.new
			notification.target_user = target_user
			notification.notificable = target_object
			notification.save
		end	
		#Tao ra notification change cho thay: ai tac dong, loai tac dong la gi	
		notification_change = NotificationChange.new
		notification_change.trigger_user = trigger_user
		notification_change.notification_category = notification_category
		notification_change.notification = notification
		notification_change.save
	end
end