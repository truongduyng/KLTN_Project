class Post 
	include Mongoid::Document
	field :title, type: String
	field :body, type: String

	#Chi test nen de default la true, mac dinh la false
	field :published, type: Boolean, default: ->{true}
	has_many :photos
	belongs_to :user
end

# class Post 
# 	include Mongoid::Document
# 	field :title, type: String
# 	field :body, type: String

# 	#Chi test nen de default la true, mac dinh la false
# 	field :published, type: Boolean, default: ->{true}
# 	embeds_many :photos
# 	belongs_to :user
# end
