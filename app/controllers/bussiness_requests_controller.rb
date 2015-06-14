class BussinessRequestsController < ApplicationController
	before_action :authenticate_user!
	#Phai chua la doanh nghiep, da la doanh nghiep roi ko cho gui yeu cau nua
	before_action :check_bussiness_role, only: [:create]
	before_action :find_bussiness_request, only: [:show]
	
	#GET /bussiness_requests/:id.json
	def show
	end
	
	#POST bussiness_requests.json
	def create
		@br = BussinessRequest.new(request_params)
		@br.user = current_user
		if @br.save
			render json: @br, status: :created
		else
			render json: @br.errors, status: :bad_request
		end
	end


	private 
		def request_params
			params.require(:bussiness_request).permit(:name, :address, :category, :description, :latitude, :longitude)
		end
		#Neu da la tai khoan bussines ko cho gui yeu cau nhieu nua
		def check_bussiness_role
			if current_user.is_bussiness_admin?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		def find_bussiness_request
			begin
				@bussiness_request = BussinessRequest.find(params[:id])
				#Phai la yeu cau cua nguoi do thi nguoi do moi dc xem
				if @bussiness_request.user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end		
end