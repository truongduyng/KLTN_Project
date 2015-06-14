class ChatController < WebsocketRails::BaseController
	  before_action :test, only: ['chat']
	  def initialize_session
	    # perform application setup here
	    controller_store[:message_count] = 0
	  end

	  def client_connected
	  	new_message = {:message => 'this is a message from client_connected'}
		send_message :hello, new_message
		# broadcast_message 'reply', message
	  end

	  def hello
	  	#B1: Lay du lieu dc gui den thong qua message hash
	  	incom_message = message[:title]
	  	#B2: tao du lieu gui di
	  	out_message = {title: incom_message + ", admin chao ban"}
	  	#C1: gui lai message thong qua su kien khac
	  	#B3: dung send_message de send phan hoi
	  	# send_message 'hello_reply', out_message

	  	#C2: Gui lai message thong trigger_success
	  	#trigger_success out_message

	  	#C3: Gui message hello toi tat ca client
	  	broadcast_message 'hello_reply', out_message
	  end

	  def chat
		broadcast_message 'reply', message
	  end

	  def test
	  	puts '--------------------------------- inside test chatController-------------------------'
	  end
end