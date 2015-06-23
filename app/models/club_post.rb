class ClubPost
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  field :content, type: String

  has_and_belongs_to_many :followers, class_name: 'User', inverse_of: :followed_clubposts, dependent: :destroy

  embeds_many :photos, as: :photoable
  has_many :comments, dependent: :destroy
  embeds_many :likes, as: :likeable

  #Notification system
  has_many :notifications, as: :notificable, dependent: :destroy
  #trigger 1 thong bao nao (chap nhan hay tu choi bai viet)
  has_one :notification_change_trigger, as: :trigger_source, dependent: :destroy
  #followers

  belongs_to :club
  belongs_to :user, class_name: 'User', inverse_of: :clubposts

  validates :content, presence: true

end
