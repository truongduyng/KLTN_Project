json.array! @likes do |like|
	json._id like.id
	json.user do
		json._id like.user.id
		json.avatar do
			json.url like.user.avatar.url
		end
		json.fullname like.user.fullname
	end
end