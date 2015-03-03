require "rails_helper"


describe "Lists API", :type => :request do

  session[:user_id] = "2"
  let(:request_headers) { { "Accept" => "application/json", "Content-type" => "application/json" } } # standard in every api controller rspec test
  let!(:list) { List.create(name: "friends to see")}

  it "returns a list of lists" do 

    get "/api/lists"

    expect(response).to have_http_status 200
    lists = JSON.parse(response.body)
  end

  it "returns a specific list" do 

    get "/api/lists/#{list.id}"
    expect(response).to have_http_status 200
    
  end

  it "creats a new list" do 
    list_attribute = {list: { name: "do homework"}}.to_json # testing the creation of the model attributes
    post "/api/lists", list_attribute, request_headers
    expect(response).to have_http_status 200

  end

  it "updates a specific list" do 
    list_attribute = {list: { name: "do homework"}}.to_json
    patch "/api/lists/#{list.id}", list_attribute, request_headers
    puts response.body
    expect(response).to have_http_status 200

  end

  it "destroys a specific list" do 
    delete "/api/lists/#{list.id}"
    expect(response).to have_http_status 200
  end
end









