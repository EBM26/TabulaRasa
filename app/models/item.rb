class Item < ActiveRecord::Base

    validates :name, presence: true
    validates :name, uniqueness: true

    belongs_to :list
end
