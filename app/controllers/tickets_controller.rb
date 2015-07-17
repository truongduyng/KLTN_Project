class TicketsController < ApplicationController

  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :check_right_ticket, only: [:update, :destroy]
  before_action :check_bussiness_owner, only: [:update_status]

  def show
    # byebug
    @tickets = Ticket.onday(ticket_param[:date],ticket_param[:branch_id])
    if @tickets.present?

      @tickets.each do |ticket|
        if ticket.status == Ticket::Status[:new] && Time.now > ticket.begin_use_time + 10.minutes
          ticket.status = Ticket::Status[:over]
          ticket.save
        end

        if ticket.status == Ticket::Status[:doing] && Time.now > ticket.end_use_time
          ticket.status = Ticket::Status[:waiting]
          ticket.save
        end
      end

    else
      render nothing: true
    end
  end

  def create
    # byebug
    create_param = ticket_param
    bussiness_owner = Branch.find(ticket_param[:branch_id]).bussiness.user_id
    create_result = []

    while (create_param[:begin_use_time].to_time.to_i < create_param[:date_end_everyweek_booking].to_time.to_i)

      ticket =  Ticket.new(create_param.except(:date_end_everyweek_booking));

      if current_user.id != bussiness_owner
        if(create_param[:begin_use_time].to_time < Time.now)
          render json: ticket.errors, status: :unprocessable_entity
          return false
        end
        ticket.user = current_user
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
      # byebug
      puts @ticket
      if @ticket.update_attributes(ticket_param.except(:ticket_id))
        Fiber.new{WebsocketRails[@ticket.branch_id].trigger 'update_ticket', @ticket}.resume
        render json: @ticket, status: :ok
      else
        render json: @ticket.errors, status: :unprocessable_entity
      end

    rescue Exception => e
      render json: e, status: :unprocessable_entity
    end
  end

  def update_status
    begin
      if @ticket.update_attribute(:status, ticket_param[:status])
        Fiber.new{WebsocketRails[@ticket.branch_id].trigger 'update_ticket', @ticket}.resume
        render json: @ticket, status: :ok
      else
        render json: @ticket.errors, status: :unprocessable_entity
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
    if (current_user.id != @ticket.branch.bussiness.user_id)
      if (@ticket.user_id != current_user.id)
        render nothing: true, status: :bad_request, content_type: 'application/json'
      end
    end
  end

  def check_bussiness_owner
    # byebug
    @ticket = Ticket.find(ticket_param[:ticket_id])
    if (current_user.id != @ticket.branch.bussiness.user_id)
      render nothing: true, status: :bad_request, content_type: 'application/json'
    end
  end

end