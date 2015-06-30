WebsocketRails::EventMap.describe do

  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.

  # subscribe :client_connected, :to => ChatController, :with_method => :client_connected
  # namespace :chat do
  #     subscribe :hello, :to => ChatController, :with_method => :hello
  #     subscribe :chat, :to => ChatController, :with_method => :chat

  # end

  #for private channel
  # subscribe :client_connected, :to => AuthorizationController, :with_method => :client_connected
  #Channel notifications cho thong bao la private
  # private_channel :notifications

  namespace :websocket_rails do
    subscribe :subscribe_private, :to => AuthorizationController, :with_method => :authorize_channels
  end

  # namespace :websocket_rails do
  #     subscribe :subscribe, :to => AuthorizationController, :with_method => :on_subscribe
  #     subscribe :subscribe_private, :to => AuthorizationController, :with_method => :on_subscribe_private
  # end

  namespace :tickets do
    subscribe :create_ticket, :to => WebsocketController, :with_method => :create_ticket
    subscribe :update_ticket, :to => WebsocketController, :with_method => :update_ticket
    subscribe :delete_ticket, :to => WebsocketController, :with_method => :delete_ticket
  end
end
