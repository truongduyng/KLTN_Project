class StatusesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :add_photo, :like, :unlike, :destroy, :follow, :unfollow]

  def create
    @status = Status.new(post_params)
    @status.user = current_user
    if @status.save
      render :show, status: :created, location: @status
    else
      render json: @status.errors, status: :unprocessable_entity
    end
  end

end
