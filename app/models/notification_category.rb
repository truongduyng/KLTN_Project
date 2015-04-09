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

	def self.thich_bai_viet
		NotificationCategory.where(name: 'Thích bài viết').first
	end

	def self.binh_luan_bai_viet 
		NotificationCategory.where(name: 'Bình luận bài viết').first
	end

	def self.thich_binh_luan 
		NotificationCategory.where(name: 'Thích bình luận').first
	end

	def self.phan_hoi_binh_luan
		NotificationCategory.where(name: 'Phản hồi bình luận').first
	end
	
	def self.thich_phan_hoi
		NotificationCategory.where(name: 'Thích phản hồi').first
	end

end

##Gom cac loai sau:
# 1.Duyệt bài viết
# 2.Từ chối bài viết
# 3.Chấp nhận yêu cầu kích hoạt tài khoản doanh nghiệp
# 4.Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp
# 5.Thích bài viết
# 6.Bình luận bài viết
# 7.Thích bình luận
# 8.Phản hồi bình luận
# 9.Thích phản hồi


#De giai quyet van de 1 nguoi like comment cua 1 nguoi khac trong thong bao, va gui den thong bao den chu bai viet thi
#tao ra 1 loai thong bao chung "Hoạt động trong bài viết" va hien thi thong bao nhu la ai do tham gia vao bai viet cua ban