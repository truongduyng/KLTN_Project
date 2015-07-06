class CustomUsersController < ApplicationController
	before_action :authenticate_user!, only: [:update, :change_password, :change_avatar]
	before_action :find_user_and_check_with_current_user, only: [:update]

	#Neu la tai khoan facebook thi ko the doi password
	before_action :is_account_facebook?, only: [:change_password]

	#get /custom_users/:username.json
	def get_user_by_username
		if params.has_key?(:username)
			@user = User.find_by(username: params[:username])
			if @user
				# render json: @user, status: :ok
			else
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		else
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end

	#PUT /custom_users/:id.json
	def update
		# byebug
		if @user.update_attributes(user_params)
			#render json: @user, status: :ok
			render 'get_user_by_username.json.jbuilder'
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
	      #render json: @user, status: :ok
	      render 'get_user_by_username.json.jbuilder'
	    else
	      render json: @user.errors, status: :bad_request
	    end
	end


	#POST /custom_users/change_avatar.json
	def change_avatar
		#Them dinh dang .png cho doi tuong blob de whilelist no la image
		if params[:file].try(:original_filename) == 'blob'
			params[:file].original_filename << '.png'
		end
		#Gan avatar bang params[:file]
		current_user.avatar = params[:file]
		if current_user.save
			@user = current_user
			#render json: @current_user, status: :ok
			render 'get_user_by_username.json.jbuilder'
		else
			render json: current_user.errors, status: :bad_request
		end
	end

	private
		def user_params
			params.require(:custom_user).permit(:fullname, :gender, :address, :phone, :description)
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

		def is_account_facebook?
			begin
				if current_user.identity
					render json: {error: 'Không thể đổi password khi đăng nhập bằng tài khỏan facebook'}, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end

		end

end