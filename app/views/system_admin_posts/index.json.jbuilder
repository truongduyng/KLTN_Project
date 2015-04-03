json.posts @posts do |post|
	json._id post.id
	json.title post.title
	json.body post.body
	json.photos post.photos
	json.user post.user
	json.status post.post_status
	json.updated_at post.updated_at
	json.created_at post.created_at
end
json.total @posts.count
