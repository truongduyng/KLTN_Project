class Fee
  include Mongoid::Document
  field :from, type: Time
  field :to, type: Time
  field :fee, type: Decimal
end
