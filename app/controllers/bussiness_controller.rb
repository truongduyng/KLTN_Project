class BussinessController < ApplicationController
	layout 'application'
	def create
		respond_with Bussiness.create(bussiness_params.merge())
	end

	def show
		respond_with Bussiness.find(params[:id])
	end

	private
	def bussiness_params
		params.require(:bussiness).permit()
	end
end
