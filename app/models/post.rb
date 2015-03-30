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
	has_many :comments
	embeds_many :likes, as: :likeable

	#scope
	
	#validate
	validates :title, presence: true
	validates :body, presence: true
	#callback
	before_create :init_post_status

	#Method
	#check 1 post da publish chua, return true or false
	def published
		# puts 'in method'
		self.post_status.name == 'Đã duyệt'
	end

	private
		#Gan gia tri chua duyet la mac dinh khi tao ra post
		def init_post_status
			@status = PostStatus.where(name: 'Chưa duyệt').first
			self.post_status = @status
		end
end
