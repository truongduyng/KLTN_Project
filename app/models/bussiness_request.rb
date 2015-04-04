class BussinessRequest
	include Mongoid::Document
	field :name, type: String
	field :address, type: String
	field :phone, type: String
	field :category, type: String #Linh vuc
	field :description, type: String
	field :latitude, type: Float
	field :longtitude, type: Float
	belongs_to :status, :class_name :BussinessRequestStatus, inverse_of: :bussiness_requests
	#for notification
	has_one :notification, as: :notificable
end
# Gom 3 tinh trang:
# 	Chưa duyệt
# 	Đã duyệt
# 	Từ chối