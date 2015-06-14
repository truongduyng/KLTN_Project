class NotificationChangeTrigger
	include Mongoid::Document
	include Mongoid::Timestamps
	#Nguoi trigger ra thong bao
	belongs_to :trigger_user, class_name: 'User', inverse_of: :notification_change_triggers
	#Nguoi dung lam cai gi (comment bai viet) trigger thong bao
	belongs_to :trigger_source, polymorphic: true
	#Trigger nhieu notificaton change cua nhieu nguoi khac nhau
	#notification_change_ids:[] cho thay no trigger nhung notification change nao
	has_and_belongs_to_many :notification_changes, class_name: 'NotificationChange', inverse_of: :triggers


	def self.find_or_create trigger_user, trigger_source
		#B1: Kiem tra thi trigger ton tai hay chua
		trigger = NotificationChangeTrigger.where(trigger_user_id: trigger_user.id, trigger_source_id: trigger_source.id).first
		#B2: Neu chua co thi tao ra no
		if !trigger
			trigger = NotificationChangeTrigger.new
			trigger.trigger_user = trigger_user
			trigger.trigger_source = trigger_source
			trigger.save
		end
		#B3: tra ve
		return trigger
	end

	def add_notification_changes notification_change
		if self.notification_change_ids.include?(notification_change.id)
			self.notification_change_ids << notification_change.id
			self.save
		end
	end
end

#trigger_user_id
#trigger_source_id

#Tao ra document nay co id chinh la ket hop cua: trigger_user, trigger_source
#Xu ly truong hop ko co trigger source thi sao (cho system admin)
#5528e8be68757551790e0000
# notification_changes.where(id: '5528e8be68757551790e0000')


