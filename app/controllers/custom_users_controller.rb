class CustomUsersController < ApplicationController
	before_action :authenticate_user!, only: [:update]
	before_action :find_user_and_check_with_current_user, only: [:update]
	
	#get /custom_users/:username.json
	def get_user_by_username
		if params.has_key?(:username)
			@user = User.where(username: params[:username]).first
			if @user
				render json: @user, status: :ok
			else
				render nothing: true, status: :not_found, content_type: 'application/json'
			end		
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	#PUT /custom_users/:id.json
	def update
		if @user.update_attributes(user_params)
			render json: @user, status: :ok
		else
			render json: @user.errors, status: :bad_request
		end
	end


	private
		def user_params
			params.require(:custom_user).permit(:firstname, :lastname, :gender, :address, :phone, :description)
		end

		def find_user_and_check_with_current_user
			begin
				@user = User.find(params[:id])
				if @user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

end