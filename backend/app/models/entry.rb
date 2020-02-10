class Entry < ApplicationRecord
    belongs_to :user
    belongs_to :mood
    belongs_to :quote, optional: true
end
