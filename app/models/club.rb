class Club
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :admins, type: Array
  field :members, type: Array

  validates :name, presence: true

end