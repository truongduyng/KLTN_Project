module TicketHelper
  class TicketSocket < WebsocketRails::BaseController

    def self.send_success_message(ticket)
      send_message :create_success, ticket, :namespace => :tickets
    end

    def self.send_fail_message(ticket)
      send_message :create_fail, ticket, :namespace => :tickets
    end
  end
end
