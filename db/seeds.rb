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