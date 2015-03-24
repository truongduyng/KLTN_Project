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
		@hash = Gmaps4rails.build_markers(@branches) do |branch, marker|
			marker.lat branch.coordinates[1]
			marker.lng branch.coordinates[0]
			marker.picture({
				url: "http://i.imgur.com/r0L47hQ.png",
				width:  96,
				height: 96
				})
			marker.infowindow branch.name
		end
		render json: @hash
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