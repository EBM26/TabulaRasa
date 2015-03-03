class SessionsController < ApplicationController

  def new

  end
  
  def create  # creates a new session for the user

    user = User.find_by(email: params[:user][:email])


    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id.to_s
      redirect_to root_path
    else
      redirect_to signup_login_path 
    end   
  end

  def destroy # destroys users session, in other words, logs out
   session[:user_id] = nil
   redirect_to signup_login_path
 end

end