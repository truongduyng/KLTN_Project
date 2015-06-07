class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  respond_to :html, :json
  layout false

  def home
    render 'layouts/application'
  end

  def bussiness_admin
    render 'layouts/bussiness_admin'
  end

  def system_admin
    render 'layouts/system_admin'
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
