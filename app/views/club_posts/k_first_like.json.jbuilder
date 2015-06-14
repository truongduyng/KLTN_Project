json.likes @likes do |like|
	json._id like.id
	json.user do
		json.username like.user.username
	end
end
json.number_of_remains (@clubpost.likes.count - @likes.count)