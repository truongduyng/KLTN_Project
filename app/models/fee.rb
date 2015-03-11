#Phai validate begin_time < end_time
class Fee 
	include Mongoid::Document
	field :begin_time, type: Time
	field :end_time, type: Time
	field :price, type: Float

	embedded_in :assest_category
end