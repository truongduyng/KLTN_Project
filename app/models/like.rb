class Like 
	include Mongoid::Document
	include Mongoid::Timestamps::Created

	belongs_to :user
	embedded_in :likeable, polymorphic: true
	#La doi tuong duoc tao ra boi 1 nguoi do de trigger 1 notification
	has_one :notification_change_trigger, as: :trigger_source
	#callback
end