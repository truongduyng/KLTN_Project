
  json.id @club.id
  json.name @club.name
  json.description @club.description
  json.admins @club.admins do |a|
    json.id a
  end

json.members @club.members do |member|
  json.id member.id
  json.fullname member.fullname
end