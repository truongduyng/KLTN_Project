class Notification
	include Mongoid::Document
	#Thuoc ve ai	
	belongs_to :target_user, class_name: 'User', inverse_of: :notifcations
	#Notificable hoac la post hoac la bussiness_request
	belongs_to :notificable, polymorphic: true
	#1 doi tuong bi tac dong boi nhieu loai hanh dong khac nhau
	has_many :notification_changes
end
