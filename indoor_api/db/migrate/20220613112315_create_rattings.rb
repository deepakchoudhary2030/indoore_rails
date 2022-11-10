class CreateRattings < ActiveRecord::Migration[6.1]
  def change
    create_table :rattings do |t|
      t.integer :worker_id, null: false
      t.string :fname
      t.string :lname
      t.integer :ratting
      t.text :comment 
      t.timestamps
    end
  end
end
