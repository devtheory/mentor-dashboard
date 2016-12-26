Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  get 'current_user', to: 'application#current_user'
  get 'request_token', to: 'tokens#request_token'
  get 'access_token', to: 'tokens#access_token'
  get 'get_students', to: 'dashboard#get_students'
  get 'bloc_notes', to: 'dashboard#get_bloc_notes'

  post 'bloc_notes', to: 'dashboard#write_bloc_note'

  resources :notes, only: [:index, :create, :show, :destroy]

  match '*all', to: 'application#index', via: [:get]
end
