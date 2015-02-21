module Api
  class ItemsController < ApplicationController
    
    def index
      
      items = Item.all 
      render json: items
    end
    
    def show

      item = Item.find(params[:id])
      render json: item
    end

    def create
      
      list = List.find(params[:list_id])
      list.items << Item.new(item_params)

      if list.save
        render json: list
      else
        render json: {errors: list.errors}, status: 422

      end
    end

    def update

      item = Item.find(params[:id])
      if item.update_attributes(item_params)
        render json: item
      else
        render json: {errors: list.errors}, status: 422
    end
  end

    def destroy

      item = Item.find(params[:id])
      item.destroy
      render json: item
    end

    def item_params
      params.require(:item).permit(:name, :description, :complete_by, :link, :notes)
    end

  end
end