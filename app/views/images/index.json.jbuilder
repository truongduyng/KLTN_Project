json.array! @all_images do |image|
	json.image image.image.url
	json.thumb image.image.large_thumb.url
end