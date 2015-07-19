json.extract! @venue, :_id, :name, :phone, :description, :address, :coordinates, :photos, :begin_work_time, :end_work_time,:created_at, :updated_at, :user
json.rates @rate_total_by_level do |rate|
	json.level rate[0]
	json.total rate[1]
end
if user_signed_in?
	json.your_rate_level @your_level
else
	json.your_rate_level 2
end