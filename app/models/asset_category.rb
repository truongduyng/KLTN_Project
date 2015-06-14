class AssetCategory
  include Mongoid::Document
  field :name, type: String
  field :short_desc, type: String
  field :description, type: String

  belongs_to :branch
  embeds_many :fees
  has_many :assets

  validates :name, presence: true, length: {maximum: 1000}
end
