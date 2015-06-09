class Venue
  include Mongoid::Document
  include Geocoder::Model::Mongoid
  include Mongoid::Timestamps

  field :name, type: String
  field :phone, type: String
  field :address, type: String
  field :coordinates, type: Array
  field :url_alias, type: String

  geocoded_by :address do |obj,result|
    obj.coordinates = []
    if geo = result.first
      obj.coordinates[0] = geo.longitude
      obj.coordinates[1] = geo.latitude
    end
  end

  after_validation :geocode
  index({ coordinates: "2d" }, { min: -180, max: 180 })
  validates :name, :url_alias, presence: true,  length: {maximum: 100}
  validates :address, presence: true, length: {maximum: 1000}
  validates :url_alias, uniqueness: true

  # def address
  #   return self.street + self.district + self.city
  # end

  # def self.search(param_search)
  #   # byebug
  #   if param_search[:lat]

  #     return Branch.near([param_search[:lat].to_f, param_search[:lng].to_f], param_search[:distance].to_f, order:"distance")
  #   end

  #   if param_search[:search_query]
  #     result = Branch.near(param_search[:search_query], 2, order:"distance").to_a + Branch.any_of(
  #       {name: /#{param_search[:search_query]}/i},
  #       {address: /#{param_search[:search_query]}/i}).limit(7).to_a
  #     return result
  #   end

  #   return nil
  # end
end