module Api
  class TasksController < ApplicationController
  
    def index
      
      tasks = Task.all 
      render json: tasks
    end
    
    def show

      task = Task.find(params[:id])
      render json: task
    end

    def create

      task = Task.new(task_params)
      if task.save
        render json: task
      else
        render json: {errors: task.errors}, status: 422
      end
    end

    def task_params
      params.require(:task).permit(:name, :description, :est_complete_time, :complete_by, :status)
    end
  end
end