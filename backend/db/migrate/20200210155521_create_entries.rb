class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :title
      t.string :content
      t.string :current_mood
      t.string :image
      t.string :song
      t.integer :user_id
      t.integer :mood_id
      t.integer :quote_id

      t.timestamps
    end
  end
end
