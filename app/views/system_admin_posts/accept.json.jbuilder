json.extract! @post, :_id, :title, :body, :photos, :created_at, :updated_at, :user
json.status @post.post_status
