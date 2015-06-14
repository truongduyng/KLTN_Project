json._id @clubpost.id
json.content @clubpost.content
json.like_count @clubpost.likes.count

json.photos @clubpost.photos do |photo|
  json._id photo.id
  json.image do
    json.url photo.image.url
  end
end

json.user do
  json._id @clubpost.user.id
  json.avatar @clubpost.user.avatar.url
  json.fullname @clubpost.user.fullname
  json.username @clubpost.user.username
end

if user_signed_in? && @clubpost.likes.where('user_id' => current_user.id).first
  json.isLiked true
else
  json.isLiked false
end

json.comments @clubpost.comments do |comment|
  json._id comment.id
  json.content comment.content
  json.user do
    json._id comment.user.id
    json.avatar do
      json.url comment.user.avatar.url
    end
    json.username comment.user.username
    json.fullname comment.user.fullname
  end
  json.created_at comment.created_at
  json.updated_at comment.updated_at
  json.like_count comment.likes.count
  json.reply_count comment.replies.count
  if user_signed_in? && comment.likes.where('user_id' => current_user.id).first
    json.isLiked true
  else
    json.isLiked false
  end
end

json.updated_at @clubpost.updated_at
json.created_at @clubpost.created_at