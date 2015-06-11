class Notification
	include Mongoid::Document
	#Thuoc ve ai
	belongs_to :target_user, class_name: 'User', inverse_of: :notifcations
	#Notificable hoac la post hoac la bussiness_request
	belongs_to :notificable, polymorphic: true
	#1 doi tuong bi tac dong boi nhieu loai hanh dong khac nhau
	has_many :notification_changes

	#cho tim reply, notificable lien he vs reply la embedded document nen ko the tim kiem dc
	def reply
		comment = Comment.where('replies._id' => notificable_id).first
		if comment
			reply = comment.replies.find(notificable_id)
		end
	end

	def self.find_or_create target_user, target_object
		#B1: Kiem tra target_user la user object hay la id cua user
		if target_user.class.to_s == 'User'
			target_user_id = target_user.id
		else
			if target_user.class.to_s == 'BSON::ObjectId'
				target_user_id = target_user
			end
		end
		#B1: Tim
		notification  = Notification.all_of(target_user_id: target_user_id, notificable_id: target_object.id).first
		#B2: Neu chua co loai notification cho doi tuong nay thi tao no
		if !notification
			notification = Notification.new
			notification.target_user_id = target_user_id
			notification.notificable = target_object
			notification.save
		end
		#B3: Tra ve
		return notification
	end

	# def self.find_or_create target_user, target_object
	# 	#B1: Tim
	# 	notification  = Notification.all_of(target_user_id: target_user.id, notificable_id: target_object.id).first
	# 	#B2: Neu chua co loai notification cho doi tuong nay thi tao no
	# 	if !notification
	# 		notification = Notification.new
	# 		notification.target_user = target_user
	# 		notification.notificable = target_object
	# 		notification.save
	# 	end
	# 	#B3: Tra ve
	# 	return notification
	# end
end

#55269d7268757511c3860000
#55123c516875750ae52e0000
#Notification.find_reply '55123c516875750ae52e0000'


# n  = Notification.find_or_create(User.first.id, Post.first)