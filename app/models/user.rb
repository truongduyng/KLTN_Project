class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable

  #callback
  before_create :set_default_role
  before_save :check_gender

  #relationships
  # belongs_to :role
  #do thay doi nen can thay check role o bussiness admin, co the dung 1 controller bussiness admin de lam dieu nay thay

  has_and_belongs_to_many :roles
  has_one :bussiness


  embeds_one :information
  has_many :tickets

  has_many :posts, class_name: 'Post', inverse_of: :user
  has_many :favorite_posts
  #Moi nguoi co the co nhieu yeu cau, boi vi neu 1 yeu cau ko dc chap thuan thi co the gui yeu cau khac
  has_many :bussiness_requests

  #notification system
  #1 nguoi co nhieu thong bao
  has_many :notifications, class_name: 'Notification', inverse_of: :target_user
  #1 nguoi co the trigger nhieu thong bao
  has_many :notification_change_triggers, class_name: 'NotificationChangeTrigger', inverse_of: :trigger_user
  #Nhung post dc theo doi
  has_and_belongs_to_many :followed_posts, class_name: 'Post', inverse_of: :followers
  #1 nguoi co nhieu image (test)
  has_many :images

  has_and_belongs_to_many :clubs, class_name: 'Club', inverse_of: :members
  has_many :clubposts, class_name: 'ClubPost', inverse_of: :user
  has_and_belongs_to_many :followed_clubposts, class_name: 'ClubPost', inverse_of: :followers

  has_many :branches

  #My field
  field :fullname, type: String
  field :username, type: String
  field :avatar, type: String
  field :gender, type: String #can cho nam hoac nu
  field :address, type: String
  field :phone, type: String
  field :description, type: String
  #for login facebook
  has_one :identity
  devise :omniauthable, :omniauth_providers => [:facebook]
  def self.from_omniauth(auth)
      # byebug
      identity = Identity.where(provider: auth.provider, uid: auth.uid).first
      #Neu da login it 1 lan thi lay nguoi dung do
      if identity
        user = identity.user
      else
        identity = Identity.create(provider: auth.provider, uid: auth.uid)
        #Neu chua login lan nao thi tao nguoi dung moi
        user = User.new
        user.password = Devise.friendly_token[0,20]
        ##BC
        # user.firstname = auth.info.first_name   # assuming the user model has a name
        # user.lastname = auth.info.last_name   # assuming the user model has a name
        user.fullname = auth.info.first_name + " " + auth.info.last_name
        ##EC
        user.username = auth.uid
        user.identity = identity
        user.save(validate: false)
        identity.save
      end
      return user
  end

  #Skip email validation in devise
  def email_required?
    super && identity.nil?
  end

  # #Cho xu ly gan avatar tu facebook vao avatar
  # def skip
  #  @skip || false
  # end
  # def skip_saving?
  #   @skip
  # end

  #Carrier wave
  mount_uploader :avatar, AvatarUploader

  # #Cho xu ly gan avatar tu facebook vao avatar
  # skip_callback :store_avatar!, if: :skip_saving?

  #My validation
  validates :username, :email, presence: true, uniqueness: true
  validates :fullname, presence: true
  validates :phone, presence: true
  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  ## index
  index({fullname: 1})

  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  #PUBLIC METHOD
  def is_system_admin?
      if self.roles
         if self.roles.where(name: 'system admin').first
            return true
         else
          return false
         end
      else
        return false
      end
  end

  def is_bussiness_admin?
      if self.roles
         if self.roles.where(name: 'bussiness admin').first
            return true
         else
          return false
         end
      else
        return false
      end
  end

  #Tao ra channel vs name la id cho moi user.
  #Do do nguoi dung chi co the subcribe toi channel ma co user.id == channel_name
  def can_subcribe_channel? channel_name

    if self.id == channel_name
      true
    else
      false
    end

  end

  private
    def set_default_role
      self.roles ||= []
      self.roles << Role.where(name: 'user').first
      # self.role ||= Role.where(name: 'user').first
    end

    def check_gender
      #Gender phai la nam hoac nu
      if !self.gender.nil? && (!self.gender.strip || self.gender != 'Nam' || self.gender != 'Nữ')
        self.gender = '';
      end

    end

end
