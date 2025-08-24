Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  get "/ielts/home"
  get "/ielts/exam-ielts"
  get "/ielts/exam-writing"
  get "/ielts/exam-writing-select"
  get "/ielts/exam-reading"
  get "/ielts/exam-reading-select"
  get "/ielts/exam-listening"
  get "/ielts/exam-listening-select"
  get "/ielts/exam-speaking"
  get "/ielts/exam-speaking-select"

  get "/practice/home"
  get "/practice/speaking"
  get "/practice/writing"
end
