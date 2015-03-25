json.extract! @reply, :_id, :content, :created_at, :updated_at, :user
json.like_count @reply.likes.count
if user_signed_in? && @reply.likes.where('user_id' => current_user.id).first
	json.isLiked true
else
	json.isLiked false
end