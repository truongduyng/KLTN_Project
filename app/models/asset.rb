class Asset
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  embedded_in: assetcategory
end
