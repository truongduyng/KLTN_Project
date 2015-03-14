json.array!(@assest_categories) do |ac|
	json.extract! ac, :_id, :name, :fees	
	
	json.assests do 
		json.array!(ac.assests) do |assest|
		  	json.extract! assest, :_id, :name, :quantity
		  	json.branch do
		  		json.extract! assest.branch, :_id, :name, :address, :latitude, :longtitude
		  	end
		end
	end
  
end
