json.bussiness_requests @bussiness_requests do |br|
	json._id br.id
	json.name br.name
	json.address br.address
	json.category br.category
	json.latitude br.latitude
	json.longitude br.longitude
	json.status br.status
	json.user br.user
	json.created_at br.created_at
	json.updated_at br.updated_at
end
json.total @total
