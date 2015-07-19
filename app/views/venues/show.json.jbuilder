json.extract! @venue, :_id, :name, :phone, :description, :address, :coordinates, :photos, :begin_work_time, :end_work_time,:created_at, :updated_at, :user
json.rates @rate_total_by_level do |rate|
	json.level rate[0]
	json.total rate[1]
end