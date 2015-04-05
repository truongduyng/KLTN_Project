class Branch 
	include Mongoid::Document
	field :name, type: String
	field :address, type: String
	field :phone, type: String
	field :latitude, type: Float
	field :longitude, type: Float

	belongs_to :bussiness
	has_many :assests

	validates :name, presence: true,  length: {maximum: 1000}
	validates :address, presence: true, length: {maximum: 1000}
end