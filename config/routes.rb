Rails.application.routes.draw do
 
 root 'home#index'
 get '/signup/login' => 'welcome#new'
 get '/signup/login' => 'users#new'
 post '/signup/login' => 'users#create'
 get '/signup/login' => 'sessions#new'
 post '/login' => 'sessions#create'
 get '/logout' => 'sessions#destroy', as: :logout

 resources :users

 namespace :api do

  resources :lists do 
    resources :items
  end
  resources :tasks
  
 end
end
