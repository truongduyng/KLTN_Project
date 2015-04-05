class BussinessesController < ApplicationController
	before_action :authenticate_user!
	
	#before for check role is bussissness admin
	before_action :check_role_bussiness_admin, only: [:show, :new, :update]
	
	def show
		render json: current_user.bussiness
	end

	#khi nang cap thanh role system admin thi tao ra 1 bussiness
	#Chua test
	def new 
		bussiness = Bussiness.new(bussiness_params)
		bussiness.user_id = current_user.id
		if bussiness.save
			render json: bussiness, status: :created
		else
			render json: bussiness.errors, status: :unprocessable_entity
		end
	end

	def update
		#create if current_user.bussiness = null
		if current_user.bussiness.update_attributes(bussiness_params)
			render json: current_user.bussiness, status: :ok
		else
			render json: current_user.bussiness.errors, status: :unprocessable_entity
		end
	end

	private 
		def bussiness_params
			params.require(:bussiness)
			.permit(:name, :address, :phone, :category, :short_desc, :description)
		end

		#Da test
		def check_role_bussiness_admin
			if !current_user.is_bussiness_admin?
				render nothing: true, status: :not_found, content_type: 'application/json'
			else
				
			end
		end
end