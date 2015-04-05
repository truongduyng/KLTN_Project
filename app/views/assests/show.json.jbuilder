json.extract! @assest, :_id, :name, :description, :quantity
json.branch do
	json.extract! @assest.branch, :_id, :name, :address, :latitude, :longitude
end
json.assest_category do
	json.extract! @assest.assest_category, :_id, :name, :short_desc
end

# json.extract! @assest, :_id, :name, :quantity, :branch_id, :assest_category_id