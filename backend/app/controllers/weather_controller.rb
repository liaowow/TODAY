class WeatherController < ApplicationController
    def show
        # byebug
        response = RestClient.get "https://api.darksky.net/forecast/#{ENV['DARK_SKY_API_KEY']}/#{params[:latitude]},#{params[:longitude]}"
        weather = JSON.parse(response)
        render json: { icon: weather["currently"]["icon"] }
      end
end