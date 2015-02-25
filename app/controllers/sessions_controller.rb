class SessionsController < ApplicationController

  def new

  end
  
  def create  

    user = User.find_by(email: params[:user][:email])

    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id.to_s
      redirect_to root_path
    else
      puts "We're in the else block"
      redirect_to signup_login_path 
    end   
  end

  def destroy
   session[:user_id] = nil
   redirect_to signup_login_path
 end

end