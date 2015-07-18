class Tag
  include Mongoid::Document
  field :name, type: String

  validates :name, presence: true, length: {maximum: 50}
end

#admin se la nguoi quan ly danh sach tags