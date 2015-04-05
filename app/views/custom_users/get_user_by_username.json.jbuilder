json.extract! @user, :_id, :address, :avatar, :description, :email, :firstname, :lastname, :gender, :phone, :roles, :username
json.is_bussiness_admin @user.is_bussiness_admin?