json.likes @likes, :_id, :user
json.number_of_remains (@reply.likes.count - @likes.count)