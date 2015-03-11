class Bussiness
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  field :address, type: String
  field :longitude, type: Float
  field :latitude, type: Float
end
