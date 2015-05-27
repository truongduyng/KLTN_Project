class Identity
  include Mongoid::Document
	field :provider, type: String
	field :uid, type: String 
	belongs_to :user
	
	validates :provider, presence: true
	validates :uid, presence: true, uniqueness: true
	
end