class Branch
  include Mongoid::Document
  include Geocoder::Model::Mongoid

  field :name, type: String
  field :phone, type: String
  field :address, type: String
  field :coordinates, :type => Array
  geocoded_by :address
  after_validation :geocode
  index({ coordinates: "2d" }, { min: -180, max: 180 })

  belongs_to :bussiness
  has_many :assests

  validates :name, presence: true,  length: {maximum: 100}
  validates :address, presence: true, length: {maximum: 1000}

  # def address
  # 	return self.street + self.district + self.city
  # end

  def self.search_latlng(params)
    if params
      return Branch.near([params[:lat].to_f, params[:lng].to_f], 2, order:"distance")
    else
      return Branch.all
    end
  end

  # def self.search_name_and_address(seach_query)
  #   if seach_query
  #     return Branch.near(seach_query, 5, order: "distance")
  #   end
  # end
end
