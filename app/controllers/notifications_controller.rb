class NotificationsController < ApplicationController
	before_action :authenticate_user!
	before_action :find_notification, only: [:watched, :show]
	#GET /notifications.json
	#Tra ve 10 notification moi nhat
	# def index
	# 	# notification_ids = Notification.where(target_user_id: current_user.id).only(:_id).map(&:_id)
	# 	# @notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
	# 	# @notification_changes = @notification_changes.desc(:created_at).limit(10)

	# 	notification_ids = Notification.where(target_user_id: current_user.id).only(:_id).map(&:_id)
	# 	all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
	# 	new_notification_changes = all_notification_changes.where(is_new: true)
	# 	if new_notification_changes.count < 20
	# 		#Neu ma so luong notification moi nho hon 10 thi tra ve notification moi va notification cu, so luong tong la 10
	# 		@notification_changes = all_notification_changes.desc(:created_at).limit(20)
	# 	else
	# 		#Neu so luong notification moi lon hon 10
	# 		#thi tra ve 10 cai notification moi nhat (theo dang chuan da group 
	# 		#theo target_object, sau do theo category) va 
	# 		#so luong notification moi khac (theo dang chuan da group)

	# 		#Tra ve so luong bao nhieu notification moi
	# 		@notification_changes = new_notification_changes.to_a.each do |nc|
	# 			#Tra ve: target_object, category (group theo category), trigger_user []
	# 			# {
	# 			# 	target_object: {},
	# 			# 	notification_category: {},
	# 			# 	trigger_user: [{}, {}, ..]
	# 			# } 

	# 			#group theo category, thi co nhieu target_object

	# 		end
	# 		#B1: lap wa array group theo category => 1 mang cung category khac target_object
	# 		#B2: lap wa mang cung category => cung category va cung targer object

	# 		# #result = [[], [], []]
	# 		# result = []
	# 		# for item1 in @notification_changes
	# 		# 	#Kiem tra xem item1 co trong result chua, neu co thi khoi xets
	# 		# 	tmp = [item1]
	# 		# 	for item2 in @notification_changes
	# 		# 		#2 item khac nhau va cung loai dua vao 1 nhom
	# 		# 		if item1.id != item2.id && item1.notification_category == item2.notification_category
	# 		# 			tmp << item2
	# 		# 			item2.isAccessed = true
	# 		# 		end
	# 		# 	end
	# 		# 	result << tmp
	# 		# end
	# 		#Tra ve cac notification theo dang chuan
	# 	end
	# 	#Khong the lay 10 cai moi nhat dc, ma phai lay tat ca cai moi nhat, is_new = true
	# 	@notification_changes = @notification_changes.desc(:created_at).limit(20)
	# end


	def index
		notification_ids = Notification.where(target_user_id: current_user.id).only(:_id).map(&:_id)
		all_notification_changes = NotificationChange.where(:notification_id.in => notification_ids)
		new_notification_changes = all_notification_changes.where(is_new: true).to_a
		#B1: Group by theo target_object va notification_category
		# {
		# 	'object 1, category': [
		# 		{},{}
		# 	],
		# 	'object 2, category': []
		# }
		new_notification_changes = new_notification_changes.group_by{ |nc| [nc.notification_id, nc.notification_category_id]} 
		#B2: chuyen ket qua sang dang mang: [[{}, {}], [{}, {}], [{}, {}, ...]]
		new_notification_changes = new_notification_changes.collect{|key, value| value}
		#B3: @results chinh la new notifications 
		# [{
		# 	target_object: {},
		# 	target_user: {},
		# 	category: {},
		# 	trigger_users: []
		# },....]
		@results = new_notification_changes.collect do |array|
			#Lay thong tin co ban nhu target_object, target_user, category
			memo = array[0].clone
			#Chuyen triiger_user thanh 1 array
			memo.trigger_users = []
			#Duyet qua cac object va gan trigger_user vao mang trigger_user
			array.each_with_object(memo) do |item|
				memo.trigger_users << item.trigger_user
			end
			#tra ve ket qua
			memo
		end
		# if new_notification_changes.count < 20
		# 	#Neu ma so luong notification moi nho hon 10 thi tra ve notification moi va notification cu, so luong tong la 10
		# 	@notification_changes = all_notification_changes.desc(:created_at).limit(20)
		# else
			
		# end
		# #Khong the lay 10 cai moi nhat dc, ma phai lay tat ca cai moi nhat, is_new = true
		# @notification_changes = @notification_changes.desc(:created_at).limit(20)
	end
	#GET /notifications/:id.json
	#Tra ve notificationChange voi id tuong ung
	def show
	end

	#PUT /notifications/:id/watched.json
	def watched
		@notification_change.watched = true
		@notification_change.save
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	#PUT /notifications/loaded.json
	#Khi ma click vao ul thi danh dau no du da load
	def loaded
		notification_ids = params.permit(:notification_ids => [])['notification_ids']
		#Lap wa danh sach id va gan gia tri is_new = false
		notification_ids.each do |id|
			NotificationChange.find(id).update_attributes(is_new: false)
		end
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	private
		def find_notification
			begin 
				@notification_change = NotificationChange.find(params[:id])
				if @notification_change.notification.target_user != current_user
					# render json: {
					# 	message: 'Bạn không có quyền xử lý notification này'	
					# },
					# status: :bad_request
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end