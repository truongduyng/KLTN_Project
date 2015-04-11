class Reply
	include Mongoid::Document
	include Mongoid::Timestamps
	
	field :content, type: String
	belongs_to :user
	embedded_in :comment
	embeds_many :likes, as: :likeable
	#Thong bao
	has_one :notification, as: :notificable
	#La doi tuong duoc tao ra boi 1 nguoi do de trigger 1 notification
	has_one :notification_change_trigger, as: :trigger_source
end