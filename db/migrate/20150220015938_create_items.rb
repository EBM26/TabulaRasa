class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.date :complete_by
      t.string :link
      t.string :notes
      t.references :list, index: true # makes the database belong to lists

      t.timestamps null: false
    end

    add_foreign_key :items, :lists # makes the lists a foreign key of items.
  end
end
