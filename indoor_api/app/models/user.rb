class User < ApplicationRecord
  require "securerandom"
  # has_secure_password
  has_many :request
  has_many :ratting
  validates :email, presence: true, length: {maximum: 255}, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
  validates :pincode, presence:true, length: {minimum:6, maximum:6}
  validates :password, length: {minimum:5, maximum:7}   
end
