<<<<<<< HEAD
class Fee
	include Mongoid::Document
	field :begin_time, type: Time
	field :end_time, type: Time
	field :fee, type: Float
	embedded_in: assetcategory
end
=======
#Phai validate begin_time < end_time
class Fee 
	include Mongoid::Document
	
	field :begin_time, type: Time, default: ->{Time.now}
	field :end_time, type: Time, default: ->{Time.now}
	field :price, type: Float, default: ->{0}

	validates :price, presence: true
	embedded_in :assest_category

end
>>>>>>> master
