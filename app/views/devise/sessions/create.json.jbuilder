json.extract! current_user, :_id, :fullname, :username, :email, :gender, :address, :phone, :description
json.avatar do 
	json.url current_user.avatar.url
end
json.roles current_user.roles do |role|
	json.name role.name
end