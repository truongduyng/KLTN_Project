class VenuesController < ApplicationController
	before_action :authenticate_user!, only: [:create, :add_photo, :destroy]
	before_action :find_and_check_venue_with_user, only: [:add_photo, :destroy]
	before_action :find_venue, only: [:show]

	def create
		@venue = Venue.new(venue_params.except(*[:latitude, :longitude]).merge(coordinates: [venue_params[:longitude], venue_params[:latitude]]))
		@venue.user = current_user
		@venue.url_alias = @venue.id.to_s
		if @venue.save
			render :show, status: :created, location: @venue
		else
			render json: @venue.errors, status: :unprocessable_entity
		end
	end

	def show
	end

	#DELETE /venues/:id.json
	def destroy
		@venue.photos.destroy_all
		@venue.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end

	#/venues/:id/add_photo
	def add_photo
		begin
			@photo = Photo.new(image: params[:file])
			@venue.photos ||=[]
			@venue.photos << @photo
			render json: @venue.photos, status: :created
		rescue Exception
			render nothing: true, status: :bad_request, content_type: 'application/json'
		end
	end


	private
		def venue_params
			params.permit(:name, :phone, :address, :description, :latitude, :longitude)
		end

		#for show
		def find_venue
			begin
				@venue = Venue.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end


		def find_and_check_venue_with_user
			begin
				@venue = Venue.find(params[:id])
				if @venue.user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end

