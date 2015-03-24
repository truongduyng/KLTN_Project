json.array! @replies do |reply|
	json.extract! reply, :_id, :content, :created_at, :updated_at, :user, :likes
end