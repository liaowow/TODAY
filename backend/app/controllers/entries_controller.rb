class EntriesController < ApplicationController
    def index
        entries = Entry.all
        render json: entries
    end

    def show
        entry = Entry.find_by(id: params[:id])
        render json: entry
    end

    def create
        entry = Entry.create(
            title: params[:title],
            content: params[:content],
            current_mood: params[:current_mood],
            image: params[:image],
            song: params[:song],
            user_id: params[:user_id],
            mood_id: params[:mood_id],
            quote_id: params[:quote_id]
        )

        if entry.valid?
            render json: entry
        else
            render json: { errors: entry.errors.full_messages }, status: 400
        end
    end

    def update
        entry = Entry.find_by(id: params[:id])
        entry.update(
            title: params[:title],
            content: params[:content],
            current_mood: params[:current_mood],
            image: params[:image],
            song: params[:song],
            mood_id: params[:mood_id],
            quote_id: params[:quote_id]
        )

        render json: entry
    end

    def destroy
        entry = Entry.find_by(id: params[:id])
        entry.destroy
    end
end