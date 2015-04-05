class AdminController < ActionController::Base
	protect_from_forgery with: :exception
	respond_to :json
	
	def bussiness_admin
		render 'layouts/bussiness_admin'
	end

	def system_admin
		render 'layouts/system_admin'
	end
end
