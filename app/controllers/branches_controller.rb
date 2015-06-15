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
    @branch = Branch.find(branch_params[:id])
    if @branch
      render json: @branch, status: :ok
    else
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  def branch_details
    begin
      @branch_details= {}
      if branch = Branch.find_by(url_alias: branch_params[:branch_url_alias])
        @branch_details[:branch]= branch
        @branch_details[:asset_categories] = branch.asset_categories
        @branch_details[:assets] = branch.assets
        render json: @branch_details
      else
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    rescue Exception => e
      render nothing: true, status: :not_found, content_type: 'application/json'
    end


  end

  def search
    branches = Branch.search(branch_params)
    venues = Venue.search(branch_params)
    result = []
    # byebug
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
    if venues.present?
      venues.each do |venue|
        result << {
          lat: venue.coordinates[1],
          lng: venue.coordinates[0],
          picture:  "http://i.imgur.com/BBk3iBl.png",
          name: venue.name,
          address: venue.address,
          url: venue.url_alias
        }
      end
    end
    render json: result
  end

  #Cho them, xoa, sua branch
  #POST /branches.json
  def create

    @branch = Branch.new branch_params.except(*[:lat, :lng]).merge(coordinates: [branch_params[:lng], branch_params[:lat]])
    @branch.bussiness_id = current_user.bussiness.id

    if @branch.save
      render 'show.json.jbuilder', status: :created
    else
      render json: @branch.errors, status: :bad_request
    end
  end

  #PUT /branches/:id.json
  def update
    if @branch.update_attributes(branch_params.except(*[:lat, :lng]).merge(coordinates: [branch_params[:lng], branch_params[:lat]]))
      render 'show.json.jbuilder', status: :ok
    else
      render json: @branch.errors, status: :bad_request
    end
  end

  def destroy
    @branch.destroy
    render nothing: true, status: :ok, content_type: 'application/json'
  end


  private

  def branch_params
    params.permit(:id, :lat,:lng, :distance, :search_query, :branch_url_alias, :name, :phone, :address, :begin_work_time, :end_work_time, :url_alias)
  end

  def find_branch
    @branch = Branch.find(params[:id])
      #KO dc chinh sua chi nhanh cua nguoi khac
      if @branch.bussiness.id != current_user.bussiness.id
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    end

  #Da test
  def check_role_bussiness_admin
    if current_user.is_bussiness_admin?
    else
      render json: {}, status: :not_found
    end
  end

end