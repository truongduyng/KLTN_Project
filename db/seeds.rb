# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# ['user', 'bussiness admin', 'system admin'].each do |role|
# 	Role.find_or_create_by({name: role})
# end
# user = User.create() do |u|
# 	u.email = "trungnguyenhuu262@gmail.com"
# 	u.username = 'nguyenhuutrung'
# 	u.password = 'trungnguyenhuu'
# 	u.firstname = 'huu'
# 	u.lastname = 'trung'
	
# end

#Khoi tao information for user
# user = User.first
# user.create_information(job: 'Thiet ke web', phone: '06824562')

#Gan role system admin for first user
# user = User.first
# user.role = Role.where(name: 'bussiness admin').first
# user.save

# #Them du lieu cho assests_category
# bussiness = Bussiness.first
# AssestCategory.create(name: 'San 5 nguoi', bussiness_id: bussiness.id) do |ac|
# 	ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 150)
# 	ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 250)
# end

# AssestCategory.create(name: 'San 10 nguoi', bussiness_id: bussiness.id) do |ac|
# 	ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 250)
# 	ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 450)
# end

# #add branch to first bussiness
# bussiness = Bussiness.first
# bussiness.branches << Branch.new(name: 'Chi nhanh 1', address: '120 nguyen van cu')
# bussiness.branches << Branch.new(name: 'Chi nhanh 2', address: '120 nguyen thi thap')

## add assest to bussiness's branch
# bussiness = Bussiness.first
# assest_category = bussiness.assest_categories.first
# first_branch = bussiness.branches.first
# first_branch.assests << Assest.new(name: 'San bong da nho', quantity: 10, assest_category_id: assest_category.id )
# puts first_branch.assests.first.inspect


# #Khoi tao post status
# PostStatus.create(name: 'Chưa duyệt')
# PostStatus.create(name: 'Đã duyệt')
# PostStatus.create(name: 'Từ chối')


# #Chuyen cac post trong csdl thanh tinh trang da duyet
# @published_status = PostStatus.where(name: 'Đã duyệt').first
# Post.all.to_a.each do |post|
# 	post.post_status = @published_status
# 	post.save
# end

# #Chuyen post vs id 5510dcd56875751cdb030000 thanh chua duyet de test
# post = Post.find('5510dcd56875751cdb030000')
# status = PostStatus.where(name: 'Chưa duyệt').first
# post.post_status = status
# post.save


# #Tao role system admin va bussiness admin cho trungnguyenhuu
# trungnguyenhuu = User.where(username: 'trungnguyenhuu').first
# system_admin = Role.where(name: 'system admin').first
# trungnguyenhuu.roles << system_admin
# bussiness_admin = Role.where(name: 'bussiness admin').first
# trungnguyenhuu.roles << bussiness_admin


# # Tao ra nhung post moi chua duyet
# trungnguyenhuu = User.where(username: 'trungnguyenhuu').first
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 10', body: 'Body 5')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 11', body: 'Body 6')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 12', body: 'Body 7')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 13', body: 'Body 8')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 14', body: 'Body 5')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 15', body: 'Body 6')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 16', body: 'Body 7')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 17', body: 'Body 8')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 18', body: 'Body 5')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 19', body: 'Body 6')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 20', body: 'Body 7')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 21', body: 'Body 8')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 22', body: 'Body 5')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 23', body: 'Body 6')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 24', body: 'Body 7')
# trungnguyenhuu.posts << Post.new(title: 'post chua duyet 25', body: 'Body 8')



#Tao ra cac status cho bussiness_request
# Gom 3 tinh trang:
# 	Chưa duyệt
# 	Đã duyệt
# 	Từ chối
# BussinessRequestStatus.create(name: 'Chưa duyệt')
# BussinessRequestStatus.create(name: 'Đã duyệt')
# BussinessRequestStatus.create(name: 'Từ chối')


#Tao yeu cau kich hoat tai khoan doanh nghiep
# trung = User.where(username: 'trung').first
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 1', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 2', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 3', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 4', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 5', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 6', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 7', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 8', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 9', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 10', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 11', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 12', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 13', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 14', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 15', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)
# trung.bussiness_requests << BussinessRequest.new(name: 'Name 16', address: 'address 1', description: 'description 1', category: 'category 1', latitude: 10.737145268109922, longitude: 106.71767234802246)



#TAO RA CAC LOAI NOTIFICATION VA TEMPLATE CHO CHUNG
##Duyet bai viet thanh cong
# NotificationCategory.create(name: 'Duyệt bài viết')

##Tu choi duyet bai viet
# n = NotificationCategory.create(name: 'Từ chối bài viết')
# n.build_notification_template(content: 'Bài viết của bạn không được viết vì nội dung nó không phù hợp với trang web thể thao.')
# n.save

##Chap nhan yeu cau kich hoat tai khoan doanh nghiep
# n =  NotificationCategory.create(name: 'Chấp nhận yêu cầu kích hoạt tài khoản doanh nghiệp')
# n.build_notification_template(content: 'Yêu cầu kích hoạt tài khoản doanh nghiệp của bạn đã được chấp nhận. Bạn có làm theo hướng dẫn sau để quản lý doanh nghiệp của bạn')
# n.save

##Từ chối yêu cầu kích hoạt tài khoản doanh nghiệp
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



## clear notification 
# Notification.destroy_all
# NotificationChange.destroy_all
# NotificationChangeTrigger.destroy_all

