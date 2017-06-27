class AddProjectIdToEmployees < ActiveRecord::Migration[5.1]
  def change
    add_reference :employees, :project, foreign_key: true
  end
end
