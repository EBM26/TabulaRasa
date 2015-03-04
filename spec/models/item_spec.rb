require 'rails_helper'

RSpec.describe Item, type: :model do
  
  let!(:item) {Item.create(name: "first name", description: "do stuff", complete_by: Time.now, link: "this link", notes: "these notes")}

    it "responds to a name" do 
      expect(item).to respond_to(:name)
    end

    it "requires a name" do 
      item.name = nil
      expect(item).to be_invalid
    end


    it "responds to description" do 
      expect(item).to respond_to(:description)
    end

     it "responds to complete_by" do 
      expect(item).to respond_to(:complete_by)
    end

     it "responds to link" do 
      expect(item).to respond_to(:link)
    end

     it "responds to notes" do 
      expect(item).to respond_to(:notes)
    end



end
