class NotificationTemplate
	include Mongoid::Document
	#Html dc soan bang ckEditor de hien thi len trang thong bao
	field :content, type: String
	embedded_in :notification_category
end