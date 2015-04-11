#Nhung actor tham gia vao thay doi notifcation len 1 doi tuong
class NotificationChange
	include Mongoid::Document
	include Mongoid::Timestamps
	#Co nhieu trigger tac dong vao notifcation change loai nay
	#trigger_ids: [] cho thay nhung nguoi tac dong vao notification change nay
	has_and_belongs_to_many :triggers, class_name: 'NotificationChangeTrigger', inverse_of: :notification_changes 
	#has_and_belongs_to_many :triggers, class_name: 'NotificationChangeTrigger', inverse_of: nil 
	#Luu 1 array id trigger_ids: []	
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

		#Tim notification_change cho target_object, target_user va category va no chua dc xem. Neu dc xem rui thi tao ra 1 notification change moi
		notification_change = NotificationChange.all_of(notification_id: notification.id, notification_category_id: notification_category.id, is_new: true).first	
		#Neu co 1 notification change thoa man (chua dc xem) thi them no vao
		if notification_change
			notification_change.trigger_users << trigger_user
			notification_change.updated_at = Time.now
			notification_change.save
		else
			#Neu ko co notification change thoa man thi tao moi
			notification_change = NotificationChange.new
			notification_change.trigger_users = [trigger_user]
			notification_change.notification_category = notification_category
			notification_change.notification = notification
			notification_change.updated_at = Time.now
			notification_change.save
		end
	end

	#tim notification_change
	def self.find_notification_change target_user, target_object, trigger_user, notification_category
		notification  = Notification.all_of(target_user_id: target_user.id, notificable_id: target_object.id).first	
		if !notification
			return nil
		else
			notification_change = NotificationChange.all_of('trigger_user_ids' => trigger_user.id, notification_id: notification.id, notification_category_id: notification_category.id).first
			return notification_change
		end
	end

	#Xoa 1 notification change
	def self.delete_notification_change target_user, target_object, trigger_user, notifcation_category
		notification_change = NotificationChange.find_notification_change(target_user, target_object, trigger_user, notifcation_category)
		#Neu co notification_change va no chua dc xem (is_new = true) thi xoa no di
		if notification_change && notification_change.is_new
			#Bo trigger_user ra kho mang trigger_users 
			notification_change.trigger_users.delete(trigger_user)
			#Khi ko con trigger_users (co nghia la ko con notification change cho loai category) thi xoa no di
			if notification_change.trigger_users.count == 0
				notification_change.destroy
			end
		end
	end
end


#De gui thong bao den nhung nguoi theo doi bai viet:
#B1: them thuoc tinh followers cho post
#B2: Moi khi 1 nguoi tac dong den post thi them nguoi do thanh theo doi post
#B3: moi khi 1 nguoi trigger 1 thong bao thi tao ra thong bao cho moi 
#nguoi followers (phai tao ra loai hang thong bao phu hop: Binh luan bai post ban theo doi, thich bai post ban theo doi)

#Comment cung co follower, trong truong hop nguoi reply comment thi phai thong bao cho nguoi reply khi co ai do reply cung comment

#GIAI PHAP KHAC
#Notification change se la 1 mang cua trigger_users. Khi them 1 notification change thi tim cai notification change theo loai va lay cai moi nhat, neu
#cai moi nhat do chua dc xem is_new = true thi don gian them 1 trigger user vao mang trigger users. Nguoc lai,
#neu no da dc xem rui thi chi can tao ra 1 notification change moi.
#Uu diem: Ko can group gi ca, chi lay notification change ve va hien thi (nhanh va chinh xac)


#NotificationChange.all_of('trigger_users._id' => '54cf9a3f6875752467010000', notification_id: '552771dc6875750c31060000', notification_category_id: '55225d2b68757540e3000000').first

#NotificationChange.all_of(notification_id: notification.id, notifcation_category_id: notification_category.id, is_new: true).first
