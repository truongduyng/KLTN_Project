class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie_for_ng
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

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

    def verified_request?
      super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
    end

end
