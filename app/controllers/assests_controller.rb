class AssestsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_role_bussiness_admin
  before_action :check_assest_with_current_user, only: [:create]
  before_action :find_assest, only: [:show, :update, :destroy]
  def index
    assests = [];

    bussiness = current_user.bussiness
    bussiness.branches.each do |branch|
      assests << branch.assests
    end
    render json: assests
  end

	#chua kiem tra before_action
	#da test
	#/assests/:id.json
  def show
    @assest = Assest.find(params[:id])
  end

	#POST /assets.json
  def create
    @assest = Assest.new(assest_params)

    if @assest.save
      render :show, status: :created, location: @assest
    else
      render json: @assest.errors, status: :unprocessable_entity
    end
  end

	#PUT /assests/:id.json
  def update
    if @assest.update_attributes(assest_params)
      render :show, status: :ok, location: @assest
    else
      render json: @assest.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @assest.destroy
    render nothing: true, status: :ok, content_type: 'application/json'
  end

	#/assests/get-assests-by-category.json
  def get_assests_by_category
    bussiness = current_user.bussiness
    @assest_categories = bussiness.assest_categories
  end

  private
  def assest_params
    params.require(:assest).permit(:name, :quantity, :description,:branch_id, :assest_category_id)
  end

  def check_role_bussiness_admin
    if current_user.role.name == 'bussiness admin'
    else
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  def check_assest_with_current_user
    begin
      bussiness = current_user.bussiness
      branch = Branch.find(params[:branch_id])
      assest_category  = AssestCategory.find(params[:assest_category_id])
      if bussiness.id != branch.bussiness.id || bussiness.id  != assest_category.bussiness.id
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    rescue Exception => e
      render json: {error: "branch_id and assest_category_id must not nil"}, status: :bad_request
    end
  end

  def find_assest
    begin
      @assest = Assest.find(params[:id])
      if @assest.branch.bussiness.id != current_user.bussiness.id
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end
end