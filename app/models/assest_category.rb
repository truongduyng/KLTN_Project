class AssestCategory 
	include Mongoid::Document
	field :name, type: String
	field :short_desc, type: String
	field :description, type: String
	
	belongs_to :bussiness
	embeds_many :fees
	accepts_nested_attributes_for :fees
end

#assest_category.fees << Fee.new