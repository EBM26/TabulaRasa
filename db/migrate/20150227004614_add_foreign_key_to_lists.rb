class AddForeignKeyToLists < ActiveRecord::Migration
  # makes the lists belong to a specific user
  def change
    add_column :lists, :user_id, :integer
    add_foreign_key :lists, :users
  end
end
