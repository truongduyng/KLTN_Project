class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
  	# byebug
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])
    # byebug
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      # sign_in @user
      # render json: @user, status: :ok
    end
  end
end