class List < ActiveRecord::Base
  belongs_to :board
  has_one :user, through: :board
  has_many :cards, dependent: :destroy
end
