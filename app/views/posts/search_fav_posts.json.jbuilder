json.posts @all_fav_posts do |post|
  json._id post.id
  json.title post.title
  json.body post.body
  json.user post.user
  json.created_at post.created_at
  json.updated_at post.updated_at
end