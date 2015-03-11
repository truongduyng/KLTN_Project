class Bussiness
	include Mongoid::Document
	field :name, type: String
	field :address, type: String
	field :phone, type: String
	field :category, type: String #Linh vuc
	field :short_desc, type: String
	field :description, type: String
	
	belongs_to :user
	has_many :assest_categories
end