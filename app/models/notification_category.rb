class NotificationCategory
	include Mongoid::Document
	#Ten Loai: 'kich hoat tai khoan thanh cong', 'bai viet bi tu choi', 'bai viet cua ban dc chap nhan'
	field :name, type: String
	#Tuy loai, co loai thong bao se co template rieng
	embeds_one :notification_template
	#Moi loai co nhieu thong bao
	has_many :notification_changes

	#ko co 2 NotificationCategory cung ten
	validates_uniqueness_of :name
end