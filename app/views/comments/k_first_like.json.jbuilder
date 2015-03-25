json.likes @likes, :_id, :user
json.number_of_remains (@comment.likes.count - @likes.count)