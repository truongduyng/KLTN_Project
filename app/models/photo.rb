# class Photo
# 	include Mongoid::Document
# 	field :image, type: String
# 	mount_uploader :image, ImageUploader
	
# 	belongs_to :post
# end


# Moi sua de lam ckeditor, coi thu post co bi tac dong ko 
class Photo
	include Mongoid::Document
	field :image, type: String
	mount_uploader :image, ImageUploader

	embedded_in :post
end