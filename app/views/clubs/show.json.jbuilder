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

if !@club_post
  json.clubposts @club.club_posts.desc(:updated_at) do |post|

    json.partial! 'club_posts/show', clubpost: post
  end

else
  json.clubposts @club_post do |post|

    json.partial! 'club_posts/show', clubpost: post
  end
end