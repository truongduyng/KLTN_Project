json.array! @clubposts do |clubpost|
  json._id clubpost.id
  json.content clubpost.content
  json.photos clubpost.photos
  json.user clubpost.user
  json.updated_at clubpost.updated_at
  json.created_at clubpost.created_at
end