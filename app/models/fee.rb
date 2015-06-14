class Fee
  include Mongoid::Document

  time_valid = %w(0:00 0:30 1:00 1:30 2:00 2:30 3:00 3:30 4:00 4:30 5:00 5:30 6:00 6:30 7:00 7:30 8:00 8:30 9:00 9:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00 22:30 23:00 23:30 24:00)

  field :begin_time, type: String
  field :end_time, type: String
  field :price, type: Integer

  embedded_in :assest_category

  validates :price, :begin_time, :end_time, presence: true
  validates :begin_time, :end_time, inclusion: { in: time_valid, message: "%{value} is not a valid time."}
  validate :check_time

  def check_time
    bt = begin_time.split(":")
    et = end_time.split(":")
    if (bt[0].to_i > et[0].to_i) || (bt[0].to_i == et[0].to_i && bt[1].to_i > et[1].to_i)
      errors.add(:begin_time, "can't not be greater end_time")
      return false
    end
  end
end