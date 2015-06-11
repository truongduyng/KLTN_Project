class Status
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia

  field :content, type: String

  belongs_to :club

  embeds_many :photos, as: :photoable
  belongs_to :user, class_name: 'User', inverse_of: :statuses

  has_many :comments, dependent: :destroy
  embeds_many :likes, as: :likeable

  #Notification system
  has_many :notifications, as: :notificable
  #trigger 1 thong bao nao (chap nhan hay tu choi bai viet)
  has_one :notification_change_trigger, as: :trigger_source
  #followers
  has_and_belongs_to_many :followers_status, class_name: 'User', inverse_of: :followed_statuses

  validates :content, presence: true

end
