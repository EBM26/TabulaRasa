class Task < ActiveRecord::Base
 #validates :name, :description, :est_complete_time, :complete_by, presence: true
  validates :name, uniqueness: true
  belongs_to :user
end
