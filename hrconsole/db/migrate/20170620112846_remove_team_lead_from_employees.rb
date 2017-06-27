class RemoveTeamLeadFromEmployees < ActiveRecord::Migration[5.1]
  def change
    remove_column :employees, :team_lead, :string
  end
end
