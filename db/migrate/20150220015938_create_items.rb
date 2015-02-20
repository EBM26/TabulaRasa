class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.date :complete_by
      t.string :link
      t.string :notes

      t.timestamps null: false
    end
  end
end
