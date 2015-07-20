json.array! @reviews do |review|
	json._id review.id
	json.content review.content
	json.user review.user
	# json.user do 
	# 	json._id review.user.id
	# 	json.fullname review.user.fullname
	# 	json.username review.user.username
	# 	json.
	# end
	json.updated_at review.updated_at
end