class Employee < ApplicationRecord
  has_and_belongs_to_many :skills
  belongs_to :lead
  belongs_to :project
  validates :name, presence: true
end
