class AssetCategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :check_role_bussiness_admin
  before_action :find_asset_category, only: [:show, :update, :destroy]
	#Da test
	#/assetcategories.json
  def index
    bussiness_id = current_user.bussiness.id
    @asset_categories = AssetCategory.where(bussiness_id: bussiness_id).to_a
    render json: @asset_categories
  end

	#assetcategories/id.json
  def show
    render json: @asset_category
  end

  def create
    asset_category = AssetCategory.new(asset_category_params) do |ac|
      if params.has_key?(:fees) && !params[:fees].blank?
        params[:fees].each do |fee|
          ac.fees << Fee.new() do |f|
            f.begin_time = fee[:begin_time]
            f.end_time = fee[:end_time]
            f.price = fee[:price]
          end
        end
      end
    end

    if asset_category.save
      render json: asset_category, status: :created
    else
      render json: asset_category.errors, status: :unprocessable_entity
    end
  end

  def update
    result = @asset_category.update_attributes(asset_category_params)
    if result
      @asset_category.fees.destroy_all
      if params.has_key?(:fees) && !params[:fees].blank?
        params[:fees].each do |fee|
          @asset_category.fees << Fee.new() do |f|
            f.begin_time = fee[:begin_time]
            f.end_time = fee[:end_time]
            f.price = fee[:price]
          end
        end
      end

      render json: @asset_category, status: :ok
    else
      render json: @asset_category.errors, status: :unprocessable_entity
    end
  end

	#/asset_categories/:id.(:format)
  def destroy
    @asset_category.destroy
    render nothing: true, status: :ok, content_type: 'application/json'
  end


  private
  def asset_category_params
    params.require(:asset_category).permit(:name, :short_desc, :description, :branch_id)
  end

		#Da test
   def check_role_bussiness_admin
     if current_user.role.name == 'bussiness admin'
     else
      render json: {}, status: :not_found
    end
  end

  def find_asset_category
    begin
      @asset_category = AssetCategory.find(params[:id])
    rescue Mongoid::Errors::DocumentNotFound
      render nothing: true, status: :not_found, content_type: 'application/json'
    end
  end
end