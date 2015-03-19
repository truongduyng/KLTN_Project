class Information
  include Mongoid::Document

  field :birthday, type: Date
  field :job, type: String
  field :phone, type: String
  field :address, type: String
  field :mobile_phone, type: String

  #for bussiness
  field :short_desc, type: String
  field :description, type: String
  field :bussiness_name, type: String

  field :created_at, type: DateTime
  field :updated_at, type: DateTime
  embedded_in :user

  before_create :init_created_at
  before_save :update_updated_at
  
  private 
  def init_created_at
    self.created_at = Time.now
    self.updated_at = self.created_at
  end
  def update_updated_at
    self.updated_at = Time.now
  end
end