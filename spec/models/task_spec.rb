require 'rails_helper'

  RSpec.describe Task, type: :model do

  let!(:task) { Task.create(name: "do homework", description: "do your homework", est_complete_time: 4.3, complete_by: Time.now, status: true)}

   it "responds to a name" do 
     expect(task).to respond_to(:name)
   end 

   it "requires a name" do 
     task.name = nil
     expect(task).to be_invalid
   end

   it "task is not valid if name is duplicated" do 
      task2 = Task.new(name: "do homework")
      expect(task2).to be_invalid
   end

   it "requires a description" do 
      task.description = nil
      expect(task).to be_invalid
   end

   it "requires a est_complete_time" do 
      task.est_complete_time = nil
      expect(task).to be_invalid
   end

   it "requires a complete_by" do 
    task.complete_by = nil
    expect(task).to be_invalid
   end

   it "requires a status" do 
     task.status = nil
     expect(task).to be_invalid
   end
end
