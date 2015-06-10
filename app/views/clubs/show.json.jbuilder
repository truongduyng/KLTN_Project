json.id @club.id
json.name @club.name
json.description @club.description
if  @club.cover_image
  json.cover_image @club.cover_image.image.url
end
json.admins @club.admins do |a|
  json.id a
end

json.members @club.members do |member|
  json.id member.id
  json.fullname member.fullname
  json.avatar member.avatar.url
end