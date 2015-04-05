class BranchesController < ApplicationController
	before_action :authenticate_user!
	before_action :check_role_bussiness_admin

	#/branches.json
	def index
		@branches = current_user.bussiness.branches
		render json: @branches
	end

	private 
	#Da test
		def check_role_bussiness_admin
			if !current_user.is_bussiness_admin?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end