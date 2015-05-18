Rails.application.routes.draw do


  # #render plugin image browser thay vi load resource
  # get '/assets/ckeditor/plugins/imagebrowser/browser/browser.html' => 'admin#image_browser'

  
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
  #test upload avatar
  resources :my_avatars
  resources :favorite_posts do
    member do
      put 'add'
      put 'remove'
    end
  end
  get '/posts/:username/get_favorite_posts_by_username' => 'posts#get_favorite_posts_by_username'
  get '/posts/:username/get_posts_by_username' => 'posts#get_posts_by_username'
  
  get 'custom_users/:username' => 'custom_users#get_user_by_username'
  
  get '/posts/:id/get_k_first_like/:number' => 'posts#get_k_first_like'
  get '/comments/:id/get_k_first_like/:number' => 'comments#get_k_first_like'
  get '/comments/:comment_id/replies/:id/get_k_first_like/:number' => 'replies#get_k_first_like'
  
  resources :custom_users do
    collection do
      put 'change_password'
      post 'change_avatar'
    end
  end

  resources :comments do
    resources :replies do
        member do
            put 'like'
            put 'unlike'
            get 'get_k_first_like'
            get 'get_all_likes'
        end
    end
  end

  resources 'posts' do
    member do
      post 'add_photo'
      put 'delete_photo'
      put 'like'
      put 'unlike'
      get 'get_all_likes'
      put 'follow'
      put 'unfollow'
      # get 'get_k_first_like'
    end

    collection do
      get 'get_posts_by_current_user'
    end
    
    resources :comments do
      member do
        put 'like'
        put 'unlike'
        get 'get_k_first_like'
        get 'get_all_likes'
      end
    end
  end

  resources 'branches'
  resources 'assests' do
    collection do
      get 'get-assests-by-category'
    end
  end

  resources 'assest_categories' do
    resources 'fees'
  end
  post 'bussinesses/new' => 'bussinesses#new'
  put 'bussinesses/update' => 'bussinesses#update'
  get 'bussinesses/show' => 'bussinesses#show'

  post 'infomations/edit' => 'informations#edit'
  get 'informations/show' => 'informations#show'
  # resources :informations
  get 'check/username' => 'user#check_username'
  get 'check/email' => 'user#check_email'
  devise_for :users
  get 'bussiness-admin' => 'admin#bussiness_admin' 
  get 'system-admin' => 'admin#system_admin'
  root 'application#angular'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
