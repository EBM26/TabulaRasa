class HomeController < ApplicationController
  
    before_action :authorize # prevents user from accessing rails-angular app before being authorized
    
    def index
      
    end

  end
