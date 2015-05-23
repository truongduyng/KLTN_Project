class AssetsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_role_bussiness_admin
  before_action :check_asset_with_current_user, only: [:create]
  before_action :find_asset, only: [:show, :update, :destroy]
  def index
    assets = [];

    bussiness = current_user.bussiness
    bussiness.branches.each do |branch|
      assets << branch.assets
    end
    render json: assets
  end

	#chua kiem tra before_action
	#da test
	#/assets/:id.json
  def show
    @asset = Asset.find(params[:id])
  end

	#POST /assets.json
  def create
    @asset = Asset.new(asset_params)

    if @asset.save
      render :show, status: :created, location: @asset
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

	#PUT /assets/:id.json
  def update
    if @asset.update_attributes(asset_params)
      render :show, status: :ok, location: @asset
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @asset.destroy
    render nothing: true, status: :ok, content_type: 'application/json'
  end

	#/assets/get-assets-by-category.json
  def get_assets_by_category
    bussiness = current_user.bussiness
    @asset_categories = bussiness.asset_categories
  end

  private
  def asset_params
    params.require(:asset).permit(:name, :quantity, :description,:branch_id, :asset_category_id)
  end

  def check_role_bussiness_admin
    if current_user.role.name == 'bussiness admin'
    else
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  def check_asset_with_current_user
    begin
      bussiness = current_user.bussiness
      branch = Branch.find(params[:branch_id])
      asset_category  = AssetCategory.find(params[:asset_category_id])
      if bussiness.id != branch.bussiness.id || bussiness.id  != asset_category.bussiness.id
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    rescue Exception => e
      render json: {error: "branch_id and asset_category_id must not nil"}, status: :bad_request
    end
  end

  def find_asset
    begin
      @asset = Asset.find(params[:id])
      if @asset.branch.bussiness.id != current_user.bussiness.id
        render nothing: true, status: :not_found, content_type: 'application/json'
      end
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end
end