class ImagesController < ApplicationController
	before_action :authenticate_user!
	
	#GET /images.json
	# def index
	# 	# render json: current_user.images, status: :ok
	# 	galleries = []
	# 	image1 = {image: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', thumb: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', folder: 'folder 1'}
	# 	image2 = {image: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', thumb: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', folder: 'folder 2'}
	# 	galleries << image1
	# 	galleries << image2
	# 	render json: galleries, status: :ok
	# end

	def index
		@all_images = current_user.images.all
	end

	#POST /images.json
	def create
		# if params.has_key?(:upload)
		# 	render json: {
		# 		message: 'file in params[:upload]'
		# 	}, status: :ok
		# else
		# 	render json: {
		# 		message: 'file not in params[:upload]'
		# 	},status: :ok
		# end
		if params.has_key?(:upload)
			image = Image.new(image: params[:upload])
			current_user.images << image
			render json: {
				message: 'upload thanh cong',
			}, status: :ok
		else
			render json: {
				message: 'upload that bai',
			}, status: :bad_request
		end
	end

end