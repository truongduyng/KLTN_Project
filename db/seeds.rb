['user', 'bussiness admin', 'system admin'].each do |role|
  Role.find_or_create_by({name: role})
end

user = User.create() do |u|
  u.email = "ntduy@sporta.vn"
  u.username = 'ntduy'
  u.password = '123456789'
  u.firstname = 'Nguyen Truong'
  u.lastname = 'Duy'
end

#Khoi tao information for user
# user = User.first
# user.create_information(job: 'Thiet ke web', phone: '06824562')

# Gan role system admin for first user
user = User.first
user.role = Role.where(name: 'bussiness admin').first
user.save

Bussiness.create(name: "Cong ty Sporta", user_id: user.id)

bussiness = Bussiness.first
AssestCategory.create(name: 'San 5 nguoi', bussiness_id: bussiness.id) do |ac|
  ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 150)
  ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 250)
end

AssestCategory.create(name: 'San 10 nguoi', bussiness_id: bussiness.id) do |ac|
  ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 250)
  ac.fees << Fee.new(begin_time: Time.now, end_time: Time.now, price: 450)
end

bussiness.branches << Branch.new(name: 'Chi nhanh 1', address: '120 nguyen van cu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'San van dong Sporta', address: '18 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 3', address: '30 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 4', address: '429 au co, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 5', address: '100 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 6', address: '225 nguyen van cu, Quan 5, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 7', address: '36 D3, Quan Binh Thanh, thanh pho Ho Chi Minh')

branch = bussiness.branches.where(name: "San van dong Sporta")
branch << Asset.new
