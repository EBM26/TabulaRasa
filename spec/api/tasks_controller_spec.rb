require "rails_helper"

describe "Tasks API", :type => :request do

  let(:request_headers) { { "Accept" => "application/json", "Content-type" => "application/json" } }
  let!(:task) { Task.create(name: "do homework", description: "do your homework", est_complete_time: 4.3, complete_by: Time.now, status: true)}
 

 it "returns a list of tasks" do 

    get '/api/tasks'
    expect(response).to have_http_status 200
    tasks = JSON.parse(response.body)
  end

  it "returns a specific task" do 

    get "/api/tasks/#{task.id}"
    expect(response).to have_http_status 200
    expect(response.body).to eq(task.to_json)
  end
  
  it "updates a specific task" do 
    task_attributes = {task: {name: "do homework", description: "do your homework", est_complete_time: 4.3, complete_by: Time.now, status: true}}.to_json
    patch "/api/tasks/#{task.id}", task_attributes, request_headers
    puts response.body
    expect(response).to have_http_status 200
  end

  it "destroys a specific task" do 
    delete "/api/tasks/#{task.id}"
    expect(response).to have_http_status 200
  end
end
