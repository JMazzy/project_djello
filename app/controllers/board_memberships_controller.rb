class BoardMembershipsController < ApplicationController

  def create
    @membership = BoardMembership.new( bm_params )
    respond_to do |format|
      if @membership.save
        format.json { render json: @membership.to_json( include: :member ) }
      else
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end

  end


  def destroy
    @membership = BoardMembership.find_by(
      board_id: params[:board_id],
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

  def bm_params

    params.require(:board_membership).permit(:board_id, :member_id)

  end

end
