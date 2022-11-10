class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'
  def welcome_email(user)
  @user = user
  @url = 'http://www.gmail.com'
  mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def appointment_email(user)
    @user = user
    mail(to: @user.email, subject: 'You Have Generated A New Appointment For Worker Name:-#{user}')
  end
end
