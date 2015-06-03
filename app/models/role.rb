class Role
  include Mongoid::Document

  field :name, type: String
  ##BC
  has_and_belongs_to_many :users

  validates :name, uniqueness: true

  def self.bussiness_admin_role
  	self.where(name: 'bussiness admin').first
  end

  def self.system_admin_role
    self.where(name: 'system admin').first
  end

end
