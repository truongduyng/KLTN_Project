json._id @clubpost.id
  json.content @clubpost.content
  json.photos @clubpost.photos do |photo|
  json.url photo.image.url
end

json.user do
  json.avatar @clubpost.user.avatar.url
  json.fullname @clubpost.user.fullname
  json.username @clubpost.user.username
end

json.updated_at @clubpost.updated_at
json.created_at @clubpost.created_at