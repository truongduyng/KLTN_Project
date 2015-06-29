class AuthorizationController < WebsocketRails::BaseController

  def authorize_channels
    if current_user
      if current_user.can_subcribe_channel?(message[:channel])
        WebsocketRails[message[:channel]].make_private
        accept_channel current_user
      end
    else
      deny_channel({:message => 'authorization failed!'})
    end
  end

end