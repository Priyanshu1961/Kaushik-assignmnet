class CreateJoinTableEmployeeSkill < ActiveRecord::Migration[5.1]
  def change
    create_join_table :employees, :skills do |t|
      # t.index [:employee_id, :skill_id]
      # t.index [:skill_id, :employee_id]
    end
  end
end
