# result = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5].chunk { |n|
#   n.even?
# }

# puts result.count


#collect giong map underscore
#each_with_object de aggreate
#find or detect phan tu dau tien thoa dieu kien (find_all la tat ca phan tu, select tuong tu)
#group by group

notifications = [{
	target_object: 'object 1',
	target_user: 'trung',
	trigger_user: 'quyen',
	category: 'like',
	},
	{
	target_object: 'object 1',
	target_user: 'trung',
	trigger_user: 'truc',
	category: 'like',
	},
	{
	target_object: 'object 1',
	target_user: 'trung',
	trigger_user: 'truc',
	category: 'comment',
	},
	{
	target_object: 'object 2',
	target_user: 'trung',
	trigger_user: 'quyen',
	category: 'like',
	},
	{
	target_object: 'object 2',
	target_user: 'trung',
	trigger_user: 'truc',
	category: 'comment',
	}]
# puts notifications
# [{
# 	target_object: {},
# 	target_user: {},
# 	category: {},
# 	trigger_users: []
# },....]

# B1: group notification theo target_object va category
notifications_group_by_target_object = notifications.group_by{ |n| [n[:target_object], n[:category]]} 
# {
# 	'object 1, category': [
# 		{},{}
# 	],
# 	'object 2, category': []
# }
puts '-------B1--------'
puts notifications_group_by_target_object
#B2: chuyen ket qua group la hash thanh dang mang [[], []]
array_notifications = notifications_group_by_target_object.collect{|key, value| value}
# [[{}, {}], [{}, {}], [{}, {}, ...]]
puts '-------B2--------'
puts array_notifications.inspect
#so luong thong bao
puts "so luong thong bao #{array_notifications.count}"
#B3: Tra ve 1 mang doi tuong, moi duong cho thay 1 mang nguoi trigger cung loai doi tuong va cung loai tac dong
results = array_notifications.collect do |array|
	#Lay thong tin co ban nhu target_object, target_user, category
	memo = array[0].clone
	#Chuyen triiger_user thanh 1 array
	memo.delete :trigger_user
	memo[:trigger_users] = []
	# memo.delete :trigger_user
	#Duyet qua cac object va gan trigger_user vao mang trigger_user
	array.each_with_object(memo) do |item|
		memo[:trigger_users] << item[:trigger_user]
	end
	#tra ve ket qua
	memo
end
# [{
# 	target_object: {},
# 	target_user: {},
# 	category: {},
# 	trigger_user: []
# },....]
puts '-------B3--------'
puts results;
#convert map to array remove key

# results[0][:trigger_user].each do |item|
# 	puts item
# end

#HASH method
# .keys 