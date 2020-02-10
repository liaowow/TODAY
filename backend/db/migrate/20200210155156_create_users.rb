class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :location
      t.string :first_name
      t.string :profile_pic

      t.timestamps
    end
  end
end