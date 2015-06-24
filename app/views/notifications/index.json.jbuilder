json.notifications do
	json.array! @results do |nc|
		json._id nc.id
		#Nguoi tac dong
		# json.trigger_users nc.trigger_users do |user|
		# 	json._id user.id
		# 	json.username user.username
		# 	json.avatar user.avatar.url
		# end
		#Doi tuong tac dong: gom ai tac dong va lam cai gi (comment nao, reply nao)
		json.triggers nc.distinct_triggers_by_user do |trigger|
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
			# json.notification_change_ids trigger.notification_changes do |ncc|
			# 	json.id ncc.id
			# end
		end

		json.target_object do
	if nc.notification.notificable_type == 'Post'
		json.title nc.notification.notificable.title
		json._id nc.notification.notificable.id
	end

	if nc.notification.notificable_type == 'ClubPost'
		json._id nc.notification.notificable.id
		json.club_name nc.notification.notificable.club.name
		json.club_id nc.notification.notificable.club.id
	end

	if nc.notification.notificable_type == 'BussinessRequest'
		json.name nc.notification.notificable.name
		json._id nc.notification.notificable.id
	end

	if nc.notification.notificable_type == 'Comment'

		json.comment_id nc.notification.notificable.id
		json.content nc.notification.notificable.content

		#id cua bai post chua comment
		if nc.notification.notificable.post
			json._id nc.notification.notificable.post.id
			json.post_title  nc.notification.notificable.post.title
		end

		if nc.notification.notificable.club_post
			json._id nc.notification.notificable.club_post.id
			json.club_id nc.notification.notificable.club_post.club.id
		end

	end

	#Do reply la embedded trong comment nen ko fetch reply trong notificable
	if nc.notification.notificable_type == 'Reply'
		json.content nc.notification.reply.content
		json.comment_content nc.notification.reply.comment.content

		if nc.notification.reply.comment.post
			json._id nc.notification.reply.comment.post.id
		end

		if nc.notification.reply.comment.club_post
			json._id nc.notification.reply.comment.club_post.id
			json.club_id nc.notification.reply.comment.club_post.club.id
		end
		#id cua reply
		json.reply_id nc.notification.notificable_id
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
		json.loaded nc.loaded
		json.created_at nc.created_at
		json.updated_at nc.updated_at

	end
end

json.new_notifications_count @new_notifications_count
