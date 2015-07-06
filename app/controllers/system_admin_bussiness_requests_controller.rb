class SystemAdminBussinessRequestsController < SystemAdminController
	include RemoveAccent
	before_action :find_bussiness_request, only: [:accept, :deny]
	#Tra ve cac yeu cau moi chua dc xem va kiem duyet
	#GET /system_admin_bussiness_requests.json
	def index
		@bussiness_requests = BussinessRequest.chua_duyet.asc(:created_at).paginate(page: params[:page], per_page: params[:per_page])
		@total = BussinessRequest.chua_duyet.count
	end

	#Chap nhan 1 yeu cau
	#PUT /system_admin_bussiness_requests/:id/accept.json
	def accept
		# byebug
		#Khi chap nhan 1 yeu cau thi:
		#B1: Gan role bussiness cho nguoi do
		#B2: Tao Bussiness cho nguoi do
		#B3: Tao ra chi nhanh dau tien cho nguoi do
		user = @bussiness_request.user
		if user.is_bussiness_admin?
			#Neu da la bussiness_admin thi ko the nang cap, do do bo qua request do
			#bang cach gan no bang da duyet
			@bussiness_request.status_id =  BussinessRequestStatus.da_duyet_status.id
			@bussiness_request.timeless.save
			render json: {message: 'Đã là tài khoản doanh nghiệp'}, status: :ok, content_type: 'application/json'
		else

			#B2: Tao Bussiness cho nguoi do
			bussiness = Bussiness.new
			bussiness.name = @bussiness_request.name
			bussiness.category = @bussiness_request.category
			bussiness.user_id = user.id

			if bussiness.save
				user.roles ||=[]
				user.roles << Role.bussiness_admin_role
				#B3: Tao ra chi nhanh dau tien cho nguoi do
				branch = Branch.new
				branch.name = @bussiness_request.name
				branch.address = @bussiness_request.address
				# branch.latitude = @bussiness_request.latitude
				# branch.longitude = @bussiness_request.longitude
				branch.coordinates = [@bussiness_request.longitude, @bussiness_request.latitude]
				branch.bussiness_id = bussiness.id
				#tao url_alias tam
				branch.url_alias = remove_accent(@bussiness_request.name).gsub(/ /,"")
				branch.begin_work_time = "7:00"
				branch.end_work_time = "24:00"

				if branch.save(validate: false)

					@bussiness_request.status_id =  BussinessRequestStatus.da_duyet_status.id
					@bussiness_request.timeless.save
					#Tao ra thong bao
					#Neu da lo deny va nguoi do chua xem thong bao deny thi xoa no
					NotificationChange.delete_notification_change user, @bussiness_request, current_user, @bussiness_request, NotificationCategory.tu_choi_cap_tai_khoan_doanh_nghiep
					NotificationChange.create_notification user, @bussiness_request, current_user, @bussiness_request, NotificationCategory.chap_nhan_yeu_cau_doanh_nghiep
					#Kich hoat thanh cong
					render json: {message: 'Kích hoạt thành công tài khoản doanh nghiệp'}, status: :created, content_type: 'application/json'
				else
					render json: {
						message: 'Lỗi xảy ra khi tạo branch',
						errors: branch.errors
						}, status: :bad_request
					end
				else
					render json: {
						message: 'Lỗi xảy ra khi tạo bussiness',
						errors: bussiness.errors
						}, status: :bad_request
					end

				end
			end

	#Tu choi yeu cau
	#PUT /system_admin_bussiness_requests/:id/deny.json
	def deny
		#Gan yeu cau thanh trang thai tu choi va ko lam gi ca
		@bussiness_request.status_id = BussinessRequestStatus.tu_choi_status.id
		@bussiness_request.timeless.save
		#Tao thong bao
		#Neu lo xac nhan, ma nguoi do chua xem, thi xoa xac nhan do di
		NotificationChange.delete_notification_change  @bussiness_request.user, @bussiness_request, current_user, @bussiness_request, NotificationCategory.chap_nhan_yeu_cau_doanh_nghiep
		NotificationChange.create_notification @bussiness_request.user, @bussiness_request, current_user, @bussiness_request, NotificationCategory.tu_choi_cap_tai_khoan_doanh_nghiep
		render json: @bussiness_request, status: :ok, content_type: 'application/json'
	end

	private
	def find_bussiness_request
		begin
			@bussiness_request = BussinessRequest.find(params[:id])
				#Neu da duyet roi thi ko duyet nua
				if !@bussiness_request.chua_duyet?
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
	end

#Cho phep nguoi dung gui nhieu yeu cau, nhung chi can nguoi do da la bussiness admin thi
#tat ca yeu cau kia bi bo qua
#Chu y:  Chi duyet wa tu choi va chap nhan, nen ko cho duyet lan 2. Neu 1 bussiness da bi
#tu choi thi muon chap nhan thi gui yeu cau khac
#Neu 1 bussiness lo tay duyet la chap nhan thi phai chan bussiness do, ko xoa no
#boi vi lo tay tu choi yeu cau cu cua 1 bussiness dang hoang, neu xoa bussiness xe mat het
#du lieu cua bussiness do
#Do do de quan ly bussiness lam 1 controller khac cho phep chan bussiness do dung 1 thuoc tinh
