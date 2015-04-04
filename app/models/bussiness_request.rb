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

	#callback
	before_create :init_status
	private
		#Gan gia tri chua duyet la mac dinh khi tao ra bussiness request
		def init_status
			self.status = BussinessRequestStatus.chua_duyet_status
		end
end
