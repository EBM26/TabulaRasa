module Api
  class TasksController < ApplicationController
  
    def index # shows all of the tasks that were created 
      
      tasks = Task.all 
      render json: tasks
    end
    
    def show # shows a specific task

      task = Task.find(params[:id])
      render json: task
    end

    def create #creates a new task

      task = Task.new(task_params)
      if task.save
        render json: task
      else
        render json: {errors: task.errors}, status: 422
      end
    end

    def update # updates an excisting task

      task = Task.find(params[:id])
      if task.update_attributes(task_params)
        render json: task
      else
        render json: {errors: task.errors}, status: 422
      end
    end

    def destroy # deletes a specific task
      
      task = Task.find(params[:id])
      task.destroy
      render json: task
    end

    private 

    def task_params # a shorthand for the task params to make the code cleaner
      params.require(:task).permit(:name, :description, :est_complete_time, :complete_by, :status)
    end


  end
end