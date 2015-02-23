## Google oauth code that lets people log in with google
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["Client Id"], ENV["_-_1x3HYX_TRt8l1Ou_YZ-D_"], {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
    redirect_uri:'http://localhost/auth/google_oauth2/callback'
  }
end