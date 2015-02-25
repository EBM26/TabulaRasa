class User < ActiveRecord::Base
  validates :name, :email, :password_digest, presence: true
  validates :name, :email, :password_digest, uniqueness: true
  validates :password, length: {minimum: 6}

  has_many :tasks
  has_many :lists

  has_secure_password
end
