class AddBlocApiKeyToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :encrypted_bloc_api_key_iv, :string
    add_column :users, :encrypted_bloc_api_key, :string
  end
end
