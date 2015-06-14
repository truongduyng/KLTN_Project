class Information
  include Mongoid::Document
  include Mongoid::Timestamps

  field :birthday, type: Date
  field :job, type: String
  field :phone, type: String
  field :address, type: String
  field :mobile_phone, type: String

  #for bussiness
  field :short_desc, type: String
  field :description, type: String
  field :bussiness_name, type: String

  embedded_in :user
end