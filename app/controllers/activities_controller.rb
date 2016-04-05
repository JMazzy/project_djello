class ActivitiesController < ApplicationController

  def create
    @activity = Activity.new( activity_params )
    respond_to do |format|
      if @activity.save
        format.json { render json: @activity.to_json }
      else
        format.json { render json: @activity.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def activity_params
    params.require(:activity).permit(:user_id, :card_id, :description)
  end

end
