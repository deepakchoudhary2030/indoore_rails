class Api::V1::User::Worker::RequestsController < ApplicationController
  
  def create
    user = User.find_by(id: params[:worker_id])
    request = Request.new(user_id: @current_user.id, worker_id: params[:worker_id], status: false, UserName: @current_user.fname, UserLname: @current_user.lname ,WorkerName: user.fname, WorkerLname: user.lname)
    if request.save
      UserMailer.appointment_email(@current_user.email)
      render json: request, status: 200
    else
      render json: {error: "Something went wrong!!!!"}
    end
  end
  
  def show
    request = Request.where("user_id = ? or worker_id = ?", @current_user.id, @current_user.id)
    if request
      render json: request, status: 200
    else
      render json: {error: "No Request Found"}
    end
  end

  def update
    request = Request.find_by(id: params[:id])
    if request.update(status: params[:status])
      render json: request,  message: "Approved Sucessfully"
    else
      render json:{error: "Something went wrong!!!!"}
    end
  end

  def destroy
    request = Request.find(params[:id])
    if request.destroy
      render json: {message: "Deleted Successfully"}, status: 200
    end
  end

end