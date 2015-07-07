# ['user', 'bussiness admin', 'system admin'].each do |role|
#   Role.find_or_create_by({name: role})
# end

# user = User.create() do |u|
#   u.email = "ntduy@sporta.vn"
#   u.username = 'ntduy'
#   u.password = '123456789'
#   u.fullname = 'Nguyen Truong Duy'
#   u.phone = "01633248188"
#   u.roles = [Role.find_by(name: "bussiness admin"),Role.find_by(name: "system admin")]
# end


# user = User.create() do |u|
#   u.email = "trung_nh93@yahoo.com"
#   u.username = 'trung_nh93'
#   u.password = '123456789'
#   u.fullname = 'Nguyen Huu Trung 1'
#   u.phone = "01633248188"
# end

# user = User.create() do |u|
#   u.email = "trungnguyenhuu@gmail.com"
#   u.username = 'trungnguyenhuu'
#   u.password = '123456789'
#   u.fullname = 'Nguyen Huu Trung 2'
#   u.phone = "01633248188"
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


# user = User.first
# user.create_information(job: 'Thiet ke web', phone: '06824562')

# bussiness = Bussiness.create(name: "Cong ty Sporta", user_id: user.id)

# bussiness.branches << Branch.create(name: 'Chi nhanh 1', url_alias: "chinhanh1", address: '120 nguyen van cu, thanh pho Ho Chi Minh',begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")
# bussiness.branches << Branch.create(name: 'San van dong Sporta', url_alias: "chinhanh2", address: '18 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh', begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")
# bussiness.branches << Branch.create(name: 'Chi nhanh 3', url_alias: "chinhanh3", address: '30 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh', begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")
# bussiness.branches << Branch.create(name: 'Chi nhanh 4', url_alias: "chinhanh4", address: '429 au co, phu trung, tan phu, thanh pho Ho Chi Minh', begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")
# bussiness.branches << Branch.create(name: 'Chi nhanh 5', url_alias: "chinhanh5", address: '100 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh', begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")
# bussiness.branches << Branch.create(name: 'Chi nhanh 6', url_alias: "chinhanh6", address: '225 nguyen van cu, Quan 5, thanh pho Ho Chi Minh', begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")
# bussiness.branches << Branch.create(name: 'Chi nhanh 7', url_alias: "chinhanh7", address: '36 D3, Quan Binh Thanh, thanh pho Ho Chi Minh', begin_work_time: "7:00", end_work_time: "24:00", phone: "0123456789")

# branch = bussiness.branches[0]

# ac = AssetCategory.create(name: 'San 5 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 150)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 250)
# Asset.create(name: "San 1", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 2", description: "San gan nhi", asset_category_id: ac.id)
# Asset.create(name: "San 3", description: "San gan ba", asset_category_id: ac.id)

# ac = AssetCategory.create(name: 'San 10 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 250)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 450)
# Asset.create(name: "San 4", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 5", description: "San gan nhi", asset_category_id: ac.id)
# Asset.create(name: "San 6", description: "San gan ba", asset_category_id: ac.id)

# branch = bussiness.branches[1]

# ac = AssetCategory.create(name: 'San 5 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 150)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 250)
# Asset.create(name: "San 1", description: "San gan nhat", asset_category_id: ac.id)


# ac = AssetCategory.create(name: 'San 10 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 250)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 450)
# Asset.create(name: "San 2", description: "San gan nhat", asset_category_id: ac.id)


# branch = bussiness.branches[2]

# ac = AssetCategory.create(name: 'San 5 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 150)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 250)
# Asset.create(name: "San 1", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 2", description: "San gan nhi", asset_category_id: ac.id)


# ac = AssetCategory.create(name: 'San 10 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 250)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 450)
# Asset.create(name: "San 3", description: "San gan nhat",  asset_category_id: ac.id)
# Asset.create(name: "San 4", description: "San gan nhi",  asset_category_id: ac.id)


# branch = bussiness.branches[3]

# ac = AssetCategory.create(name: 'San 5 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 150)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 250)
# Asset.create(name: "San 1", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 2", description: "San gan nhi", asset_category_id: ac.id)
# Asset.create(name: "San 3", description: "San gan ba", asset_category_id: ac.id)
# Asset.create(name: "San 4", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 5", description: "San gan nhi", asset_category_id: ac.id)
# Asset.create(name: "San 6", description: "San gan ba", asset_category_id: ac.id)

# ac = AssetCategory.create(name: 'San 10 nguoi', branch_id: branch.id)
# ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 250)
# ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 450)
# Asset.create(name: "San 7", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 8", description: "San gan nhi", asset_category_id: ac.id)
# Asset.create(name: "San 9", description: "San gan ba", asset_category_id: ac.id)
# Asset.create(name: "San 10", description: "San gan nhat", asset_category_id: ac.id)
# Asset.create(name: "San 11", description: "San gan nhi", asset_category_id: ac.id)
# Asset.create(name: "San 12", description: "San gan ba", asset_category_id: ac.id)


# # #TAO RE NHIEU POST DE TEST
# # trungnguyenhuu = User.where(username: 'trungnguyenhuu').first
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 10', body: 'Body 5', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 11', body: 'Body 6', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 12', body: 'Body 7', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 13', body: 'Body 8', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 14', body: 'Body 5', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 15', body: 'Body 6', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 16', body: 'Body 7', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 17', body: 'Body 8', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 18', body: 'Body 5', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 19', body: 'Body 6', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 20', body: 'Body 7', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 21', body: 'Body 8', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 22', body: 'Body 5', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 23', body: 'Body 6', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 24', body: 'Body 7', post_status_id: PostStatus.publishedStatus)
# # trungnguyenhuu.posts << Post.new(title: 'post chua duyet 25', body: 'Body 8', post_status_id: PostStatus.publishedStatus)


# # Post.all.each do |p|
# # 	p.update_attributes(post_status_id: PostStatus.publishedStatus.id)
# # end




##SEEED DU LIEU CHO THONG KE BUSSINESS ADMIN, voi tai khoan trung_nh93@yahoo.com.vn
#B1: Them role bussiness admin cho trung
# trung = User.where(email: 'trung_nh93@yahoo.com.vn').first
# trung.roles << Role.bussiness_admin_role
# trung.save

# #B2: Tao bussiness
# bussiness = Bussiness.create(name: 'Doanh nghiep Sporta', category: 'Bong da', user_id: trung.id)

#B3: Tao ra 5 chi nhanh de test
# trung = User.where(email: 'trung_nh93@yahoo.com.vn').first
# bussiness = trung.bussiness
# #Tao ra 5 chi nhanh
# branch1 = Branch.create(name: 'Chi nhanh 1', url_alias: 'trung_sporta_chi_nhanh_1', phone: '01279012790', address: '125 Nguyen Thi thap, quan 7, sai gon', coordinates: [10.01, 100.11], begin_work_time: '7:00', end_work_time: '21:00', bussiness_id: bussiness.id)
# branch2 = Branch.create(name: 'Chi nhanh 2', url_alias: 'trung_sporta_chi_nhanh_2', phone: '01279012790', address: '125 Nguyen Thi thap, quan 7, sai gon', coordinates: [10.01, 100.11], begin_work_time: '7:00', end_work_time: '21:00', bussiness_id: bussiness.id)
# branch3 = Branch.create(name: 'Chi nhanh 3', url_alias: 'trung_sporta_chi_nhanh_3', phone: '01279012790', address: '125 Nguyen Thi thap, quan 7, sai gon', coordinates: [10.01, 100.11], begin_work_time: '7:00', end_work_time: '21:00', bussiness_id: bussiness.id)
# branch4 = Branch.create(name: 'Chi nhanh 4', url_alias: 'trung_sporta_chi_nhanh_4', phone: '01279012790', address: '125 Nguyen Thi thap, quan 7, sai gon', coordinates: [10.01, 100.11], begin_work_time: '7:00', end_work_time: '21:00', bussiness_id: bussiness.id)
# branch5 = Branch.create(name: 'Chi nhanh 5', url_alias: 'trung_sporta_chi_nhanh_5', phone: '01279012790', address: '125 Nguyen Thi thap, quan 7, sai gon', coordinates: [10.01, 100.11], begin_work_time: '7:00', end_work_time: '21:00', bussiness_id: bussiness.id)


# #B4: Tao ra asset category cho moi chi nhanh
# trung = User.where(email: 'trung_nh93@yahoo.com.vn').first
# bussiness = trung.bussiness

# branch1 = bussiness.branches[0]
# asset_category1 = AssetCategory.create(name: 'Loai 1', branch_id: branch1.id)
# asset_category2 = AssetCategory.create(name: 'Loai 2', branch_id: branch1.id)
# asset_category3 = AssetCategory.create(name: 'Loai 3', branch_id: branch1.id)

# branch2 = bussiness.branches[1]
# asset_category1 = AssetCategory.create(name: 'Loai 1', branch_id: branch2.id)
# asset_category2 = AssetCategory.create(name: 'Loai 2', branch_id: branch2.id)
# asset_category3 = AssetCategory.create(name: 'Loai 3', branch_id: branch2.id)

# branch3 = bussiness.branches[2]
# asset_category1 = AssetCategory.create(name: 'Loai 1', branch_id: branch3.id)
# asset_category2 = AssetCategory.create(name: 'Loai 2', branch_id: branch3.id)
# asset_category3 = AssetCategory.create(name: 'Loai 3', branch_id: branch3.id)

# branch4 = bussiness.branches[3]
# asset_category1 = AssetCategory.create(name: 'Loai 1', branch_id: branch4.id)
# asset_category2 = AssetCategory.create(name: 'Loai 2', branch_id: branch4.id)
# asset_category3 = AssetCategory.create(name: 'Loai 3', branch_id: branch4.id)

# branch5 = bussiness.branches[4]
# asset_category1 = AssetCategory.create(name: 'Loai 1', branch_id: branch5.id)
# asset_category2 = AssetCategory.create(name: 'Loai 2', branch_id: branch5.id)
# asset_category3 = AssetCategory.create(name: 'Loai 3', branch_id: branch5.id)

#B5: Tao ra fees cho cac asset_category cua moi chi nhanh
# trung = User.where(email: 'trung_nh93@yahoo.com.vn').first
# bussiness = trung.bussiness
# branch_ids = bussiness.branches.only(:_id).map(&:_id)
# AssetCategory.where(:branch_id.in => branch_ids).each do |ac|
#   ac.fees.destroy_all
# end
# #Chi nhanh 1
#  branch1 = bussiness.branches[0]
# asset_category1 = branch1.asset_categories[0]
# asset_category1.fees.create(begin_time: '7:00', end_time: '10:00', price: '250')
# asset_category1.fees.create(begin_time: '10:00', end_time: '15:00', price: '150')
# asset_category1.fees.create(begin_time: '15:00', end_time: '17:00', price: '250')
# asset_category1.fees.create(begin_time: '17:00', end_time: '21:00', price: '300')

# #Loai 2 mac hon 50k
# asset_category2 = branch1.asset_categories[1]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '300')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '200')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '300')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '350')

# #Loai 3 mac hon loai 2 50k, hon loai 1 100k
# asset_category3 = branch1.asset_categories[2]
# asset_category3.fees.create(begin_time: '7:00', end_time: '10:00', price: '350')
# asset_category3.fees.create(begin_time: '10:00', end_time: '15:00', price: '250')
# asset_category3.fees.create(begin_time: '15:00', end_time: '17:00', price: '350')
# asset_category3.fees.create(begin_time: '17:00', end_time: '21:00', price: '400')


# #Chi nhanh 2
# branch2 = bussiness.branches[1]
# asset_category1 = branch2.asset_categories[0]
# asset_category1.fees.create(begin_time: '7:00', end_time: '10:00', price: '250')
# asset_category1.fees.create(begin_time: '10:00', end_time: '15:00', price: '150')
# asset_category1.fees.create(begin_time: '15:00', end_time: '17:00', price: '250')
# asset_category1.fees.create(begin_time: '17:00', end_time: '21:00', price: '300')

# #Loai 2 mac hon 50k
# asset_category2 = branch2.asset_categories[1]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '300')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '200')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '300')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '350')

# #Loai 3 mac hon loai 2 50k, hon loai 1 100k
# asset_category2 = branch2.asset_categories[2]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '350')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '250')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '350')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '400')


# #Chi nhanh 3
# branch3 = bussiness.branches[2]
# asset_category1 = branch3.asset_categories[0]
# asset_category1.fees.create(begin_time: '7:00', end_time: '10:00', price: '250')
# asset_category1.fees.create(begin_time: '10:00', end_time: '15:00', price: '150')
# asset_category1.fees.create(begin_time: '15:00', end_time: '17:00', price: '250')
# asset_category1.fees.create(begin_time: '17:00', end_time: '21:00', price: '300')

# #Loai 2 mac hon 50k
# asset_category2 = branch3.asset_categories[1]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '300')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '200')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '300')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '350')

# #Loai 3 mac hon loai 2 50k, hon loai 1 100k
# asset_category2 = branch3.asset_categories[2]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '350')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '250')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '350')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '400')





# #Chi nhanh 4
# branch4 = bussiness.branches[3]
# asset_category1 = branch4.asset_categories[0]
# asset_category1.fees.create(begin_time: '7:00', end_time: '10:00', price: '250')
# asset_category1.fees.create(begin_time: '10:00', end_time: '15:00', price: '150')
# asset_category1.fees.create(begin_time: '15:00', end_time: '17:00', price: '250')
# asset_category1.fees.create(begin_time: '17:00', end_time: '21:00', price: '300')

# #Loai 2 mac hon 50k
# asset_category2 = branch4.asset_categories[1]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '300')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '200')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '300')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '350')

# #Loai 3 mac hon loai 2 50k, hon loai 1 100k
# asset_category2 = branch4.asset_categories[2]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '350')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '250')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '350')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '400')





# #Chi nhanh 5
# branch5 = bussiness.branches[4]
# asset_category1 = branch5.asset_categories[0]
# asset_category1.fees.create(begin_time: '7:00', end_time: '10:00', price: '250')
# asset_category1.fees.create(begin_time: '10:00', end_time: '15:00', price: '150')
# asset_category1.fees.create(begin_time: '15:00', end_time: '17:00', price: '250')
# asset_category1.fees.create(begin_time: '17:00', end_time: '21:00', price: '300')

# #Loai 2 mac hon 50k
# asset_category2 = branch5.asset_categories[1]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '300')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '200')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '300')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '350')

# #Loai 3 mac hon loai 2 50k, hon loai 1 100k
# asset_category2 = branch5.asset_categories[2]
# asset_category2.fees.create(begin_time: '7:00', end_time: '10:00', price: '350')
# asset_category2.fees.create(begin_time: '10:00', end_time: '15:00', price: '250')
# asset_category2.fees.create(begin_time: '15:00', end_time: '17:00', price: '350')
# asset_category2.fees.create(begin_time: '17:00', end_time: '21:00', price: '400')



# #B5: Tao ra asset cho moi chi nhanh
# trung = User.where(email: 'trung_nh93@yahoo.com.vn').first
# bussiness = trung.bussiness

# branch1 = bussiness.branches[0]
# asset1 = Asset.create(name: 'San 1', branch_id: branch1.id, asset_category_id: branch1.asset_categories[0].id)
# asset2 = Asset.create(name: 'San 2', branch_id: branch1.id, asset_category_id: branch1.asset_categories[0].id)
# asset3 = Asset.create(name: 'San 3', branch_id: branch1.id, asset_category_id: branch1.asset_categories[0].id)
# asset4 = Asset.create(name: 'San 4', branch_id: branch1.id, asset_category_id: branch1.asset_categories[0].id)
# asset5 = Asset.create(name: 'San 5', branch_id: branch1.id, asset_category_id: branch1.asset_categories[0].id)

# branch2 = bussiness.branches[1]
# asset1 = Asset.create(name: 'San 1', branch_id: branch1.id, asset_category_id: branch2.asset_categories[0].id)
# asset2 = Asset.create(name: 'San 2', branch_id: branch1.id, asset_category_id: branch2.asset_categories[0].id)
# asset3 = Asset.create(name: 'San 3', branch_id: branch1.id, asset_category_id: branch2.asset_categories[0].id)
# asset4 = Asset.create(name: 'San 4', branch_id: branch1.id, asset_category_id: branch2.asset_categories[0].id)
# asset5 = Asset.create(name: 'San 5', branch_id: branch1.id, asset_category_id: branch2.asset_categories[0].id)

# branch3 = bussiness.branches[2]
# asset1 = Asset.create(name: 'San 1', branch_id: branch1.id, asset_category_id: branch3.asset_categories[0].id)
# asset2 = Asset.create(name: 'San 2', branch_id: branch1.id, asset_category_id: branch3.asset_categories[0].id)
# asset3 = Asset.create(name: 'San 3', branch_id: branch1.id, asset_category_id: branch3.asset_categories[0].id)
# asset4 = Asset.create(name: 'San 4', branch_id: branch1.id, asset_category_id: branch3.asset_categories[0].id)
# asset5 = Asset.create(name: 'San 5', branch_id: branch1.id, asset_category_id: branch3.asset_categories[0].id)

# branch4 = bussiness.branches[3]
# asset1 = Asset.create(name: 'San 1', branch_id: branch1.id, asset_category_id: branch4.asset_categories[0].id)
# asset2 = Asset.create(name: 'San 2', branch_id: branch1.id, asset_category_id: branch4.asset_categories[0].id)
# asset3 = Asset.create(name: 'San 3', branch_id: branch1.id, asset_category_id: branch4.asset_categories[0].id)
# asset4 = Asset.create(name: 'San 4', branch_id: branch1.id, asset_category_id: branch4.asset_categories[0].id)
# asset5 = Asset.create(name: 'San 5', branch_id: branch1.id, asset_category_id: branch4.asset_categories[0].id)

# branch5 = bussiness.branches[4]
# asset1 = Asset.create(name: 'San 1', branch_id: branch1.id, asset_category_id: branch5.asset_categories[0].id)
# asset2 = Asset.create(name: 'San 2', branch_id: branch1.id, asset_category_id: branch5.asset_categories[0].id)
# asset3 = Asset.create(name: 'San 3', branch_id: branch1.id, asset_category_id: branch5.asset_categories[0].id)
# asset4 = Asset.create(name: 'San 4', branch_id: branch1.id, asset_category_id: branch5.asset_categories[0].id)
# asset5 = Asset.create(name: 'San 5', branch_id: branch1.id, asset_category_id: branch5.asset_categories[0].id)



# trung = User.where(email: 'trung_nh93@yahoo.com.vn').first
# bussiness = trung.bussiness
# branch1 = bussiness.branches[0]
# # asset_category1.fees.create(begin_time: '7:00', end_time: '10:00', price: '250')
# # asset_category1.fees.create(begin_time: '10:00', end_time: '15:00', price: '150')
# # asset_category1.fees.create(begin_time: '15:00', end_time: '17:00', price: '250')
# # asset_category1.fees.create(begin_time: '17:00', end_time: '21:00', price: '300')


Ticket.all.each do |ticket|
	ticket.status = 'done'
	ticket.save(validate: false)
end
