class BranchesController < ApplicationController
	before_action :authenticate_user!
	before_action :check_role_bussiness_admin
	before_action :find_branch, only: [:update]
	#/branches.json
	def index
		@branches = current_user.bussiness.branches
		render json: @branches
	end

	#POST /branches.json
	def create
		@branch = Branch.new branch_params
		@branch.bussiness_id = current_user.bussiness.id
		if @branch.save
			render 'show.json.jbuilder', status: :created
		else
			render json: @branch.errors, status: :bad_request
		end
	end

	#PUT /branches/:id.json
	def update
		if @branch.update_attributes(branch_params)
			render 'show.json.jbuilder', status: :ok
		else
			render json: @branch.errors, status: :bad_request
		end
	end

	
	private 
		def branch_params
			params.require(:branch).permit(:name, :address, :phone, :latitude, :longitude, :description)
		end

		def find_branch
			@branch = Branch.find(params[:id])
			#KO dc chinh sua chi nhanh cua nguoi khac
			if @branch.bussiness.id != current_user.bussiness.id
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
		#Da test
		def check_role_bussiness_admin
			if !current_user.is_bussiness_admin?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

end