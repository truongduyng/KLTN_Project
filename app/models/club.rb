class Club
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :admins, type: Array

  has_and_belongs_to_many :members, class_name: "User"
  has_one :cover_image, class_name: 'Image'
  has_many :club_posts

  validates :name, presence: true

end