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
end
