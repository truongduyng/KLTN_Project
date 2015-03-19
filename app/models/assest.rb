class Assest
	include Mongoid::Document
	field :name, type: String
	field :quantity, type: Integer, default: ->{1}
	field :description, type: String
	
	belongs_to :branch
	belongs_to :assest_category

	validates :name, presence: true, length: {maximum: 1000}
end