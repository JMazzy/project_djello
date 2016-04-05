class StaticPagesController < ApplicationController

  before_action :authenticate_user!

  def index
    if user_signed_in?

    else
      redirect_to new_user_session_path
    end
  end

end
