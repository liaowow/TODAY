class User < ApplicationRecord
    has_many :entries
    has_many :moods, through: :entries
    has_many :quotes, through: :entries
end
