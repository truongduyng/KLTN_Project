#Id cua notification_change
json._id @notification_change.id
#Doi tuong tac dong: gom ai tac dong va lam cai gi (comment nao, reply nao)
json.triggers @notification_change.distinct_triggers_by_user do |trigger|
	json._id trigger.id
	json.trigger_user do
		json._id trigger.trigger_user.id
		json.username trigger.trigger_user.username
		json.fullname trigger.trigger_user.fullname
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

	if @notification_change.notification.notificable_type == 'ClubPost'
		json._id @notification_change.notification.notificable.id
		json.club_name @notification_change.notification.notificable.club.name
		json.club_id @notification_change.notification.notificable.club.id
	end

	if @notification_change.notification.notificable_type == 'BussinessRequest'
		json.name @notification_change.notification.notificable.name
		json._id @notification_change.notification.notificable.id
	end

	if @notification_change.notification.notificable_type == 'Comment'

		json.comment_id @notification_change.notification.notificable.id
		json.content @notification_change.notification.notificable.content

		#id cua bai post chua comment
		if @notification_change.notification.notificable.post
			json._id @notification_change.notification.notificable.post.id
			json.post_title  @notification_change.notification.notificable.post.title
		end

		if @notification_change.notification.notificable.club_post
			json._id @notification_change.notification.notificable.club_post.id
			json.club_id @notification_change.notification.notificable.club_post.club.id
		end

	end

	#Do reply la embedded trong comment nen ko fetch reply trong notificable
	if @notification_change.notification.notificable_type == 'Reply'
		json.content @notification_change.notification.reply.content
		json.comment_content @notification_change.notification.reply.comment.content

		if @notification_change.notification.reply.comment.post
			json._id @notification_change.notification.reply.comment.post.id
		end

		if @notification_change.notification.reply.comment.club_post
			json._id @notification_change.notification.reply.comment.club_post.id
			json.club_id @notification_change.notification.reply.comment.club_post.club.id
		end
		#id cua reply
		json.reply_id @notification_change.notification.notificable_id
	end

end
#Loai tac dong

json.notification_category do
	json._id @notification_change.notification_category.id
	json.name @notification_change.notification_category.name
	if @notification_change.notification_category.have_template?
		json.notification_template do
			json.content @notification_change.notification_category.notification_template.content
		end
	end

end
#1 so thong tin khac
json.watched @notification_change.watched
json.is_new @notification_change.is_new
json.loaded @notification_change.loaded
json.created_at @notification_change.created_at
json.updated_at @notification_change.updated_at
