json.array! @all_posts do |post|
	json.title post.title
	json.body post.body
	json.user post.user
	json.status post.post_status
	json.published post.published?
end