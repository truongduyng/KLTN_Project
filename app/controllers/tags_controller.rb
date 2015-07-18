class TagsController < ApplicationController
	# GET /tags.json
	def index
		@tags = Tag.all.to_a
		render json: @tags, status: :ok
	end
	
end