# json.extract! @post, :_id, :title, :body, :photos, :likes, :created_at, :updated_at, :user
# json.comments @post.comments, :_id, :content, :created_at, :updated_at, :user, :likes, :replies


json.extract! @post, :_id, :title, :body, :photos, :likes, :created_at, :updated_at, :user
json.comments @post.comments do |comment|
	json._id comment.id
	json.content comment.content
	json.created_at comment.created_at
	json.updated_at comment.updated_at
	json.user comment.user
	json.likes comment.likes
	json.replies comment.replies, :_id, :content, :created_at, :updated_at, :user, :likes
end
