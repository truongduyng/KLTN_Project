class WebsocketController < WebsocketRails::BaseController

  def create_ticket
    ticket = message();
    WebsocketRails[ticket[:branch_id][:$oid]].trigger 'create_ticket', ticket
  end

  def update_ticket
    ticket = message();
    WebsocketRails[ticket[:branch_id][:$oid]].trigger 'update_ticket', ticket
  end

  def delete_ticket
    ticket = message();
    WebsocketRails[ticket[:branch_id][:$oid]].trigger 'delete_ticket', ticket
  end

end