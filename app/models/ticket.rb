class Ticket
  include Mongoid::Document
  include Mongoid::Timestamps

  field :begin_use_time, type: Time
  field :end_use_time, type: Time
  field :price, type: Float
  field :status, type: String
  field :customer_name, type: String
  field :customer_phone, type: String

  belongs_to :user
  belongs_to :branch
  belongs_to :asset

  validates :begin_use_time,:end_use_time, :price, :status, :customer_name, :customer_phone, presence: true
  validate :check_time

  def self.onday(date, branch_id)
    return Ticket.where(:begin_use_time => (date.to_time..(date+" 23:59:59").to_time),branch_id: branch_id)
  end

  def check_time
    # byebug
    tickets = Ticket.where(:begin_use_time => (begin_use_time.beginning_of_day.. begin_use_time.end_of_day),branch_id: branch_id, asset_id: asset_id)
    tickets = tickets.to_a
    tickets.delete_if {|ticket| ticket._id == _id}
    tickets.each do |ticket|
      if((ticket.begin_use_time < begin_use_time && begin_use_time < ticket.end_use_time) ||(ticket.begin_use_time < end_use_time && end_use_time < ticket.end_use_time))
        errors.add(:begin_time, "can't not be greater end_time")
        return false
      end
    end
  end

end
