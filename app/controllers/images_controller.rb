class ImagesController < ApplicationController
	before_action :authenticate_user!
	
	#GET /images.json
	def index
		# render json: current_user.images, status: :ok
		galleries = []
		image1 = {image: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', thumb: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', folder: 'folder 1'}
		image2 = {image: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', thumb: 'http://globe-views.com/dcim/dreams/cactus/cactus-02.jpg', folder: 'folder 2'}
		galleries << image1
		galleries << image2
		render json: galleries, status: :ok
	end

end