module Api 
  class ListsController < ApplicationController

    def index # indexes all of the lists

      lists = List.where(user_id: current_user.id) # shows lists that belong to proper user
      render json: lists, 
          include: {items: {}} 
    end


    def show # shows an individual list
      
      list = List.find(params[:id])
      render json: list,
            include: {items: {}} # includes items array to each
    end

    def create # creates a new list

      list = List.new(list_params)
      list.user = current_user # saves that list to a specific user
      if list.save
        render json: list

      else
        render json: {errors: list.errors}, status: 422

      end
    end

    def update # updates list name

      list = List.find(params[:id])
      if list.update_attributes(list_params)
        render json: list
      else
        render json: {errors: list.errors}, status: 422
      end
    end

    def destroy # deletes list
      
      list = List.find(params[:id])
      list.destroy
      render json: list
    end

    def list_params # shorthand for list params
      params.require(:list).permit(:name)
    end

    
  end
end







