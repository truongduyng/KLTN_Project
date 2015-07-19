class VenuesController < ApplicationController
	before_action :authenticate_user!, only: [:create, :add_photo, :destroy, :rating]
	before_action :find_and_check_venue_with_user, only: [:add_photo, :destroy]
	before_action :find_venue, only: [:show, :rating]
	
	def create

		@venue = Branch.new(venue_params.except(*[:latitude, :longitude]).merge(coordinates: [venue_params[:longitude], venue_params[:latitude]]))
		@venue.user = current_user
		@venue.url_alias = @venue.id.to_s
		if @venue.save
			render :show, status: :created, location: @venue
		else
			render json: @venue.errors, status: :unprocessable_entity
		end
	end

	def show
		# byebug
		hash_rates_by_level = @venue.rates.group_by {|rate| rate.level}
		@rate_total_by_level = hash_rates_by_level.map do |key, array_rates_by_level|
			rate_count = array_rates_by_level.inject(0) {|sum, rate| sum + rate.level}
			[key, rate_count]
		end
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

	#PUT /venues/:id/rating.json
	def rating
		# kiem tra thu nguoi dung da rate chua neu rate roi thi cap nhat rate moi
		old_rate = @venue.rates.where(user_id: current_user.id).first
		if old_rate
			if old_rate.update_attribute(:level, params[:level])
				render nothing: true, status: :ok, content_type: 'application/json'
			else
				render json: rate.errors, status: :unprocessable_entity
			end
		else
			rate = Rate.new level: params[:level]
			rate.user = current_user
			@venue.rates << rate
			if rate.errors.blank?
				render nothing: true, status: :ok, content_type: 'application/json'
			else
				render json: rate.errors, status: :unprocessable_entity
			end
		end
	end

	private
		def venue_params
			params.permit(:name, :phone, :address, :description, :latitude, :longitude, :begin_work_time, :end_work_time)
		end

		def rate_params
			params.permit(:level)
		end
		#for show
		def find_venue
			begin
				@venue = Branch.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end


		def find_and_check_venue_with_user
			begin
				@venue = Branch.find(params[:id])
				if @venue.user != current_user
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

end

