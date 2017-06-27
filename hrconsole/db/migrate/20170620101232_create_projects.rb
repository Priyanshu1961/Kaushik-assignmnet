class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string 'project'
      t.timestamps
    end
  end
end
