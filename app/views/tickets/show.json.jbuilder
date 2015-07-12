json.array! @tickets do |ticket|
  json.extract! ticket, :_id, :asset_id, :branch_id, :begin_use_time, :end_use_time, :customer_name, :customer_phone, :price, :status, :user_id
end