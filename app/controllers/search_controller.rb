class SearchController < ApplicationController
  include RemoveAccent
  def search

    branches = Branch.search(params[:search_query])
    posts = Post.published.desc(:updated_at).text_search(RemoveAccent.remove_accent(params[:search_query].downcase()))
    clubs = Club.text_search(RemoveAccent.remove_accent(params[:search_query].downcase()))
    results = {}
    results[:branches] = []
    results[:posts] = []
    results[:clubs] = []
    # byebug
    if branches.present?
      branches.each do |branch|
        results[:branches] << {
          lat: branch.coordinates[1],
          lng: branch.coordinates[0],
          picture:  "http://i.imgur.com/BBk3iBl.png",
          name: branch.name,
          address: branch.address,
          url: branch.url_alias,
          isvenue: branch.user_id != nil
        }
      end
    end
    if posts.present?
      posts.each do |post|
        results[:posts] << {
          _id: post.id,
          title: post.title,
          body: post.body,
          photos: post.photos,
          user: post.user,
          updated_at: post.updated_at,
          created_at: post.created_at
        }
      end
    end
    if clubs.present?
      clubs.each do |club|
        results[:clubs] << {
          id: club.id,
          name: club.name,
          description: club.description
        }
      end
    end
    render json: results
  end

end