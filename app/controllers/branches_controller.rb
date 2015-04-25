class BranchesController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show]
  before_action :check_role_bussiness_admin, only: [:index]

	#/branches.json
  def index
    @branches = current_user.bussiness.branches
    render json: @branches
  end

  def show
    @branch = current_user.bussiness.branches.where(name: branch_param[:branch_name])
    render json: @branch
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
          url: "link to branch"
        }
      end
    end
    render json: result
  end

  private
  def branch_param
    params.permit(:lat,:lng, :distance, :branch_name, :search_query)
  end
	#Da test
  def check_role_bussiness_admin
    if current_user.role.name == 'bussiness admin'
    else
     render json: {}, status: :not_found
   end
 end
end