class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.float :est_complete_time
      t.date :complete_by
      t.boolean :status

      t.timestamps null: false
    end
  end
end
