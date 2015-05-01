class Ticket
  include Mongoid::Document
  include Mongoid::Timestamps

  field :begin_use_time, type: Time
  field :end_use_time, type: Time
  field :price, type: Float
  field :status, type: String

  belongs_to :user
  belongs_to :branch
  belongs_to :asset

  def self.onday(date, branch_id)
    # byebug
    return Ticket.where(:begin_use_time => (Time.parse(date)..Time.parse(date+" 23:59:59")),branch_id: branch_id)
  end
end
