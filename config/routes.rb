Rails.application.routes.draw do
 
 root 'home#index'

 namespace :api do

  resources :lists
  resources :tasks
  
 end
end
