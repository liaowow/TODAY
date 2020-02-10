Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :entries, only: [:index, :show, :create, :update, :destroy]
  resources :moods, only: [:index]
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :quotes, only: [:index]

end
