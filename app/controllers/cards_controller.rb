class CardsController < ApplicationController

  def create
    @list = List.find(params[:list_id])

    @card = @list.cards.build( card_params )

    respond_to do |format|
      if @card.save
        format.json { render json: @card.to_json }
      else
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @card = Card.find(params[:id])

    respond_to do |format|
      if @card.update( card_params )
        format.json { render json: @card }
      else
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @card = Card.find(params[:id])

    respond_to do |format|
      if @card.destroy
        format.json { render json: @card }
      else
        format.json { render json: @card.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def card_params
    params.require(:card).permit(:list_id, :title, :description)
  end

end
