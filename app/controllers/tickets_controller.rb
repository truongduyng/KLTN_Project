class TicketsController < ApplicationController
  before_action :authenticate_user!

  def show
    tickets = Ticket.onday(ticket_param[:date],ticket_param[:branch_id])
    render json: tickets
  end

  def create
    ticket = Ticket.create(ticket_param.merge(user_id: current_user.id))
    # byebug
    if ticket.errors.blank?
      render json: ticket, status: :created
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  private
  def ticket_param
    params.permit(:begin_use_time, :end_use_time, :price, :status,
      :branch_id, :asset_id, :date)
  end
end