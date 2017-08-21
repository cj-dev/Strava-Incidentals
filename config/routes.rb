Rails.application.routes.draw do
  get 'map/index'
  root 'map#index'
  get 'strava/segments/explore', to: 'strava/segments#explore'
  post 'strava/segments/explore', to: 'strava/segments#batch_explore'
  namespace :strava do
      resources :segments
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
