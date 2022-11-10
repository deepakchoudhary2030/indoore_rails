Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories
      namespace :user do
        resources :rattings
        resources :users
        get '/users/profession/:pincode/:profession', to: 'users#category'
        post '/login/login', to: 'login#login'
        namespace :worker do
          resources :requests
        end
      end
    end
  end
end
