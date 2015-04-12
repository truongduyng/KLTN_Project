class Branch
  include Mongoid::Document
  include Geocoder::Model::Mongoid

  field :name, type: String
  field :phone, type: String
  field :address, type: String
  field :coordinates, :type => Array
  geocoded_by :address
  after_validation :geocode
  index({ coordinates: "2d" }, { min: -200, max: 200 })

  belongs_to :bussiness
  has_many :assests

  validates :name, presence: true,  length: {maximum: 1000}
  validates :address, presence: true, length: {maximum: 1000}

  # def address
  # 	return self.street + self.district + self.city
  # end

  def self.search(param)
    if param
     return Branch.near([param[:lat].to_f, param[:lng].to_f], 70, :order => "distance")
   else
     Branch.all
   end
 end
end
