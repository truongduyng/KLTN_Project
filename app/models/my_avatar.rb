#Model cho test upload
class MyAvatar 
	include Mongoid::Document
	field :image, type: String
	mount_uploader :image, AvatarUploader
end