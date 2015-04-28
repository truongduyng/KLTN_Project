#Phai validate begin_time < end_time
class Fee
  include Mongoid::Document

  field :begin_time, type: String, default: ->{Time.now}
  field :end_time, type: String, default: ->{Time.now}
  field :price, type: Float, default: ->{0}

  validates :price, presence: true
  embedded_in :assest_category
end