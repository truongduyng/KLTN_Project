class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  respond_to :html, :json
  ##BN
  layout false
  ##EN
  #before_action :authenticate_user!
  
 
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
    def configure_permitted_parameters
       devise_parameter_sanitizer.for(:sign_up) << [:username, :fullname, :phone]
       devise_parameter_sanitizer.for(:account_update) << [:username, :fullname, :phone, :role_name]
    end
end
