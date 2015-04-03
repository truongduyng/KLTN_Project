class Post 
	include Mongoid::Document
	include Mongoid::Timestamps
	include Mongoid::Paranoia
	
	field :title, type: String
	field :body, type: String
	#Chi test nen de default la true, mac dinh la false
	belongs_to :post_status
	
	embeds_many :photos
	belongs_to :user
	has_many :comments, dependent: :destroy
	embeds_many :likes, as: :likeable

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

	#Method
	#check 1 post da publish chua, return true or false
	def published?
		# puts 'in method'
		self.post_status.name == 'Đã duyệt'
	end

	private
		#Gan gia tri chua duyet la mac dinh khi tao ra post
		def init_post_status
			# @status = PostStatus.where(name: 'Chưa duyệt').first
			# self.post_status = @status
			self.post_status = PostStatus.not_published_status
		end
end
