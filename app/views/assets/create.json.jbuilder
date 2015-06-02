json._id @asset.id
json.name @asset.name
json.description @asset.description

json.asset_category do
  json._id @asset.asset_category.id
  json.name @asset.asset_category.name
end
