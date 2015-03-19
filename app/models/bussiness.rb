class Bussiness
<<<<<<< HEAD
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  field :address, type: String
  embeds_many: branches
end
=======
	include Mongoid::Document
	field :name, type: String
	#address bo thay the boi address cua branch
	field :address, type: String
	field :phone, type: String
	field :category, type: String #Linh vuc
	field :short_desc, type: String
	field :description, type: String
	
	belongs_to :user
	has_many :assest_categories
	has_many :branches
end
>>>>>>> master
