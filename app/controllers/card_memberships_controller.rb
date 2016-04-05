class CardMembershipsController < ApplicationController

  def create
    @membership = CardMembership.new( cm_params )
    respond_to do |format|
      if @membership.save
        format.json { render json: @membership.to_json( include: :member ) }
      else
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end

  end


  def destroy
    @membership = CardMembership.find_by(
      card_id: params[:card_id],
      member_id: params[:member_id])
    respond_to do |format|
      if @membership.destroy
        format.json { render json: @membership.to_json( include: :member ) }
      else
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def cm_params

    params.require(:card_membership).permit(:card_id, :member_id)

  end

end
