class AdminController < ActionController::Base
	def bussiness_admin
		render 'layouts/bussiness_admin'
	end

	def system_admin
		render 'layouts/system_admin'
	end
end
