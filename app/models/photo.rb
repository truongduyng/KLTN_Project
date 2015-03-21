class Photo
	include Mongoid::Document
	field :image, type: String
	mount_uploader :image, ImageUploader
	
	belongs_to :post
end

# class Photo
# 	include Mongoid::Document
# 	field :image, type: String
# 	mount_uploader :image, ImageUploader

# 	embedded_in :post
# end