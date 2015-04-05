class SystemAdminBussinessesController < SystemAdminController
	#Cam 1 bussiness boi vi hoat dong theo quy dinh cua website, hoac trong truong hop le chap nhan yeu cau
	#bussiness tam bay
	#PUT system_admin_bussinesses/:id/ban.json
	def ban
		@bussiness.is_banned = true
		@bussiness.save
		render json: @bussiness, status: :ok
	end

	#unban 1 bussiness da bi cam
	#PUT system_admin_bussinesses/:id/unban.json
	def unban
		@bussiness.is_banned = false
		@bussiness.save
		render json: @bussiness, status: :ok
	end

	private
		def find_bussiness
			begin
				@bussiness = Busssiness.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end
#Chu y: Khi 1 bussiness bi cam, thi nguoi do co quyen lam tat ca hoat dong binh thuong, ho co the quan ly
# bussiness cua ho, co the them san, them gia, nhung thong tin cua ho ko dc den vs nguoi dung
