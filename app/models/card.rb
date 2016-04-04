class Card < ActiveRecord::Base
  belongs_to :list
  has_one :board, through: :list
  has_one :user, through: :board
  has_many :card_memberships, dependent: :destroy
  has_many :members, through: :card_memberships, class_name: "User"

  has_many :activities, dependent: :destroy
  has_many :activity_users, through: :activities, class_name: "User", source: :user
end
