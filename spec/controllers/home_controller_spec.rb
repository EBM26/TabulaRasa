require 'rails_helper'

RSpec.describe HomeController, type: :controller do

    describe 'GET index' do 

      before(:each) {get :index}

      it "is successful" do 
        expect(response).to be_success
      end

      it "renders the index view file" do 
        expect(response).to render_template(:index)
      end
    end
end
