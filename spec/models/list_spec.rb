require 'rails_helper'

RSpec.describe List, type: :model do

  let!(:list) { List.create(name: "friends to see")}

  it "responds to a name" do 
    expect(list).to respond_to(:name)
  end

  it "requires a name" do 
    list.name = nil
    expect(list).to be_invalid
  end

  it "list is not valid if name duplicated" do
    list2 = List.new(name: "friends to see")
    expect(list2).to be_invalid
  end

end
