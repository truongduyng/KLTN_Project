class AdminController < ActionController::Base
	protect_from_forgery with: :exception
	respond_to :json
	
	def bussiness_admin
		render 'layouts/bussiness_admin'
	end

	def system_admin
		render 'layouts/system_admin'
	end

	# def image_browser
	# 	render json: {message: 'founded'}, status: :ok
	#     # render :file => '/assets/ckeditor/plugins/imagebrowser/browser/browser.html', :layout => false 
	# end
end
