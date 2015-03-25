json.likes @likes, :_id, :user
json.number_of_remains (@post.likes.count - @likes.count)