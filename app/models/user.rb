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
  #embeds_one :information 
  has_one :bussiness
  has_many :posts
  has_many :favorite_posts
  #Moi nguoi co the co nhieu yeu cau, boi vi neu 1 yeu cau ko dc chap thuan thi co the gui yeu cau khac
  has_many :bussiness_requests
  
  #notification system
  #1 nguoi co nhieu thong bao
  has_many :notifications, class_name: 'Notification', inverse_of: :target_user
  #1 nguoi co the trigger nhieu thong bao
  has_many :trigger_notifications, class_name: 'NotificationChange', inverse_of: :trigger_user
  
  #My field
  field :firstname, type: String
  field :lastname, type: String
  field :username, type: String
  field :avatar, type: String
  field :gender, type: String #can cho nam hoac nu
  field :address, type: String
  field :phone, type: String
  field :description, type: String

  #Carrier wave
  mount_uploader :avatar, AvatarUploader
  
  #My validation
  validates :username, presence: true, uniqueness: true
  validates :firstname, presence: true
  validates :lastname, presence: true
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

  private
    def set_default_role
      #chua test cho nay
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
