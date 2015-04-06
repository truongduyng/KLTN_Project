json.extract! @bussiness, :_id, :avatar, :category, :description, :is_banned, :name, :phone, :user
json.branches @bussiness.branches do |branch|
	json.extract! branch, :_id, :name, :address, :latitude, :longitude, :phone, :description, :created_at, :updated_at
end