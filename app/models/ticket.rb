class Ticket
  include Mongoid::Document
  field :booking_time, type: DateTime
  field :begin_use_time, type: DateTime
  field :end_use_time, type: DateTime
  field :price, type: Float
  field :status, type: String

  belongs_to :user
  belongs_to :branch
  belongs_to :asset
end
