Rails.application.routes.draw do
 
 root 'home#index'

 get "/auth/:provider/callback" => "sessions#create"

 namespace :api do

  resources :lists do 
    resources :items
  end
  resources :tasks
  
 end
end
