class Comment
	include Mongoid::Document
	include Mongoid::Timestamps
	
	field :content, type: String

	belongs_to :post
	belongs_to :user
	embeds_many :likes, as: :likeable
	embeds_many :replies
	#Thong bao: thuoc ve 1 thong bao nao do, va bi chi phooi boi nhieu loai tac dong tao ra nhieu thong bao
	has_one :notification, as: :notificable
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