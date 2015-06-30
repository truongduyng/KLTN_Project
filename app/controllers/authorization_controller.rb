class AuthorizationController < WebsocketRails::BaseController

  def authorize_channels
    # puts "#{user_signed_in?}-----------------------current_user: #{current_user}---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
    # if user_signed_in? || current_user.can_subcribe_channel?(message[:channel])
    #     WebsocketRails[message[:channel]].make_private
    #     accept_channel current_user
    # else
    #   deny_channel({:message => 'authorization failed!'})
    # end

    deny_channel({:message => "#{user_signed_in?}-----#{session["warden.user.user.key"][0]}-----authorization failed!"})
  end

end