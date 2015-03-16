class Branch
  include Mongoid::Document
  field :name, type: String
  field :address, type: String
  field :latitude, type: Float
  field :longtitude, type: Float
  embedded_in: bussiness
  embeds_many: assetcategories
end
