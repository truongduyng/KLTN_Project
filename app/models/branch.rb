class Branch
  include Mongoid::Document
  include Geocoder::Model::Mongoid

  field :name, type: String
  field :phone, type: String
  field :address, type: String
  field :coordinates, type: Array
  field :url_alias, type: String
  field :begin_work_time, type: String
  field :end_work_time, type: String

  geocoded_by :address
  after_validation :geocode
  index({ coordinates: "2d" }, { min: -180, max: 180 })

  belongs_to :bussiness
  has_many :assets
  has_many :asset_categories
  has_many :tickets

  validates :name, :url_alias, :address, presence: true,  length: {maximum: 100}
  validates :address, presence: true, length: {maximum: 1000}
  validates :url_alias, uniqueness: true

  # def address
  # 	return self.street + self.district + self.city
  # end

  def self.search(param_search)
    if param_search[:lat]
      return Branch.near([param_search[:lat].to_f, param_search[:lng].to_f], param_search[:distance].to_f, order:"distance")
    else
      if param_search[:search_query] == "all"
        return Branch.all
      end
      return Branch.near(param_search[:search_query], 2, order:"distance")
    end
  end
end
