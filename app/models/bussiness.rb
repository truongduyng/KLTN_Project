class Bussiness
  include Mongoid::Document
  field :name, type: String
  field :description, type: String
  field :address, type: String
  embeds_many: branches
end
