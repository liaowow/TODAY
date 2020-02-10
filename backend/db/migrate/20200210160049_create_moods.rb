class CreateMoods < ActiveRecord::Migration[6.0]
  def change
    create_table :moods do |t|
      t.string :name
      t.string :words
      t.string :emojis

    end
  end
end
