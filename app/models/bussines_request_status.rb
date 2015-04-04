class BussinessRequestStatus
	field :name, type: String
	validates_uniqueness_of :name
	has_many :bussiness_requests, class_name: :BussinessRequest, inverse_of: :status
end