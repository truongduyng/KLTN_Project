class Club
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :admins, type: Array

  has_and_belongs_to_many :members, class_name: "User"

  validates :name, presence: true

end