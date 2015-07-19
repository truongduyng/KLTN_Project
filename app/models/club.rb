class Club
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :admins, type: Array

  has_and_belongs_to_many :members, class_name: "User", inverse_of: :clubs
  has_one :cover_image, class_name: 'Image'
  has_many :club_posts

  field :name_search, type: String
  field :description_search, type: String
  after_save :build_search_field

  index({name_search: "text", description_search: "text"}, {weights: {name_search: 10, description_search: 2}, name: "ClubIndex"})

  validates :name, presence: true

  protected
  def build_search_field
    if(self.name_search != RemoveAccent.remove_accent(self.name.downcase()) || self.description_search != RemoveAccent.remove_accent(self.description.downcase()))
      self.update_attributes(name_search: RemoveAccent.remove_accent(self.name.downcase()), description_search: RemoveAccent.remove_accent(self.description.downcase()))
    end
  end
end