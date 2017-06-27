class CreateLeads < ActiveRecord::Migration[5.1]
  def change
    create_table :leads do |t|
      t.string 'lead_name'
      t.timestamps
    end
  end
end
