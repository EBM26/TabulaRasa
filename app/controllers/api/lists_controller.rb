module Api 
  class ListsController < ApplicationController

    def index

      lists = List.all
      render json: lists
    end

    def show
      
      list = List.find(params[:id])
      render json: list
    end

    def create

      list = List.new(list_params)
      if list.save
        render json: list

      else
        render json: {errors: list.errors}, status: 422

      end
    end

    def update

      list = List.find(params[:id])
      if list.update_attributes(list_params)
        render json: list
      else
        render json: {errors: list.errors}, status: 422
      end
    end

    def destroy
      
      list = List.find(params[:id])
      list.destroy
      render json: list
    end

    def list_params
      params.require(:list).permit(:name)
    end
  end
end








