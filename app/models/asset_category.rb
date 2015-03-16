class AssetCategory
	include Mongoid::Document
	field :name, type: String
	field :short_desc, type: String
	embedded_in: branch
	embeds_many: assets
	embeds_many: fees
end
