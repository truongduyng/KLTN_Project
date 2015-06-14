class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    # byebug
    if @user.persisted?
      # byebug
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
    end
  end
end