class Asset
  include Mongoid::Document
  field :type, type: String
  field :name, type: String
  field :description, type: String
end
