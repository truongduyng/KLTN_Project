class Bussiness
	include Mongoid::Document
	field :name, type: String
	#address bo thay the boi address cua branch
	field :address, type: String
	field :phone, type: String
	field :category, type: String #Linh vuc
	field :short_desc, type: String
	field :description, type: String
	#Moi bussiness co 1 avatar
	field :avatar, type: String
	mount_uploader :avatar, AvatarUploader
	#Thuoc tinh cho thay 1 bussiness do co bi cam hay ko
	#mac dinh la ko bi cam
	field :is_banned, type: Boolean, default: ->{false}
	belongs_to :user
	has_many :assest_categories
	has_many :branches

	# before_create :init_avatar
	
	# private
	# 	#chua test
	# 	#Khoi tao avatar mac dinh
	# 	def init_avatar
	# 		self.avatar = current_user.avatar
	# 	end
end