class MyAvatarsController < ApplicationController
	#POST /my_avatars.json
	def create
		if params[:file].try(:original_filename) == 'blob'
			params[:file].original_filename << '.png'
		end
		@avatar = MyAvatar.new(image: params[:file])
		if @avatar.save
			render json: @avatar, status: :created
		else
			render json: {error: 'Error in upload'}, status: :bad_request
		end
	end
end