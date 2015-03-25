json.extract! @comment, :_id, :content, :created_at, :updated_at, :user
json.like_count @comment.likes.count
if user_signed_in? && @comment.likes.where('user_id' => current_user.id).first
	json.isLiked true
else
	json.isLiked false
end
json.reply_count @comment.replies.count