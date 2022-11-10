class Api::V1::User::UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create, :category]
  def index
    user = User.all
    if user
      render json: user, status: 200
    else
      render json: {error: "error occurred while fetching users"}, status: :unprocessable_entity
    end
  end

  def category
    @user  = User.all
    @sort_users = []
    j = 0 
    k = 1
    @user.each do |i|
      if i.professions.include? params[:profession]
        if i.pincode === params[:pincode].to_i
          while j< k
            @sort_users[j] =  i
            j+=1
          end
          k+=1
        end
      end
    end
    if @sort_users.blank?
      render json: [], status: :unprocessable_entity
    else
      render json: @sort_users, status: 200
    end
  end

  def show
    params[:id] == "0" ? user = User.find_by(id: @current_user.id) : user = User.find_by(id: params[:id]) 
    if user
      render json: user, status: 200
    else
      render json: {error: "Something went wrong!!!!"}, status: :unprocessable_entity
    end
  end

  def create
    debugger
    user = User.new(user_params)
    if user.save
      UserMailer.welcome_email(user).deliver_later
      render json: user, status: 200
    else
      render json: {error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: @current_user.id)
    user.update(user_params)
    if user.save(validate: false)
      render json: user, status: 200
    else
      render json: {error: user.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def destroy
    user = User.find_by(id: params[:id])
    if user.destroy
      render json: {message: "Deleted Successfully"}, status: 200
    end
  end

  private
    def user_params
      params.require(:user).permit(:fname, :lname, :email, :pincode, :role, :address, :password, :city, :state,
      professions: [])
    end
end
