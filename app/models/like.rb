class Like 
	include Mongoid::Document
	include Mongoid::Timestamps::Created

	belongs_to :user
	embedded_in :likeable, polymorphic: true
	#callback
end