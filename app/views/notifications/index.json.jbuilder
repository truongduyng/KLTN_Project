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

#Phang hoa du lieu, cho no chi 1 chieu sau
json.array! @notification_changes do |nc|
	#Id cua notification_change
	json._id nc.id
	#Nguoi tac dong
	json.trigger_user do
		json.username nc.trigger_user.username
	end
	#Thong tin ve doi tuong bi tac dong
	json.target_object nc.notification.notificable
	#Loai tac dong
	json.notification_category nc.notification_category
	#1 so thong tin khac
	json.watched nc.watched
	json.is_new nc.is_new
	json.created_at nc.created_at
end

#Neu loai la 'Duyệt bài viết' thi hien thi Admin da chap nhan bai viet "post.title" cua ban (link toi post.id)
#Neu loai la 'Tu choi bai viet' thi hien thi Admin da tu choi bai viet 'post.title' cua ban (link toi trang hien thi mau template bai viet bi tu choi (truyen id cua notification_category))