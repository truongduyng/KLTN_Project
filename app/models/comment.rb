class Comment
	include Mongoid::Document
	include Mongoid::Timestamps
	
	field :content, type: String

	belongs_to :post
	belongs_to :user
	embeds_many :likes, as: :likeable
	embeds_many :replies

	#validate
	validates :content, presence: true
	#callback
	
end

# {
# 	content:'',
# 	user_id: '',
# 	post_id: '',
# 	likes: [{
# 		id: '',
# 		user_id: '',
# 		likeable_id: '',
# 		likeable_type: '',
# 	}
# 	],
# }