class BranchesController < ApplicationController
	before_action :authenticate_user!, only: [:index]
	before_action :check_role_bussiness_admin, only: [:index]

	#/branches.json
	def index
		@branches = current_user.bussiness.branches
		render json: @branches
	end

	def search
		@branches = Branch.search(params[:search])
		result = []
		(@branches).each do |branch|
			result << {
				lat: branch.coordinates[1],
				lng: branch.coordinates[0],
				picture:  "http://i.imgur.com/BBk3iBl.png",
				name: branch.name,
				address: branch.address,
				url: "link to branch"
			}
		end
		render json: result
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