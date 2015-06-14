class FeesController < ApplicationController
  before_action :authenticate_user!
  before_action :check_assest_category_with_user

  def create
    fee = @assest_category.fees.create() do |fee|
      if(fees_params.has_key?(:begin_time))
        fee.begin_time = Time.parse(fees_params[:begin_time])
      end

      if(fees_params.has_key?(:end_time))
        fee.end_time = Time.parse(fees_params[:end_time])
      end

      if(fees_params.has_key?(:price))
        fee.price = fees_params[:price]
      end
    end

    if fee.errors.blank?
      render json: fee, status: :created
    else
      render json: @fee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      @assest_category.fees.find(params[:id]).destroy
      render json: {}, status: :ok
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  private
  def check_assest_category_with_user
    begin
      @assest_category = AssestCategory.find(params[:assest_category_id])
      if @assest_category.bussiness.user.id != current_user.id
        render json: {}, status: :not_found
      end
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  def fees_params
    params.require(:fee).permit(:begin_time, :end_time, :price)
  end
end
