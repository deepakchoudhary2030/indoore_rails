class AddUserNameToRequest < ActiveRecord::Migration[6.1]
  def change
    add_column :requests, :UserName, :string
    add_column :requests, :UserLname, :string
    add_column :requests, :WorkerName, :string
    add_column :requests, :WorkerLname, :string
  end
end
