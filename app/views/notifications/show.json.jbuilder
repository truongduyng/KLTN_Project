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
json.target_object do
	if @notification_change.notification.notificable_type == 'Post'
		json.title @notification_change.notification.notificable.title
		json._id @notification_change.notification.notificable.id
	end
	
	if @notification_change.notification.notificable_type == 'BussinessRequest'
		json.name @notification_change.notification.notificable.name
		json._id @notification_change.notification.notificable.id
	end

	if @notification_change.notification.notificable_type == 'Comment'
		json.content @notification_change.notification.notificable.content
		json.post_title  @notification_change.notification.notificable.post.title
		#id cua bai post chua comment
		json._id @notification_change.notification.notificable.post.id
		json.comment_id @notification_change.notification.notificable.id
	end
	
	#Do reply la embedded trong comment nen ko fetch reply trong notificable
	if @notification_change.notification.notificable_type == 'Reply'
		json.content @notification_change.notification.reply.content
		json.comment_content @notification_change.notification.reply.comment.content
		#id cua bai post chua reply
		json._id @notification_change.notification.reply.comment.post.id
		#id cua reply
		json.reply_id @notification_change.notification.notificable_id
	end

end
#Loai tac dong
json.notification_category do 
	json._id @notification_change.notification_category.id
	json.name @notification_change.notification_category.name
end 
#1 so thong tin khac
json.watched @notification_change.watched
json.is_new @notification_change.is_new
json.created_at @notification_change.created_at
json.updated_at @notification_change.updated_at
