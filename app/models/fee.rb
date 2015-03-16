class Fee
	include Mongoid::Document
	field :begin_time, type: Time
	field :end_time, type: Time
	field :fee, type: Float
	embedded_in: assetcategory
end
