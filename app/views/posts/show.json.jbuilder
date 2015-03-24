json.extract! @post, :_id, :title, :body, :photos, :likes, :created_at, :updated_at, :user
json.comments @post.comments, :_id, :content, :created_at, :updated_at, :user, :likes, :replies

# json.extract! @assest, :_id, :name, :quantity, :branch_id, :assest_category_id