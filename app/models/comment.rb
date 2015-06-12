class Comment
	include Mongoid::Document
	include Mongoid::Timestamps

	field :content, type: String

	belongs_to :post
	belongs_to :user
	belongs_to :club_post
	embeds_many :likes, as: :likeable
	embeds_many :replies
	#Thong bao: thuoc ve 1 thong bao nao do, va bi chi phooi boi nhieu loai tac dong tao ra nhieu thong bao
	has_many :notifications, as: :notificable
	#La doi tuong duoc tao ra boi 1 nguoi do de trigger 1 notification
	has_one :notification_change_trigger, as: :trigger_source
	#validate
	validates :content, presence: true

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