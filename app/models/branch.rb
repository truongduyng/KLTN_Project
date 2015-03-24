class Branch 
	include Mongoid::Document
	include Geocoder::Model::Mongoid
	field :name, type: String
	field :phone, type: String

	field :address, type: String
	field :coordinates, :type => Array
	geocoded_by :address
	after_validation :geocode

	belongs_to :bussiness
	has_many :assests

	validates :name, presence: true,  length: {maximum: 1000}
	validates :address, presence: true, length: {maximum: 1000}

	index({ coordinates: "2d" }, { min: -200, max: 200 })

	# def address
	# 	return self.street + self.district + self.city
	# end

	def self.search(param)
		if param
			return Branch.near(param, 1.5, :order => "distance") + Branch.where(name: param)
		end
	end
end
