class TicketsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :check_normal_user, only: [:update, :destroy]

  def show
    tickets = Ticket.onday(ticket_param[:date],ticket_param[:branch_id])
    if tickets.present?
      render json: tickets, status: :ok
    else
      render json: nil
    end
  end

  def create
    byebug
    ticket = Ticket.new(ticket_param.merge(user_id: current_user.id))
    if ticket.valid?
      ticket.save
      render json: ticket, status: :created
    else
      render json: ticket.errors, status: :unprocessable_entity
    end
  end

  def update
    begin
      # byebug
      ticket = Ticket.where(id: ticket_param[:ticket_id]).first
      if (ticket_param.except(:ticket_id).length == 1 && ticket_param.except(:ticket_id).include?(:status))
        if ticket.update_attribute(:status, ticket_param.except(:ticket_id)[:status])
          render json: ticket, status: :ok
        else
          render json: ticket.errors, status: :unprocessable_entity
        end
      else
        if ticket.update_attributes(ticket_param.except(:ticket_id))
          render json: ticket, status: :ok
        else
          render json: ticket.errors, status: :unprocessable_entity
        end
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
      :branch_id, :asset_id, :customer_name, :customer_phone, :date)
  end
  def check_normal_user
    # byebug
    if (current_user.role_name == 'user')
      ticket = Ticket.where(id: ticket_param[:ticket_id]).first
      if (ticket.user_id != current_user.id || ticket.status != 'new')
        render json: {errors: "Khong the chinh sua ve cua nguoi khac"}
      end
    end
  end
end