class Bussiness
	include Mongoid::Document
	field :name, type: String
	#address bo thay the boi address cua branch
	field :address, type: String
	field :phone, type: String
	field :category, type: String #Linh vuc
	field :short_desc, type: String
	field :description, type: String

	belongs_to :user
	has_many :asset_categories
	has_many :branches
end
