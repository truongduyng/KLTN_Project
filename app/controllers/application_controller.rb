class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json

  def angular
    render 'layouts/application'
  end

  def not_found
    render(:file => "#{Rails.root}/public/404.html")
  end
  #for devise
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
   devise_parameter_sanitizer.for(:sign_up) << [:username, :firstname, :lastname]
   devise_parameter_sanitizer.for(:account_update) << [:username, :firstname, :lastname]
 end
end
