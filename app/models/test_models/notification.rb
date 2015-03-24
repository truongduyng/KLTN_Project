# class User
# 	has_many :notifications
# end

# class Notitication
# 	field :content, type: String
# 	field :created_at, type: DateTime
# 	belongs_to :notification_category
# 	belongs_to :user

# end

# class LikeCommentNotifcation
# 	belongs_to :nguoithich

# 	field :content #dinh dang content theo dang ntn, 
# 	belongs_to :
# end

# # class LikeCommentNotification
# # 	nguoithich_id
# # 	comment_id
# # 	user_id
# # end

# # class LikePostNotification
# # 	nguoithich_id
# # 	post_id
# # 	user_id
# # end

# class LikeNotification
# 	belongs_to :person_like
# 	belongs_to :notificable, polymoric: true
# 	belongs_to :user
# end




# Huu Trung thich comment cua ban (Bao Quyen)
# Add like for Huu Trung tao ra noi dung
# current_user.name +  "thich binh luan cua "  + post.user
# "Huu Trung"  + "da comment bai viet cua ban " + post.user 
