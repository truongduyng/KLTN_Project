#Id cua notification_change
json._id @notification_change.id
#Nguoi tac dong
json.trigger_users @notification_change.trigger_users do |user|
			json.username user.username
			json.avatar user.avatar.url
end
#Thong tin ve doi tuong bi tac dong
json.target_object @notification_change.notification.notificable
#Loai tac dong
json.notification_category @notification_change.notification_category
#1 so thong tin khac
json.watched @notification_change.watched
json.is_new @notification_change.is_new
json.created_at @notification_change.created_at