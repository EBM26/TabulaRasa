module Api
  class ItemsController < ApplicationController
    
    def index # shows all items 
      
      items = Item.where(list_id: params[:list_id]) # finds items in a specific list
      render json: items
    end
    
    def show # shows a specific item

      item = Item.find(params[:id])
      render json: item
    end

    def create # creates an item that belongs to a particular list
      
      list = List.find(params[:list_id])
      list.items << Item.new(item_params) # pushes items to list

      if list.save
        render json: list
      else
        render json: {errors: list.errors}, status: 422

      end
    end

    def update # updates an item

      item = Item.find(params[:id])
      if item.update_attributes(item_params)
        render json: item
      else
        render json: {errors: list.errors}, status: 422
    end
  end

    def destroy # deletes an item

      item = Item.find(params[:id])
      item.destroy
      render json: item
    end

    def item_params # shorthand for item params
      params.require(:item).permit(:name, :description, :complete_by, :link, :notes)
    end

  end
end