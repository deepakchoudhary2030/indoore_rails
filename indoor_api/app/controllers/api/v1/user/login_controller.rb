class Api::V1::User::LoginController < ApplicationController
  before_action :authorize_request, except: :login

  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     fname: @user.fname }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: 422
    end
  end

  private
  def login_params
    params.permit(:email, :password)
  end
end
