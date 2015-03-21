json.extract! @post, :_id, :title, :body
json.photos do 
	json.array!(@post.photos) do |photo|
		json.extract! photo, :image
	end
end
# {
# 	_id:,
# 	title:,
# 	photos: [{

# 	}]
# }

# json.extract! @post, :_id, :title, :body, :photos