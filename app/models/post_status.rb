class PostStatus
	include Mongoid::Document
	field :name, type: String
	#ko co 2 status cung ten
	validates_uniqueness_of :name
	has_many :posts

	def self.publishedStatus
		PostStatus.where(name: 'Đã duyệt').first
	end

	def self.not_published_status
		PostStatus.where(name: 'Chưa duyệt').first
	end

	def self.deny_status
		PostStatus.where(name: 'Từ chối').first
	end

end

# Gom 3 tinh trang:
# 	Chưa duyệt
# 	Đã duyệt
# 	Từ chối