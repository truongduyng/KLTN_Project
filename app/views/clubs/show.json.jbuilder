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

json.clubposts @club.club_posts.desc(:updated_at) do |post|
  json._id post.id
  json.content post.content
  json.photos post.photos do |photo|
    json.url photo.image.url
  end
  json.user do
    json.avatar post.user.avatar.url
    json.fullname post.user.fullname
    json.username post.user.username
  end
  json.updated_at post.updated_at
  json.created_at post.created_at
end