class AssetsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_role_bussiness_admin
  before_action :check_asset_with_current_user, only: [:create]
  before_action :find_asset, only: [:show, :update, :destroy]

  def index

  end

  def show
    @asset = Asset.find(params[:id])
  end

	#POST /assets.json
  def create
    @asset = Asset.new(asset_params)

    if @asset.save
      render json: @asset, status: :created
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

	#PUT /assets/:id.json
  def update

    if @asset.update_attributes(asset_params)
      render json: @asset, status: :ok
    else
      render json: @asset.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @asset.destroy
    render nothing: true, status: :ok, content_type: 'application/json'
  end

  private
  def asset_params
    params.require(:asset).permit(:name, :description, :branch_id, :asset_category_id)
  end

  def check_role_bussiness_admin
    if current_user.role.name != 'bussiness admin'
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end

  def check_asset_with_current_user
    begin
      bussiness = current_user.bussiness
      branch = Branch.find(params[:branch_id])
      asset_category  = AssetCategory.find(params[:asset_category_id])
      if bussiness.id != branch.bussiness.id || branch.id  != asset_category.branch.id
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