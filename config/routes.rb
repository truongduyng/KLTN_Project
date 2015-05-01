Rails.application.routes.draw do
  root 'application#angular'
  get 'bussiness-admin' => 'admin#index'

  resources 'branches'
  get '/:branch_url_alias' => 'branches#branch_details'
  get 'search(/:lat/:lng/:distance)' => 'branches#search', constraints:{ lat: /[0-9\.]+/, lng: /[0-9\.]+/, distance: /[0-9\.]+/ }
  get 'searchnameadd(/:search_query)' => 'branches#search'

  resources 'assets' do
    collection do
      get 'get-assets-by-category'
    end
  end

  resources 'asset_categories' do
    resources 'fees'
  end

  post 'tickets' => 'tickets#create'
  get 'tickets/:date/:branch_id' => 'tickets#show'

  get 'dang-ky-doanh-nghiep' => 'bussinesses#new'
  post 'bussiness-create' => 'bussinesses#create'
  put 'bussinesses/update' => 'bussinesses#update'
  get 'bussinesses/show' => 'bussinesses#show'

  post 'infomations/edit' => 'informations#edit'
  get 'informations/show' => 'informations#show'

  get 'check/username' => 'user#check_username'
  get 'check/email' => 'user#check_email'
  devise_for :users
end
