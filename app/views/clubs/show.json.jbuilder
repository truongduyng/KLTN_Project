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

  if user_signed_in? && post.likes.where('user_id' => current_user.id).first
    json.isLiked true
  else
    json.isLiked false
  end

  json.comments post.comments do |comment|
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

  json.updated_at post.updated_at
  json.created_at post.created_at
end