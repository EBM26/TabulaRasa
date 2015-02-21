Rails.application.routes.draw do
 
 root 'home#index'

 namespace :api do

  resources :lists do 
    resources :items
  end
  resources :tasks
  
 end
end
