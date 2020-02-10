class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, except: [:created_at, :updated_at]
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user, except: [:created_at, :updated_at]
    end

    def create
        user = User.create(
            username: params[:username],
            location: params[:location],
            first_name: params[:first_name],
            profile_pic: params[:profile_pic]
        )

        if user.valid?
            render json: user, except: [:created_at, :updated_at]
        else
            render json: { errors: user.errors.full_messages }, status: 400
        end
    end

    def update
        user = User.find_by(id: params[:id])
        user.update(
            username: params[:username],
            location: params[:location],
            first_name: params[:first_name],
            profile_pic: params[:profile_pic]
        )

        render json: user, except: [:created_at, :updated_at]
    end

    def destroy
        user = User.find_by(id: params[:id])
        user.destroy
    end
end