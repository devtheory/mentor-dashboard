class CreateOauths < ActiveRecord::Migration[5.0]
  def change
    create_table :oauths do |t|
      t.string :token
      t.string :secret

      t.timestamps
    end
  end
end
