json.array! @branches do |branch|
	json._id branch.id
	json.name branch.name
	json.url_alias branch.url_alias
end