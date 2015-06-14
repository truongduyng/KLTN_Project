class Asset
  include Mongoid::Document
  field :name, type: String
  field :description, type: String

  has_many :tickets
  belongs_to :branch
  belongs_to :asset_category

  validates :name, presence: true, length: {maximum: 1000}
end