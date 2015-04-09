class Reply
	include Mongoid::Document
	include Mongoid::Timestamps
	
	field :content, type: String
	belongs_to :user
	embedded_in :comment
	embeds_many :likes, as: :likeable
	#Thong bao
	has_one :notification, as: :notificable
end