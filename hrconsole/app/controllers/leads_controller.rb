class LeadsController < ApplicationController
  def index
    @leads = Lead.all
  end

  def show
    @lead = Lead.find(params[:id])
    @emp_list_sorted = @lead.employees.sort {|a,b| b.skills.count <=> a.skills.count}
  end

  def new
  end

  def create
    @lead = Lead.new(lead_params)
    @lead.save
    redirect_to @lead
  end

  def destroy
  end

  private

  def lead_params
    params.require(:lead).permit(:lead_name, :employee_ids => [])
  end
end
