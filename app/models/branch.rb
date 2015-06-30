class Branch
  include Mongoid::Document
  include Geocoder::Model::Mongoid
  include Mongoid::Timestamps

  field :name, type: String
  field :phone, type: String
  field :address, type: String
  field :coordinates, type: Array
  field :url_alias, type: String
  field :begin_work_time, type: String
  field :end_work_time, type: String

  geocoded_by :address do |obj,result|
    obj.coordinates = []
    if geo = result.first
      obj.coordinates[0] = geo.longitude
      obj.coordinates[1] = geo.latitude
    end
  end

  after_validation :geocode

  index({ coordinates: "2d" }, { min: -180, max: 180 })
  index({name: "text", address: "text", url_alias: "text"}, {weights: {name: 10, address: 5, url_alias: 7}, name: "BranchIndex"})

  belongs_to :bussiness

  has_many :assets, dependent: :destroy
  has_many :asset_categories, dependent: :destroy
  has_many :tickets, dependent: :destroy

  validates :name, :url_alias, presence: true,  length: {maximum: 100}
  validates :address, presence: true, length: {maximum: 1000}
  validates :url_alias, uniqueness: true
  validates :begin_work_time, :end_work_time, presence: true

  VALID_PHONE_REGEX = /[0]{1}[0-9]{9,10}/i
  validates :phone, presence: true, format: { with: VALID_PHONE_REGEX }

  time_valid = %w(0:00 0:30 1:00 1:30 2:00 2:30 3:00 3:30 4:00 4:30 5:00 5:30 6:00 6:30 7:00 7:30 8:00 8:30 9:00 9:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00 22:30 23:00 23:30 24:00)

  validates :begin_work_time, :end_work_time, inclusion: { in: time_valid, message: "%{value} is not a valid time."}

  validate :check_time

  def check_time
    bt = begin_work_time.split(":")
    et = end_work_time.split(":")
    if (bt[0].to_i > et[0].to_i) || (bt[0].to_i == et[0].to_i && bt[1].to_i > et[1].to_i)
      errors.add(:begin_work_time, "can't not be greater end_time")
      return false
    end
  end

  # def address
  # 	return self.street + self.district + self.city
  # end

  def self.search(param_search)
    # byebug
    if param_search[:lat]

      return Branch.near([param_search[:lat].to_f, param_search[:lng].to_f], param_search[:distance].to_f, order:"distance")
    end

    if param_search[:search_query]
      # result = Branch.near(param_search[:search_query], 2, order:"distance").to_a + Branch.any_of(
      #   {name: /#{param_search[:search_query]}/i},
      #   {address: /#{param_search[:search_query]}/i}).limit(7).to_a

      results = Branch.near(param_search[:search_query], 2, order:"distance").to_a
      Branch.text_search(param_search[:search_query]).to_a.each do |b|
        if !results.include? b
          results << b
        end
      end

      return results
    end

    return nil
  end
end
