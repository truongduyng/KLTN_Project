class Review
	include Mongoid::Document
	include Mongoid::Timestamps

	field :content, type: String
	validates :content, presence: true

	belongs_to :user
	belongs_to :venue, class_name: 'Branch', inverse_of: :reviews
end