class AssestCategoriesController < ApplicationController

	before_action :authenticate_user!
	before_action :check_role_bussiness_admin
	#Da test
	#/assestcategories.json
	def index
		bussiness_id = current_user.bussiness.id
		@assest_categories = AssestCategory.where(bussiness_id: bussiness_id).to_a
		render json: @assest_categories
	end

	def create
		#Can thay the bang strong_parameter ?????
		assest_category = AssestCategory.new(assest_category_params) do |ac|
			ac.bussiness_id = current_user.bussiness.id
			if params.has_key?(:fees)
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
			if current_user.role.name == 'bussiness admin'
			else
				render json: {}, status: :not_found	
			end
		end
end