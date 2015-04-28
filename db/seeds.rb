['user', 'bussiness admin', 'system admin'].each do |role|
  Role.find_or_create_by({name: role})
end

user = User.create() do |u|
  u.email = "ntduy@sporta.vn"
  u.username = 'ntduy'
  u.password = '123456789'
  u.fullname = 'Nguyen Truong Duy'
  u.phone = "01633248188"
end

#Khoi tao information for user
# user = User.first
# user.create_information(job: 'Thiet ke web', phone: '06824562')

# Gan role system admin for first user
user = User.first
user.role = Role.where(name: 'bussiness admin').first
user.save

bussiness = Bussiness.create(name: "Cong ty Sporta", user_id: user.id)

bussiness.branches << Branch.new(name: 'Chi nhanh 1', url_alias: "chinhanh1", address: '120 nguyen van cu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'San van dong Sporta', url_alias: "chinhanh2", address: '18 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 3', url_alias: "chinhanh3", address: '30 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 4', url_alias: "chinhanh4", address: '429 au co, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 5', url_alias: "chinhanh5", address: '100 khuong viet, phu trung, tan phu, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 6', url_alias: "chinhanh6", address: '225 nguyen van cu, Quan 5, thanh pho Ho Chi Minh')
bussiness.branches << Branch.new(name: 'Chi nhanh 7', url_alias: "chinhanh7", address: '36 D3, Quan Binh Thanh, thanh pho Ho Chi Minh')

branch = bussiness.branches[0]

ac = AssetCategory.create(name: 'San 5 nguoi', branch_id: branch.id)
ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 150)
ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 250)
Asset.create(name: "San 1", description: "San gan nhat", branch_id: branch.id, asset_category_id: ac.id)
Asset.create(name: "San 2", description: "San gan nhi", branch_id: branch.id, asset_category_id: ac.id)
Asset.create(name: "San 3", description: "San gan ba", branch_id: branch.id, asset_category_id: ac.id)

ac = AssetCategory.create(name: 'San 10 nguoi', branch_id: branch.id)
ac.fees << Fee.new(begin_time: "7:00", end_time: "10:00", price: 250)
ac.fees << Fee.new(begin_time: "10:00", end_time: "15:00", price: 450)
Asset.create(name: "San 4", description: "San gan nhat", branch_id: branch.id, asset_category_id: ac.id)
Asset.create(name: "San 5", description: "San gan nhi", branch_id: branch.id, asset_category_id: ac.id)
Asset.create(name: "San 6", description: "San gan ba", branch_id: branch.id, asset_category_id: ac.id)
