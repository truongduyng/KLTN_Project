json.posts @all_posts do |post|
	json._id post.id
	json.title post.title
	json.body post.body
	json.user post.user
	json.status post.post_status
	json.published post.published?
	json.created_at post.created_at
	json.updated_at post.updated_at
end
json.total @total