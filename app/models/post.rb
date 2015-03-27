# class Post 
# 	include Mongoid::Document
# 	field :title, type: String
# 	field :body, type: String

# 	#Chi test nen de default la true, mac dinh la false
# 	field :published, type: Boolean, default: ->{true}
# 	has_many :photos
# 	belongs_to :user
# end

class Post 
	include Mongoid::Document
	include Mongoid::Timestamps
	include Mongoid::Paranoia
	
	field :title, type: String
	field :body, type: String
	#Chi test nen de default la true, mac dinh la false
	field :published, type: Boolean, default: ->{false}
	

	embeds_many :photos
	belongs_to :user
	has_many :comments
	embeds_many :likes, as: :likeable

	#validate
	validates :title, presence: true
	validates :body, presence: true
	#callback
	

end
