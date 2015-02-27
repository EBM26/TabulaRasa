class AddForeignKeyToTasks < ActiveRecord::Migration
  # makes the tasks belong to a specific user
  def change
    add_column :tasks, :user_id, :integer
    add_foreign_key :tasks, :users
  end
end
