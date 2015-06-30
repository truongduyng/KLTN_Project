class AuthorizationController < WebsocketRails::BaseController

  def authorize_channels
    puts "-----------------------current_user: #{current_user}------------------"
    if current_user.can_subcribe_channel?(message[:channel])
        WebsocketRails[message[:channel]].make_private
        accept_channel current_user
    else
      deny_channel({:message => 'authorization failed!'})
    end
  end

end