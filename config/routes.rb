Rails.application.routes.draw do


  resources :venues do
    member do
      post 'add_photo'
      put 'delete_photo'
    end
  end

  resources :branches do
    collection do
      get 'list_branch_names'
    end
  end

  resources :images

  resources :notification_categories do
  end

  resources :notifications do
    member do
      put 'watched'
      put 'loaded'
    end

    collection do
      put 'bo_new'
    end
  end

  resources :system_admin_bussiness_requests do
    member do
      put 'accept'
      put 'deny'
    end
  end

  resources :bussiness_requests

  resources :system_admin_posts do
    member do
      put 'accept'
      put 'deny'
    end
    collection do
      get 'get_accept_and_deny_posts'
    end
  end

  resources :favorite_posts do
    member do
      put 'add'
      put 'remove'
    end
  end

  get '/posts/:username/get_favorite_posts_by_username' => 'posts#get_favorite_posts_by_username'
  get '/posts/:username/get_posts_by_username' => 'posts#get_posts_by_username'

  get 'custom_users/:username' => 'custom_users#get_user_by_username'


  resources :custom_users do
    collection do
      put 'change_password'
      post 'change_avatar'
    end
  end

  resources :comments do
    member do
      put 'like'
      put 'unlike'
      get 'get_k_first_like/:number' => 'comments#get_k_first_like'
      get 'get_all_likes'
    end
    resources :replies do
      member do
        put 'like'
        put 'unlike'
        get 'get_k_first_like/:number' => 'replies#get_k_first_like'
        get 'get_all_likes'
      end
    end
  end

  resources :posts do
    member do
      post 'add_photo'
      put 'delete_photo'
      put 'like'
      put 'unlike'
      get 'get_k_first_like/:number' => 'posts#get_k_first_like'
      get 'get_all_likes'
      put 'follow'
      put 'unfollow'
    end

    collection do
      get 'get_posts_by_current_user'
    end
  end

  get 'search(/:lat/:lng/:distance)' => 'branches#search', constraints:{ lat: /[0-9\.]+/, lng: /[0-9\.]+/, distance: /[0-9\.]+/ }
  get 'searchnameadd(/:search_query)' => 'branches#search'

  resources :assets do
  end

  resources :clubs do
    member do
      post 'addmember'
      post 'removemember'
      post 'makeadmin'
      post 'removeadmin'
      get 'find_members/:member_name' => 'clubs#find_members'
      post 'add_cover'
    end
    resources :club_posts
  end

  resources :club_posts, only: [] do
    member do
      post 'add_photo'
      put 'like'
      put 'unlike'
      get 'get_k_first_like/:number' => 'club_posts#get_k_first_like'
      get 'get_all_likes'
      put 'follow'
      put 'unfollow'
    end
  end

  resources :asset_categories do
    resources :fees
  end

  get 'tickets/:date/:branch_id' => 'tickets#show'
  post 'tickets' => 'tickets#create'
  post 'tickets/update' => 'tickets#update'
  delete 'tickets/:ticket_id' => 'tickets#destroy'

  get 'dang-ky-doanh-nghiep' => 'bussinesses#new'
  post 'bussiness-create' => 'bussinesses#create'
  put 'bussinesses/update' => 'bussinesses#update'
  get 'bussinesses/show' => 'bussinesses#show'

  post 'infomations/edit' => 'informations#edit'
  get 'informations/show' => 'informations#show'

  # resources :informations
  devise_for :users,:controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  ###
  get 'bussiness-admin' => 'application#bussiness_admin'
  get 'system-admin' => 'application#system_admin'
  root 'application#home'

  get 'check/username' => 'users#check_username'
  get 'check/email' => 'users#check_email'
  get 'find_users/:username' => 'users#find_user_by_username'

  get '/:branch_url_alias' => 'branches#branch_details', constraints: {branch_url_alias: /(?!websocket$).*/}, as: 'booking_address'
end
