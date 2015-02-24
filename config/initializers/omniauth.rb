## Google oauth code that lets people log in with google
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["Client_Id"], ENV["Client_Secret"], {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
    redirect_uri:'http://localhost:3000/auth/google_oauth2/callback'
  }
end