class SkillsController < ApplicationController
  def new
  end

  def index
    @skills = Skill.all
  end

  def create
    @skill = Skill.new(skill_params)
    @skill.save
    redirect_to @skill
  end

  def show
    @skill = Skill.find(params[:id])
  end

  private

  def skill_params
    params.require(:skill).permit(:skill, :employee_ids => [])
  end
end
