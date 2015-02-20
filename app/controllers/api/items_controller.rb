module Api
  class ItemsController < ApplicationController
    
    def index
      
      items = Item.all 
      render json: items
    end
    
    def show

      item = Item.find(parmas[:id])
      render json: item
    end

  end
end