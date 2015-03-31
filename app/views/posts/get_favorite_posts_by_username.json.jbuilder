json.posts @favorite_posts do |favorite_post|
	json._id favorite_post.post.id
	json.title favorite_post.post.title
	json.body favorite_post.post.body
	json.user favorite_post.post.user
	json.status favorite_post.post.post_status
	json.published favorite_post.post.published?
end
json.total @total