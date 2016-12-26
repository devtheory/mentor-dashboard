class User < ApplicationRecord
  validates_presence_of :uid, :handle
  has_many :notes

  attr_encrypted :bloc_api_key, key: ENV['DA_KEY']

end
