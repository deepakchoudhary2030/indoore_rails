class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :email, unique: true
      t.integer :pincode, null: false, default: 452009
      t.string :role, default: "user"
      t.string :professions, array: true, default: []
      t.string :address, null: false
      t.string :password, null: false
      t.string :confirm_password, null: false
      t.timestamps
    end
    add_index :users, :professions, using: 'gin'
  end
end
