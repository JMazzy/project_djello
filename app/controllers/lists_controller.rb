class ListsController < ApplicationController

  def index
    @lists = List.all
  end

  def create
    @board = Board.find(params[:board_id])
    @list = @board.lists.build( list_params )
    respond_to do |format|
      if @list.save
        format.json { render json: @list.to_json }
      else
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @list = List.find(params[:list_id])
    @board = @list.board
    respond_to do |format|
      format.json { render json: @list.to_json }
    end
  end

  private

  def list_params
    params.require(:list).permit(:board_id, :title, :description)
  end

end
