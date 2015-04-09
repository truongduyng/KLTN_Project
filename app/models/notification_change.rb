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

	#Attr
	#1 mang ca trigger users
	attr_accessor :trigger_users

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

	def self.get_notifications target_user, is_new 
		notification_ids = Notification.where(target_user_id: target_user.id).only(:_id).map(&:_id)
		all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
		
		# Vi notification cu co the so luong len rat lon nen
		#neu lay notification cu, thi chi lay 200 notification_change la du de co the gom nhom va tao ra 15 
		# notification duoc gom nhom theo category, target_object (neu ko du so luong thi cung cha sao)
		if is_new == false
			new_notification_changes = all_notification_changes.includes(:trigger_user, :notification_category, :notification).where(is_new: is_new).desc(:created_at).limit(200).to_a
		else
			new_notification_changes = all_notification_changes.includes(:trigger_user, :notification_category, :notification).where(is_new: is_new).desc(:created_at).to_a
		end
		#B1: Group by theo target_object va notification_category
		# {
		# 	'object 1, category': [
		# 		{},{}
		# 	],
		# 	'object 2, category': []
		# }
		new_notification_changes = new_notification_changes.group_by{ |nc| [nc.notification_id, nc.notification_category_id]} 
		#B2: chuyen ket qua sang dang mang: [[{}, {}], [{}, {}], [{}, {}, ...]]
		new_notification_changes = new_notification_changes.collect{|key, value| value}
		#B3: @results chinh la new notifications 
		# [{
		# 	target_object: {},
		# 	target_user: {},
		# 	category: {},
		# 	trigger_users: []
		# },....]
		@results = new_notification_changes.collect do |array|
			#Lay thong tin co ban nhu target_object, target_user, category
			memo = array[0].clone
			#Chuyen triiger_user thanh 1 array
			memo.trigger_users = []
			#Duyet qua cac object va gan trigger_user vao mang trigger_user
			array.each_with_object(memo) do |item|
				memo.trigger_users << item.trigger_user
			end
			#tra ve ket qua
			memo
		end
	end
end