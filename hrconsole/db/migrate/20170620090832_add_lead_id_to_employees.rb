class AddLeadIdToEmployees < ActiveRecord::Migration[5.1]
  def change
    add_reference :employees, :lead, foreign_key: true
  end
end
