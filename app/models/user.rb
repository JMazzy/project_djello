class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :boards
  has_many :lists, through: :boards
  has_many :cards, through: :lists

  has_many :card_memberships, foreign_key: :member_id, dependent: :destroy
  has_many :member_cards, through: :card_memberships, class_name: "Card", source: :card

  has_many :board_memberships, foreign_key: :member_id
  has_many :member_boards, through: :board_memberships, class_name: "Board", source: :board

  has_many :activities, dependent: :destroy
  has_many :activity_cards, through: :activities, class_name: "Card", source: :card
end
