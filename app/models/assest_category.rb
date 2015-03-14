class AssestCategory 
	include Mongoid::Document
	field :name, type: String
	field :short_desc, type: String
	field :description, type: String
	
	belongs_to :bussiness
	embeds_many :fees
	has_many :assests

	validates :name, presence: true, length: {maximum: 1000}
end

#assest_category.fees << Fee.new