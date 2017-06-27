class Skill < ApplicationRecord
  validates :skill, presence: true
  has_and_belongs_to_many :employees

end
