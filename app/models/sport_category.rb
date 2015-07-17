class SportCategory
  include Mongoid::Document

  field :name, type: String
  field :icon, type: String

  validates :name, :icon, presence: true
  belongs_to :branch
end