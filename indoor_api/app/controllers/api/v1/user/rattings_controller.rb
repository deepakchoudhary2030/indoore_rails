class Api::V1::User::RattingsController < ApplicationController
  def index
    ratting = Ratting.all
    render json: ratting, status: 200
  end

  def show
    ratting = Ratting.where('worker_id = ?', params[:id])
    if ratting
      render json: ratting, status: 200
    else
      render json: {error: "Ratting Not Found"}
    end
  end

  def create
    ratting = Ratting.new(worker_id: params[:worker_id], fname: @current_user.fname, lname: @current_user.lname, ratting: params[:ratting], comment: params[:comment])
    if ratting.save
      render json: ratting, status: 200
    else
      render json: {error: ratting.errors.full_messages}
    end
  end

  def update
    ratting = Ratting.find_by(id: params[:id])
    ratting.update(Ratting_params)
    if ratting.save
      render json: ratting, status: 200
    else
      render json: {error: Ratting.errors.full_messages}
    end

  end

  def destroy
    ratting = Ratting.find_by(id: params[:id])
    if ratting.destroy
      render json: {message: "Deleted Successfully"}, status: 200
    end
  end

 
end
