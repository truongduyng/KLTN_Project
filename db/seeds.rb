# ['user', 'bussiness admin', 'system admin'].each do |role|
#   Role.find_or_create_by({name: role})
# end

# user = User.create() do |u|
#   u.email = "admin@sporta.vn"
#   u.username = 'admin'
#   u.password = '123456789'
#   u.fullname = 'Admin'
#   u.phone = "01633248188"
#   u.roles = [Role.find_by(name: "system admin")]
# end

# #TAO RA CAC LOAI NOTIFICATION VA TEMPLATE CHO CHUNG
# #Duyet bai viet thanh cong
# NotificationCategory.create(name: 'Duyệt bài viết')

# #Tu choi duyet bai viet
# n = NotificationCategory.create(name: 'Từ chối bài viết')
# n.build_notification_template(content: 'Bài viết của bạn không được viết vì nội dung nó không phù hợp với trang web thể thao.')
# n.save

# #Chap nhan yeu cau kich hoat tai khoan doanh nghiep
# n =  NotificationCategory.create(name: 'Chấp nhận yêu cầu kích hoạt tài khoản doanh nghiệp')
# n.build_notification_template(content: 'Yêu cầu kích hoạt tài khoản doanh nghiệp của bạn đã được chấp nhận. Bạn có làm theo hướng dẫn sau để quản lý doanh nghiệp của bạn')
# n.save

# #Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp
# n =  NotificationCategory.create(name: 'Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp')
# n.build_notification_template(content: 'Yêu cầu kích hoạt tài khoản doanh nghiệp của bạn đã bị từ chối có thề vì 1 trong các nguyên nhân sau: .....')
# n.save

# ##Thích bài viết
# NotificationCategory.create(name: 'Thích bài viết')
# ## Bình luận bài viết
# NotificationCategory.create(name: 'Bình luận bài viết')
# ## Thích bình luận
# NotificationCategory.create(name: 'Thích bình luận')
# ##Phản hồi bình luận
# NotificationCategory.create(name: 'Phản hồi bình luận')

# ##Thích phản hồi
# NotificationCategory.create(name: 'Thích phản hồi')

# ##Bình luận trên bài viết bạn đang theo dõi
# NotificationCategory.create(name: 'Bình luận trên bài viết bạn đang theo dõi')

# ##Thích bài viết bạn đang theo dõi
# NotificationCategory.create(name: 'Thích bài viết bạn đang theo dõi')

# # ##Bình luận của chủ bài viết
# NotificationCategory.create(name: 'Bình luận của chủ bài viết')


# # clear notification
# Notification.destroy_all
# NotificationChange.destroy_all
# NotificationChangeTrigger.destroy_all



# ###MOT SO KHOI TAO CSDL CAN PHAI CHAY (CO THE TRUNG VS CAC DONG LENH BEN TREN)
# PostStatus.create(name: 'Chưa duyệt')
# PostStatus.create(name: 'Đã duyệt')
# PostStatus.create(name: 'Từ chối')

# BussinessRequestStatus.create(name: 'Chưa duyệt')
# BussinessRequestStatus.create(name: 'Đã duyệt')
# BussinessRequestStatus.create(name: 'Từ chối')


# #Duyet bai viet thanh cong
# NotificationCategory.create(name: 'Duyệt bài viết')

# Tag.create(name: 'Bóng đá')
# Tag.create(name: 'Bóng chuyền')
# Tag.create(name: 'Bóng rổ')
# Tag.create(name: 'Cầu lông')
#Neu load het bai thuoc tag nguoi dung quan tam thi moi load nhung bai thuoc tag khac
# Tag.create(name: 'Khác')
