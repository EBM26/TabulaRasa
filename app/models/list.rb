class List < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :items, dependent: :destroy # dependent destroy allows items to be deleted with lists

  belongs_to :user


end
