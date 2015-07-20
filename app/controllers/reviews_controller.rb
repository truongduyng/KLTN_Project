class ReviewsController < ApplicationController
	before_action :authenticate_user!, only: [:create]
	before_action :find_venue, only: [:create]
	before_action :find_review_and_check_with_user, only: [:update, :destroy]
	
	#GET /venues/:venue_id/reviews.json
	def index
		@reviews = Review.where(venue_id: params[:venue_id])
	end

	#POST /venues/:venue_id/reviews.json
	def create
		# byebug
		@review = Review.new review_params
		@review.user = current_user
		@review.venue = @venue
		if @review.save
			render 'show.json.jbuilder'
		else
			render json: @review.errors, status: :bad_request
		end  
	end

	#PUT /venues/:venue_id/reviews/:id.json
	def update
		
		if @review.update_attributes review_params
			render 'show.json.jbuilder'
		else
			render json: @review.errors, status: :bad_request
		end
	end

	#DELETE /venues/:venue_id/reviews/:id.json
	def destroy
		@review.destroy
		render nothing: true, status: :ok
	end

	private
		def review_params
			params.require(:review).permit(:content)
		end

		def find_venue
			begin
				@venue = Branch.find(params[:venue_id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		def find_review_and_check_with_user
			begin
				@review = Review.find(params[:id])
				if @review.user != current_user
					render nothing: true, status: :bad_request
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end