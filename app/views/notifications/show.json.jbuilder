#Id cua notification_change
json._id @notification_change.id
#Doi tuong tac dong: gom ai tac dong va lam cai gi (comment nao, reply nao)
json.triggers @notification_change.distinct_triggers_by_user do |trigger|
	json._id trigger.id
	json.trigger_user do 
		json._id trigger.trigger_user.id
		json.username trigger.trigger_user.username
		json.avatar trigger.trigger_user.avatar.url
	end
	if trigger.trigger_source_id
		json.trigger_source do
			json._id trigger.trigger_source_id
		end
	end
end
#Thong tin ve doi tuong bi tac dong
json.target_object @notification_change.notification.notificable
#Loai tac dong
json.notification_category @notification_change.notification_category
#1 so thong tin khac
json.watched @notification_change.watched
json.is_new @notification_change.is_new
json.created_at @notification_change.created_at
json.updated_at @notification_change.updated_at