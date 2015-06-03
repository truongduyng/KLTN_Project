# class Role
#   include Mongoid::Document
#   field :name, type: String
# <<<<<<< HEAD
#   # has_many :users
#   has_and_belongs_to_many :users

#   def self.bussiness_admin_role
#   	self.where(name: 'bussiness admin').first
#   end
# =======
#   has_many :users
#   validates :name, uniqueness: true
# >>>>>>> merge_bussiness_admin
# end


class Role
  include Mongoid::Document
  
  field :name, type: String
  ##BC
  # has_and_belongs_to_many :users
  has_many :users
  ##EC
  
  def self.bussiness_admin_role
  	self.where(name: 'bussiness admin').first
  end
  
  ##BN
  validates :name, uniqueness: true
  ##EN

end
