class PhotosController < ApplicationController
	before_action :find_photo, only: [:destroy]
	def create
		sleep(3)
		@photo = Photo.new()
		@photo.image = params[:file]
		if @photo.save
			render 'create.json.jbuilder'
		else
			render 'errors.json.jbuilder', status: :bad_request
		end
	end

	def destroy
		@photo.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	private
		def find_photo
			begin 
				@photo = Photo.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end