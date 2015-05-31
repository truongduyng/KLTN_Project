class BranchesController < ApplicationController
  before_action :authenticate_user!, only: [:index,:show, :create, :update, :destroy, :list_branch_names]
  before_action :check_role_bussiness_admin, only: [:index, :show,:create, :update, :destroy, :list_branch_names]
  before_action :find_branch, only: [:update, :destroy]

	#/branches.json
  def index
    @branches = current_user.bussiness.branches
    render json: @branches
  end

  def list_branch_names
    @branches = current_user.bussiness.branches
  end

  def show
    @branch = Branch.where(id: branch_param[:id])
    if @branch.first
      render json: @branch, status: :ok
    else
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  def branch_details
    # byebug
    @branch_details= {}
    branch = Branch.where(url_alias: branch_param[:branch_url_alias]).first
    if branch.present?
      @branch_details[:branch]= branch
      @branch_details[:asset_categories] = branch.asset_categories
      @branch_details[:assets] = branch.assets
      render json: @branch_details
    else
      render nothing: true, status: :not_found, content_type: 'application/json'
    end

  end

  def search
    branches = Branch.search(branch_param)
    result = []
    if branches.present?
      branches.each do |branch|
        result << {
          lat: branch.coordinates[1],
          lng: branch.coordinates[0],
          picture:  "http://i.imgur.com/BBk3iBl.png",
          name: branch.name,
          address: branch.address,
          url: branch.url_alias
        }
      end
    end
    render json: result
  end


  #Cho them, xoa, sua branch
  #POST /branches.json
  def create
    @branch = Branch.new branch_params
    @branch.bussiness_id = current_user.bussiness.id
    if @branch.save
      render 'show.json.jbuilder', status: :created
    else
      render json: @branch.errors, status: :bad_request
    end
  end

  #PUT /branches/:id.json
  def update
    if @branch.update_attributes(branch_params)
      @branch.coordinates = branch_params[:coordinates]
      if @branch.save
        render 'show.json.jbuilder', status: :ok
      else
        render json: @branch.errors, status: :bad_request
      end
    else
      render json: @branch.errors, status: :bad_request
    end
  end

  def destroy
    @branch.destroy
    render nothing: true, status: :ok, content_type: 'application/json'
  end


  private
    #CODE CUA TRUNG
    def branch_params
        my_params = params.permit(:name, :address, :phone, :latitude, :longitude, :url_alias)
        coordinates = [my_params[:longitude], my_params[:latitude]]
        my_params.delete :latitude
        my_params.delete :longitude
        my_params[:coordinates] = coordinates
        my_params
    end

    def find_branch
      @branch = Branch.find(params[:id])
      #KO dc chinh sua chi nhanh cua nguoi khac
      if @branch.bussiness.id != current_user.bussiness.id
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    end

    #CODE CUA DUY
    def branch_param
      params.permit(:id, :lat,:lng, :distance, :search_query, :branch_url_alias)
    end
  	#Da test
    def check_role_bussiness_admin
      if current_user.role.name == 'bussiness admin'
      else
       render json: {}, status: :not_found
     end
   end

end