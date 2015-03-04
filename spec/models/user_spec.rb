require 'rails_helper'

RSpec.describe User, type: :model do
  
  let!(:user) { User.create(name: "rami", email: "rami.com", password_digest: "123456")}

  it "responds to a name" do 
      expect(user).to respond_to(:name)
    end

    it "requires a name" do 
      user.name = nil
      expect(user).to be_invalid
    end

    it "requires an email" do 
      user.email = nil
      expect(user).to be_invalid
    end

    it "requires a password" do 
      user.password_digest = nil
      expect(user).to be_invalid
    end



end
