class AssestCategoriesController < ApplicationController

	before_action :authenticate_user!
	before_action :check_role_bussiness_admin
	before_action :find_assest_category, only: [:show, :update, :destroy]
	#Da test
	#/assestcategories.json
	def index
		bussiness_id = current_user.bussiness.id
		@assest_categories = AssestCategory.where(bussiness_id: bussiness_id).to_a
		render json: @assest_categories
	end

	#assestcategories/id.json
	def show
		render json: @assest_category
	end

	def create
		#Can thay the bang strong_parameter ?????
		assest_category = AssestCategory.new(assest_category_params) do |ac|
			ac.bussiness_id = current_user.bussiness.id
			if params.has_key?(:fees) && !params[:fees].blank?
				params[:fees].each do |fee|
					ac.fees << Fee.new() do |f|
						f.begin_time = Time.parse(fee[:begin_time])
						f.end_time = Time.parse(fee[:end_time])
						f.price = fee[:price]
					end
				end	
			end
		end
		 
		if assest_category.save
			render json: assest_category, status: :created
		else
			render json: assest_category.errors, status: :unprocessable_entity
		end
	end

	def update
		result = @assest_category.update_attributes(assest_category_params) 

		#Update fees
		if result 
			if params.has_key?(:fees) && !params[:fees].blank?
				#Delete all fees and renew
				@assest_category.fees.destroy_all
				params[:fees].each do |fee|
					@assest_category.fees << Fee.new() do |f|
						f.begin_time = Time.parse(fee[:begin_time])
						f.end_time = Time.parse(fee[:end_time])
						f.price = fee[:price]
					end
				end	
			else
				#delete all fees
				@assest_category.fees.destroy_all
			end

			render json: @assest_category, status: :ok
		else
			render json: @assest_category.errors, status: :unprocessable_entity
		end
	end

	#/assest_categories/:id.(:format)
	def destroy
		#cho nay xet chuyen san sang loai hang khac
		@assest_category.destroy
		render nothing: true, status: :ok, content_type: 'application/json'
	end


	private 
		def assest_category_params
			# params.require(:assest_category)
			# .permit(:name, :short_desc, :description, {fees: [:begin_time, :end_time, :price]})
			# params.require(:assest_category)
			# .permit(:name, :short_desc, :description, fees: [:begin_time, :end_time, :price])
			 params.require(:assest_category)
				 .permit(:name, :short_desc, :description)
		end

		#Da test
		def check_role_bussiness_admin
			if !current_user.is_bussiness_admin?
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end

		def find_assest_category
			begin
				bussiness_id = current_user.bussiness.id
				@assest_category = current_user.bussiness.assest_categories.find(params[:id])
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end