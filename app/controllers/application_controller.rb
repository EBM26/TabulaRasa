class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def current_user # sets current user for session
    if Rails.env.test? # creates a user for testing authentication
      user = User.first_or_create!(name: "Aaron", email: "aaron@a.com", password: "123456")
      @current_user = user
    else
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
  end
  
  helper_method :current_user

 def authorize # authorizes current user
   
  redirect_to signup_login_path unless current_user

end
end
