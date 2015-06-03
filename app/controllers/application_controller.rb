class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
<<<<<<< HEAD

  respond_to :html, :json
  
  #before_action :authenticate_user!
  
  def angular
    puts '------------------------------------------------------------------------------------------------------------------------------------------'
    puts current_user
    puts '------------------------------------------------------------------------------------------------------------------------------------------'
=======
  respond_to :json
  layout false
>>>>>>> merge_bussiness_admin

  def angular
    render 'layouts/application'
  end

  def adminbussines
    render "layouts/bussiness_admin"
  end

  def not_found
    render(:file => "#{Rails.root}/public/404.html")
  end
  #for devise
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
<<<<<<< HEAD
    	def configure_permitted_parameters
    	    # render json: params, status: :ok
          devise_parameter_sanitizer.for(:sign_up) << [:username, :firstname, :lastname]
    	    
          devise_parameter_sanitizer.for(:account_update) << [:username, :firstname, :lastname]
          
          # #for change password
          # devise_parameter_sanitizer.for(:account_update) { |u| 
          #   u.permit(:password, :password_confirmation, :current_password) 
          # }
          
          #  devise_parameter_sanitizer.for(:account_update) << [:password, :password_confirmation, :current_password, :username, :firstname, :lastname]
          
          # # #for change password
          # # devise_parameter_sanitizer.for(:account_update) { |u| 
          # #   u.permit(:password, :password_confirmation, :current_password) 
          # # }
    	end
    
=======
  def configure_permitted_parameters
   devise_parameter_sanitizer.for(:sign_up) << [:username, :fullname, :phone]
   devise_parameter_sanitizer.for(:account_update) << [:username, :fullname, :phone, :role_name]
 end
>>>>>>> merge_bussiness_admin
end
