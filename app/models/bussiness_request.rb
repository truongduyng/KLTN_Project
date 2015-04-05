class BussinessRequest
	include Mongoid::Document
	include Mongoid::Timestamps
	
	field :name, type: String
	field :address, type: String
	field :category, type: String #Linh vuc
	field :description, type: String
	field :latitude, type: Float
	field :longitude, type: Float
	#relationship
	belongs_to :status, class_name: 'BussinessRequestStatus', inverse_of: :bussiness_requests
	belongs_to :user
	#Validate
	validates :name, presence: true
	validates :address, presence: true
	validates :category, presence: true
	validates :description, presence: true
	validates :latitude, presence: true
	validates :longitude, presence: true
	# validates :status_id, presence: true

	#Scope
	#Danh sach cac request chua duyet
	scope :chua_duyet, ->{
		chua_duyet_status = BussinessRequestStatus.chua_duyet_status
		self.where(status_id: chua_duyet_status.id)
	}

	#Method
	#Kiem tra 1 request co dc duyet chua
	def chua_duyet?
		if self.status.id ==  BussinessRequestStatus.chua_duyet_status.id
			return true
		else
			return false
		end
	end
	#callback
	before_create :init_status
	private
		#Gan gia tri chua duyet la mac dinh khi tao ra bussiness request
		def init_status
			self.status = BussinessRequestStatus.chua_duyet_status
		end
end
