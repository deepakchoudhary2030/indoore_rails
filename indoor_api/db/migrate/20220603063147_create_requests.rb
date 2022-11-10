class CreateRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :requests do |t|
      t.integer :user_id, null: false
      t.integer :worker_id, null: false
      t.boolean :status, default: false
      t.timestamps
    end
  end
end
