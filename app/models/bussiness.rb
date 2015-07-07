class Bussiness
  include Mongoid::Document
  field :name, type: String
  field :category, type: String #Linh vuc

  ##BN
  field :avatar, type: String
  mount_uploader :avatar, AvatarUploader
  #Thuoc tinh cho thay 1 bussiness do co bi cam hay ko
	#mac dinh la ko bi cam
  field :is_banned, type: Boolean, default: ->{false}
  ##BN

  belongs_to :user
  has_many :branches, dependent: :destroy
end

