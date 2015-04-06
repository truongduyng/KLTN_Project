class Branch 
	include Mongoid::Document
	include Mongoid::Timestamps
	
	field :name, type: String
	field :address, type: String
	field :phone, type: String
	field :latitude, type: Float
	field :longitude, type: Float
	field :description, type: String
	
	belongs_to :bussiness
	has_many :assests

	#validates
	validates :name, presence: true,  length: {maximum: 1000}
	validates :address, presence: true, length: {maximum: 1000}
	validates :latitude, presence: true
	validates :longitude, presence: true
	
end