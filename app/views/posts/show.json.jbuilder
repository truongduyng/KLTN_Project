
# json.extract! @post, :_id, :title, :body, :photos, :created_at, :updated_at, :user
# json.published @post.published?
# json.status @post.post_status
# if user_signed_in? && @post.likes.where('user_id' => current_user.id).first
# 	json.isLiked true
# else
# 	json.isLiked false
# end

# if user_signed_in? && current_user.favorite_posts.where(post_id: @post.id).first
# 	json.isFavorited true
# else
# 	json.isFavorited false
# end

# if user_signed_in? && @post.follower_ids.include?(current_user.id)
# 	json.followed true
# else
# 	json.followed false
# end

# json.like_count @post.likes.count
# json.comments @post.comments do |comment|
# 	json._id comment.id
# 	json.content comment.content
# 	json.created_at comment.created_at
# 	json.updated_at comment.updated_at
# 	json.user comment.user
# 	json.like_count comment.likes.count
# 	json.reply_count comment.replies.count
# 	if user_signed_in? && comment.likes.where('user_id' => current_user.id).first
# 		json.isLiked true
# 	else
# 		json.isLiked false
# 	end
# end




json.extract! @post, :_id, :title, :body, :photos, :created_at, :updated_at, :user
json.published @post.published?
json.status @post.post_status
if user_signed_in? && @post.likes.where('user_id' => current_user.id).first
	json.isLiked true
else
	json.isLiked false
end

if user_signed_in? && current_user.favorite_posts.where(post_id: @post.id).first
	json.isFavorited true
else
	json.isFavorited false
end

if user_signed_in? && @post.follower_ids.include?(current_user.id)
	json.followed true
else
	json.followed false
end

json.like_count @post.likes.count
json.comments @post.comments do |comment|
	json._id comment.id
	json.content comment.content
	json.user do 
		json._id comment.user.id
		json.avatar do 
			json.url comment.user.avatar.url
		end 
		json.username comment.user.username
	end
	json.created_at comment.created_at
	json.updated_at comment.updated_at
	json.like_count comment.likes.count
	json.reply_count comment.replies.count
	if user_signed_in? && comment.likes.where('user_id' => current_user.id).first
		json.isLiked true
	else
		json.isLiked false
	end
end
