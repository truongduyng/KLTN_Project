# json.array! @notification_changes do |nc|
# 	# json.extract! nc, :_id, :trigger_user, :notification_category, :notification
# 	#Id cua notification_change
# 	json._id nc.id
# 	#Nguoi tac dong
# 	json.trigger_user do
# 		json.username nc.trigger_user.username
# 		json.roles nc.trigger_user.roles
# 	end
# 	#Loai tac dong
# 	json.notification_category nc.notification_category
# 	#Thong tin ve doi tuong bi tac dong
# 	json.notification do
# 		json.notificable nc.notification.notificable
# 	end
# 	#1 so thong tin khac
# 	json.watched nc.watched
# 	json.loaded nc.loaded
# 	json.created_at nc.created_at
# end

# #Phang hoa du lieu, cho no chi 1 chieu sau
# json.array! @notification_changes do |nc|
# 	#Id cua notification_change
# 	json._id nc.id
# 	#Nguoi tac dong
# 	json.trigger_user do
# 		json.username nc.trigger_user.username
# 		json.avatar nc.trigger_user.avatar
# 	end
# 	#Thong tin ve doi tuong bi tac dong
# 	json.target_object nc.notification.notificable
# 	#Loai tac dong
# 	json.notification_category nc.notification_category
# 	#1 so thong tin khac
# 	json.watched nc.watched
# 	json.is_new nc.is_new
# 	json.created_at nc.created_at
# end


#Neu loai la 'Duyệt bài viết' thi hien thi Admin da chap nhan bai viet "post.title" cua ban (link toi post.id)
#Neu loai la 'Tu choi bai viet' thi hien thi Admin da tu choi bai viet 'post.title' cua ban (link toi trang hien thi mau template bai viet bi tu choi (truyen id cua notification_category))

# #Them loai hang thong bao
# trung like bai viet cua ban
# quyen like bai viet cua ban
# admin duyet bai viet cua ban
# trung comment len bai viet cua ban

# [{
	# 	target_object: {},
	# 	target_user: {},
	# 	category: {},
	# 	trigger_users: []
	# },....]

json.notifications do
	json.array! @results do |nc|
		#1 mang nhung notification changes dong gop tao thanh 1 notifications
		json.notification_change_ids nc.notification_change_ids do |id|
			json._id id
		end
		#Nguoi tac dong
		json.trigger_users nc.trigger_users do |user|
			json.username user.username
			json.avatar user.avatar.url
		end
		#Thong tin ve doi tuong bi tac dong
		json.target_object do
			json._id nc.notification.notificable.id
			if nc.notification.notificable_type == 'Post'
				json.title nc.notification.notificable.title
			end
			if nc.notification.notificable_type == 'BussinessRequest'
				json.name nc.notification.notificable.name
			end
		end
		#Loai tac dong
		json.notification_category do 
			json._id nc.notification_category.id
			json.name nc.notification_category.name
		end 
		#1 so thong tin khac
		json.watched nc.watched
		json.is_new nc.is_new
		json.created_at nc.created_at
		json.end '---------------'
	end
end
json.new_notifications_count @new_notifications_count 