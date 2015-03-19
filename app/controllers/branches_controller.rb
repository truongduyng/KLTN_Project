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
			if current_user.role.name == 'bussiness admin'
			else
				render json: {}, status: :not_found	
			end
		end
end