WebsocketRails::EventMap.describe do
  namespace :tickets do
    subscribe :create_ticket, :to => WebsocketController, :with_method => :create_ticket
    subscribe :update_ticket, :to => WebsocketController, :with_method => :update_ticket
    subscribe :delete_ticket, :to => WebsocketController, :with_method => :delete_ticket
  end
end
