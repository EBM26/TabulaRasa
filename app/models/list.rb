class List < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :items, dependent: :destroy

  belongs_to :user


end
