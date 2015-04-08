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
	field :loaded, type: Boolean, default: ->{false}
end