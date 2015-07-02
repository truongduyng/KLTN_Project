class TicketsController < ApplicationController

  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :check_right_ticket, only: [:update, :destroy]

  def show
    # byebug
    tickets = Ticket.onday(ticket_param[:date],ticket_param[:branch_id])
    if tickets.present?
      render json: tickets, status: :ok
    else
      render json: nil
    end
  end

  def create
    create_param = ticket_param
    create_result = []
    while (create_param[:begin_use_time].to_time.to_i < create_param[:date_end_everyweek_booking].to_time.to_i)
      if (current_user.is_bussiness_admin?)
        ticket =  Ticket.new(create_param.except(:date_end_everyweek_booking));
      else
        ticket = Ticket.new(create_param.merge({user_id: current_user.id, customer_name: current_user.fullname, customer_phone: current_user.phone}).except(:date_end_everyweek_booking))
      end

      if ticket.valid?
        ticket.save
        create_result << ticket
      end
      create_param[:begin_use_time] = create_param[:begin_use_time].to_time + 7.days
      create_param[:end_use_time] = create_param[:end_use_time].to_time + 7.days
    end
    if create_result.length > 0
      Fiber.new{WebsocketRails[create_param[:branch_id]].trigger('create_ticket', create_result[0])}.resume
      render json: create_result[0], status: :created
    else
      render json: ticket.errors, status: :unprocessable_entity
    end
  end

  def update

    begin
      if (ticket_param.except(:ticket_id).length == 1 && ticket_param.except(:ticket_id).include?(:status))
        if @ticket.update_attribute(:status, ticket_param.except(:ticket_id)[:status])
          Fiber.new{WebsocketRails[@ticket.branch_id].trigger 'update_ticket', @ticket}.resume
          render json: @ticket, status: :ok
        else
          render json: @ticket.errors, status: :unprocessable_entity
        end
      else
        if @ticket.update_attributes(ticket_param.except(:ticket_id))
          Fiber.new{WebsocketRails[@ticket.branch_id].trigger 'update_ticket', @ticket}.resume
          render json: @ticket, status: :ok
        else
          render json: @ticket.errors, status: :unprocessable_entity
        end
      end
    rescue Exception => e
      render json: e, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      branch_id = @ticket.branch_id
      if @ticket.destroy
        Fiber.new{WebsocketRails[branch_id].trigger 'delete_ticket', ticket_param[:ticket_id]}.resume
        render nothing: true, status: :ok, content_type: 'application/json'
      else
        render nothing: true, status: :unprocessable_entity, content_type: 'application/json'
      end
    rescue Exception => e
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  private

  def ticket_param
    params.permit(:ticket_id, :begin_use_time, :end_use_time, :price, :status,
      :branch_id, :asset_id, :customer_name, :customer_phone, :date, :date_end_everyweek_booking)
  end

  def check_right_ticket

    @ticket = Ticket.find(ticket_param[:ticket_id])
    if (!current_user.is_bussiness_admin?)

      if (@ticket.user_id != current_user.id || @ticket.status != Ticket::Status[:new])
        render nothing: true, status: :unprocessable_entity, content_type: 'application/json'
      end
    else
      if (@ticket.status == Ticket::Status[:doing])
        render nothing: true, status: :unprocessable_entity, content_type: 'application/json'
      end
    end
  end

end