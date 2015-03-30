class PostStatus
	include Mongoid::Document
	field :name, type: String
	#ko co 2 status cung ten
	validates_uniqueness_of :name
	has_many :posts

	def self.publishedStatus
		PostStatus.where(name: 'Đã duyệt').first
	end
end

# Gom 3 tinh trang:
# 	Chưa duyệt
# 	Đã duyệt
# 	Từ chối