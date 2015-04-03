#Lop cha cho tat ca cac controller cua system admin, thuc hien 1 so nhiem vu chung
class SystemAdminController < ActionController::Base
	before_action :authenticate_user!
	before_action :check_system_admin_role

	private
		def check_system_admin_role
			if !current_user.is_system_admin?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end	
end