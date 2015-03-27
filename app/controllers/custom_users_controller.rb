class CustomUsersController < ApplicationController
	before_action :authenticate_user!, only: [:update, :change_password]
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

	# /custom_users/change_password.json
	def change_password
		@user = User.find(current_user.id)
		new_password_params = params.required(:custom_user).permit(:current_password,:password, :password_confirmation)
	    if @user.update_with_password(new_password_params)
	      # Sign in the user by passing validation in case their password changed
	      sign_in @user, :bypass => true
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