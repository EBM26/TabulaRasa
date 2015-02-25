class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create # creates new user
    @user = User.new(params.require(:user).permit(:name, :email, :password, :password_confirmation))

    if @user.save
      
      session[:user_id] = @user.id
      redirect_to root_path
    else
      
      redirect_to signup_login_path
    end
  end
end
