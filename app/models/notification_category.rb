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

	#METHOD
	def self.duyet_bai_viet
		NotificationCategory.where(name: 'Duyệt bài viết').first
	end

	def self.tu_choi_bai_viet
		NotificationCategory.where(name: 'Từ chối bài viết').first
	end

	def self.chap_nhan_yeu_cau_doanh_nghiep
		NotificationCategory.where(name: 'Chấp nhận yêu cầu kích hoạt tài khoản doanh nghiệp').first
	end

	def self.tu_choi_cap_tai_khoan_doanh_nghiep
		NotificationCategory.where(name: 'Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp').first
	end
end

##Gom cac loai sau:
# 1.Duyệt bài viết
# 2.Từ chối bài viết
# 3.Chấp nhận yêu cầu kích hoạt tài khoản doanh nghiệp
# 4.Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp