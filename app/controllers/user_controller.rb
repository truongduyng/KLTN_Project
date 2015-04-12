class UserController < ActionController::Base
	def check_username
		if User.where(username: params[:field]).first
			render json: {isUnique: false}
		else
			render json: {isUnique: true}
		end
	end

	def check_email
		if User.where(email: params[:field]).first
			render json: {isUnique: false}
		else
			render json: {isUnique: true}
		end
	end
end