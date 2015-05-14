class TicketsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update_status, :update, :destroy]

  def show
    # byebug
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
      render json: results
    else
      render json: nil
    end

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

  def update
    begin
      # byebug
      ticket = Ticket.where(id: ticket_param[:ticket_id]).first
      if ticket.update_attributes(ticket_param.except(:ticket_id))
        render json: {
            ticket_id: ticket.id,
            asset_id: ticket.asset_id,
            begin_use_time: ticket.begin_use_time,
            end_use_time: ticket.end_use_time,
            price: ticket.price,
            status: ticket.status,
            user_name: ticket.user.fullname,
            user_phone: ticket.user.phone
          }, status: :ok
      else
        render json: ticket.errors, status: :unprocessable_entity
      end
    rescue Exception => e
      render json: e, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      ticket = Ticket.where(id: ticket_param[:ticket_id]).first
      if ticket.destroy
        render nothing: true, status: :ok, content_type: 'application/json'
      end
    rescue Exception => e
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  private
  def ticket_param
    params.permit(:ticket_id, :begin_use_time, :end_use_time, :price, :status,
      :branch_id, :asset_id, :date)
  end
end