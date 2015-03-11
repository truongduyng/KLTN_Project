class InformationsController < ApplicationController
	before_action :authenticate_user!
	
	def show
		render json: current_user.information
	end

	def edit
		begin
			current_user.information = nil
			current_user.create_information(information_params)
			render json: current_user.information
		rescue Exception => e
			render json: {}, status: :bad_request
		end
	end

	private
		def information_params
			params.require(:information)
			.permit(:birthday, :job, :phone, :address,
			 :mobile_phone, :short_desc, :description, :bussiness_name)
		end
end