json.array! @likes do |like|
	json.extract! like, :_id, :user
end