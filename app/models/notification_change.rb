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
	attr_accessor :trigger_users, :notification_change_ids

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

	#tim notification_change
	def self.find_notification_change target_user, target_object, trigger_user, notification_category
		notification  = Notification.all_of(target_user_id: target_user.id, notificable_id: target_object.id).first	
		if !notification
			return nil
		else
			notification_change = NotificationChange.all_of(trigger_user_id: trigger_user.id, notification_id: notification.id, notification_category_id: notification_category.id).first
			return notification_change
		end
	end

	#Xoa 1 notification change
	def self.delete_notification_change target_user, target_object, trigger_user, notifcation_category
		notification_change = NotificationChange.find_notification_change(target_user, target_object, trigger_user, notifcation_category)
		#Neu co notification_change va no chua dc xem (is_new = true) thi xoa no di
		if notification_change && notification_change.is_new 
			notification_change.destroy
		end
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
		# 	trigger_users: [],
		#   notification_change_ids: []
		# },....]
		@results = new_notification_changes.collect do |array|
			#Lay thong tin co ban nhu target_object, target_user, category
			memo = array[0].clone
			#Chuyen trigger_user thanh 1 array, notification_changes thanh array id
			memo.notification_change_ids = []
			memo.trigger_users = []
			#Duyet qua cac object va gan trigger_user vao mang trigger_user
			array.each_with_object(memo) do |item|
				memo.notification_change_ids << item.id
				memo.trigger_users << item.trigger_user
			end
			#tra ve ket qua
			memo
		end
	end
end

#De gui thong bao den nhung nguoi theo doi bai viet:
#B1: them thuoc tinh followers cho post
#B2: Moi khi 1 nguoi tac dong den post thi them nguoi do thanh theo doi post
#B3: moi khi 1 nguoi trigger 1 thong bao thi tao ra thong bao cho moi 
#nguoi followers (phai tao ra loai hang thong bao phu hop: Binh luan bai post ban theo doi, thich bai post ban theo doi)




#GIAI PHAP KHAC
#Notification change se la 1 mang cua trigger_users. Khi them 1 notification change thi tim cai notification change theo loai va lay cai moi nhat, neu
#cai moi nhat do chua dc xem is_new = true thi don gian them 1 trigger user vao mang trigger users. Nguoc lai,
#neu no da dc xem rui thi chi can tao ra 1 notification change moi.
#Uu diem: Ko can group gi ca, chi lay notification change ve va hien thi (nhanh va chinh xac)