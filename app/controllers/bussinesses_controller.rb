class BussinessesController < ApplicationController
  before_action :authenticate_user!

	#before for check role is bussissness admin
  before_action :check_role_bussiness_admin, only: [:update]

  def show
    render json: current_user.bussiness
  end

	#khi nang cap thanh role bussiness admin thi tao ra 1 bussiness
	#Chua test

  def new
		#nothing here, just for creating a url
    render 'layouts/application'
  end

  def create
    @bussiness = Bussiness.new(bussiness_params.merge(user_id: current_user.id))
    if @bussiness.save# render json: bussiness, status: :created
      respond_with @bussiness, status: :created, location: "/bussiness-admin#/"
    else
      render json: @bussiness.errors, status: :unprocessable_entity
    end
  end

  def update
    #create if current_user.bussiness = null
    if current_user.bussiness.update_attributes(bussiness_params)
      render json: current_user.bussiness, status: :ok
    else
      render json: current_user.bussiness.errors, status: :unprocessable_entity
    end
  end

  private
  def bussiness_params
    params.require(:bussiness).permit(:name, :category, :description)
  end

		#Da test
   def check_role_bussiness_admin
     if current_user.role.name == 'bussiness admin'
     else
      render json: {}, status: :not_found
    end
  end
end