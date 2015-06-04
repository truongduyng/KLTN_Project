class UsersController < ActionController::Base

  def show
  end

  def find_user_by_username
    begin

      @results =  User.any_of({fullname: /#{params[:username]}/i}).to_a
      @results.delete(current_user)

    rescue Exception => e
      render json: ""
    end
  end

  def check_username
    if User.where(username: params[:field]).first
      render json: {isUnique: false}
    else
      render json: {isUnique: true}
    end
  end

  def check_email
    if User.where(email: params[:field]).first
      render json: {isUnique: false}
    else
      render json: {isUnique: true}
    end
  end

end