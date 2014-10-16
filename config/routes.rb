Rails.application.routes.draw do
  root to: "static_pages#index"
  
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
end
