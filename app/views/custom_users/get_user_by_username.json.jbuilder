json.extract! @user, :_id, :address, :avatar, :description, :email, :fullname, :gender, :phone, :roles, :username
if @user.identity
	json.is_login_facebook true
else
	json.is_login_facebook false
end
json.is_bussiness_admin @user.is_bussiness_admin?