class Post
	include Mongoid::Document
	include Mongoid::Timestamps
	include Mongoid::Paranoia

	field :title, type: String
	field :body, type: String
	#Chi test nen de default la true, mac dinh la false
	belongs_to :post_status

	embeds_many :photos, as: :photoable
	belongs_to :user, class_name: 'User', inverse_of: :posts
	has_many :comments, dependent: :destroy
	embeds_many :likes, as: :likeable
	#Notification system
	#Doi tuong nay co the duoc notification lien quan
	has_many :notifications, as: :notificable
	#trigger 1 thong bao nao (chap nhan hay tu choi bai viet)
	has_one :notification_change_trigger, as: :trigger_source
	#followers
	has_and_belongs_to_many :followers, class_name: 'User', inverse_of: :followed_posts

	index({title: "text", body: "text"}, {weights: {title: 10, body: 2}, name: "TextIndex"})

	#scope
	#Get published post
	scope :published, -> {
		publishedStatus = PostStatus.publishedStatus
		where(post_status_id: publishedStatus.id)
	}
	scope :not_published, ->{
		not_published_status = PostStatus.not_published_status
		where(post_status_id: not_published_status.id)
	}

	scope :accept_or_deny, ->{
		publishedStatus = PostStatus.publishedStatus
		deny_status = PostStatus.deny_status
		self.any_of({post_status_id: publishedStatus.id}, {post_status_id: deny_status.id})
	}

	#validate
	validates :title, presence: true
	validates :body, presence: true

	#callback
	before_create :init_post_status

	def published?
		self.post_status.name == 'Đã duyệt'
	end

	private
	def init_post_status
		self.post_status = PostStatus.not_published_status
	end
end
