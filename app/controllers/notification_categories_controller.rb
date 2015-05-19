class NotificationCategoriesController < SystemAdminController
	before_action :find_notification_category, only: [:update]
	#GET /notification_categories.json
	#Tra ve cac loai notifcation ma co template
	def index
		notification_categories = NotificationCategory.have_templates
		render json: notification_categories, status: :ok
	end

	#PUT /notification_categories/:id.json
	def update
		sub_params  = params.permit(:content)
		# render json: sub_params, status: :ok
		if @notification_category.notification_template.update_attributes(sub_params)
			render json: @notification_category, status: :ok
		else
			render json: @notification_category.notification_template.errors, status: :unprocessable_entity
		end
	end

	private 
		
		def find_notification_category
			begin
				@notification_category = NotificationCategory.find(params[:id])
				#Khong the chinh sua loai notification ma ko co template
				if @notification_category.notification_template.nil?
					render nothing: true, status: :not_found, content_type: 'application/json'
				end
			rescue Mongoid::Errors::DocumentNotFound
				render nothing: true, status: :not_found, content_type: 'application/json'
			end
		end
end