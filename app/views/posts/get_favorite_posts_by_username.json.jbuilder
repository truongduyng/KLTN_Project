json.posts @favorite_posts do |post|
	json._id post.id
	json.title post.title
	json.body post.body
	json.user post.user
	json.status post.post_status
	json.published post.published
end
json.total @total