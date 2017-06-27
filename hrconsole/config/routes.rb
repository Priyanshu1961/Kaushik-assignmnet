Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'
  resources :skills , :employees , :leads
end
