class Rate
	include Mongoid::Document

	field :level, type: Integer
	belongs_to :user
	embedded_in :venue, class_name: 'Branch', inverse_of: :rate

	validates :level, presence: true


	#Co 5 muc do rate tu xau den tuyet voi
	LEVELS = [1, 2, 3, 4, 5]

	validate :check_level

	def check_level
		# byebug
		if !LEVELS.include? level
			errors.add(:level, "level not in range")
			return false
		end
	end
end