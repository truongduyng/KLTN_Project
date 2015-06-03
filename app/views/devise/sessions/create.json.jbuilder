
json.extract! current_user, :_id, :fullname, :avatar, :username, :email, :gender, :address, :phone, :description
json.roles current_user.roles do |role|
	json.name role.name
end