class AuthorizationController < WebsocketRails::BaseController
  def authorize_channels
    if user_signed_in? || current_user.can_subcribe_channel?(message[:channel])
      WebsocketRails[message[:channel]].make_private
      accept_channel current_user
    else
     	deny_channel({:message => 'authorization failed!'})
    end
  end

  # def client_connected
  # 	new_message = {:message => 'this is a message from client_connected'}
  # 	send_message :hello, new_message
  # end

  # def on_subscribe
  #     WebsocketRails[:post].trigger(:on_subscribe_success, {message: 'in on subscribe'})
  # end

  # def on_subscribe_private
  #   WebsocketRails[:post].trigger(:on_subscribe_success, {message: 'in on subscribe private'})
  # end

end