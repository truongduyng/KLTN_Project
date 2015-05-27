source 'https://rubygems.org'

ruby '2.1.5'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'

gem 'mongoid'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
#gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :production do
	gem 'rails_12factor'
	gem 'unicorn'
	gem 'thin'
end

gem 'angular-rails-templates'
gem 'angular_rails_csrf'
gem 'devise'
# #for strong parameters with complex object
# gem 'strong_parameters'
#for upload file
gem 'angularjs-file-upload-rails', '~> 1.1.6'
# gem 'carrierwave'
gem 'mongoid-grid_fs', github: 'ahoward/mongoid-grid_fs'
gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'
gem 'mini_magick'

#for paranoia
gem 'mongoid_paranoia'

#for paginate voi mongoid
gem 'will_paginate_mongoid'
gem 'will_paginate', '~> 3.0.6'


#For websocket 
gem 'websocket-rails'

gem 'ckeditor'
#for login facebok
gem 'omniauth-facebook'