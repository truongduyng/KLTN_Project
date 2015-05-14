class Image
	include Mongoid::Document
	field :image, type: String
	mount_uploader :image, ImageUploader

	validates :image, presence: true
	belongs_to :user
end