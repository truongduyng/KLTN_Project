class TicketsController < ApplicationController
  before_action :authenticate_user!

  def show
    tickets = Ticket.onday(ticket_param[:date],ticket_param[:branch_id])
    results = []
    if tickets.present?
      tickets.each do |ticket|
        results << {
            ticket_id: ticket.id,
            asset_id: ticket.asset_id,
            begin_use_time: ticket.begin_use_time,
            end_use_time: ticket.end_use_time,
            price: ticket.price,
            status: ticket.status,
            user_name: ticket.user.fullname,
            user_phone: ticket.user.phone
          }
      end
    end
    render json: results
  end

  def create
    ticket = Ticket.create(ticket_param.merge(user_id: current_user.id))
    if ticket.errors.blank?
      render json: {
            ticket_id: ticket.id,
            asset_id: ticket.asset_id,
            begin_use_time: ticket.begin_use_time,
            end_use_time: ticket.end_use_time,
            price: ticket.price,
            status: ticket.status,
            user_name: ticket.user.fullname,
            user_phone: ticket.user.phone
          }, status: :created
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  def update_status
    ticket = Ticket.where(id: ticket_param[:ticket_id])
    if ticket.update_attribute(status: ticket_param[:status])
      render json: ticket, status: :updated
    else
      render json: ticket.errors, status: :unprocessable_entity
    end
  end

  def update
    begin
      ticket = Ticket.where(id: ticket_param[:ticket_id])
      if ticket.update_attributes(ticket_param)
        render json: ticket, status: :updated
      else
        render json: ticket.errors, status: :unprocessable_entity
      end
    rescue Exception => e
      redirect_to 'show'
    end
  end

  private
  def ticket_param
    params.permit(:ticket_id, :begin_use_time, :end_use_time, :price, :status,
      :branch_id, :asset_id, :date)
  end
end