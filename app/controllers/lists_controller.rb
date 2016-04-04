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

  def update
    @list = List.find(params[:id])

    respond_to do |format|
      if @list.update( list_params )
        format.json { render json: @list.to_json }
      else
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end

  end

  def show
    @list = List.find(params[:id])
    respond_to do |format|
      format.json { render json: @list.to_json }
    end
  end

  def destroy
    @list = List.find(params[:id])

    respond_to do |format|
      if @list.destroy
        format.json { render json: @list }
      else
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end

  end

  private

  def list_params
    params.require(:list).permit(:board_id, :title, :description)
  end

end
