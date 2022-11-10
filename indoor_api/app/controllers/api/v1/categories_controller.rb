class Api::V1::CategoriesController < ApplicationController
  def index
    category = Category.all
    render json: category, status: 200
  end

  def show
    category = Category.find_by(id: params[:id])
    if category
      render json: category, status: 200
    else
      render json: {error: "Category Not Found"}
    end
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: 200
    else
      render json: {error: category.errors.full_messages}
    end
  end

  def update
    category = Category.find_by(id: params[:id])
    category.update(category_params)
    if category.save
      render json: category, status: 200
    else
      render json: {error: category.errors.full_messages}
    end

  end

  def destroy
    category = Category.find_by(id: params[:id])
    if category.destroy
      render json: {message: "Deleted Successfully"}, status: 200
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

end
