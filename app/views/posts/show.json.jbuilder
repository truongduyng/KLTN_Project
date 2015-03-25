# json.extract! @post, :_id, :title, :body, :photos, :likes, :created_at, :updated_at, :user
# json.comments @post.comments, :_id, :content, :created_at, :updated_at, :user, :likes, :replies


# json.extract! @post, :_id, :title, :body, :photos, :likes, :created_at, :updated_at, :user
# json.comments @post.comments do |comment|
# 	json._id comment.id
# 	json.content comment.content
# 	json.created_at comment.created_at
# 	json.updated_at comment.updated_at
# 	json.user comment.user
# 	json.likes comment.likes
# 	json.reply_count comment.replies.count
# 	# json.replies comment.replies, :_id, :content, :created_at, :updated_at, :user, :likes
# end

json.extract! @post, :_id, :title, :body, :photos, :created_at, :updated_at, :user
if user_signed_in? && @post.likes.where('user_id' => current_user.id).first
	json.isLiked true
else
	json.isLiked false
end

json.like_count @post.likes.count
json.comments @post.comments do |comment|
	json._id comment.id
	json.content comment.content
	json.created_at comment.created_at
	json.updated_at comment.updated_at
	json.user comment.user
	json.like_count comment.likes.count
	json.reply_count comment.replies.count
	if user_signed_in? && comment.likes.where('user_id' => current_user.id).first
		json.isLiked true
	else
		json.isLiked false
	end
end
