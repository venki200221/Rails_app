# frozen_string_literal: true

# == Schema Information
#
# Table name: surveys_question_groups
#
#  survey_id                   :integer
#  rapidfire_question_group_id :integer
#  id                          :integer          not null, primary key
#  position                    :integer
#  created_at                  :datetime
#  updated_at                  :datetime
#

class SurveysQuestionGroup < ApplicationRecord
  acts_as_list scope: :survey
  belongs_to :rapidfire_question_group, class_name: 'Rapidfire::QuestionGroup'
  belongs_to :survey

  def self.by_position(survey_id)
    where(survey_id:).order('position asc')
  end

  def question_group
    Rapidfire::QuestionGroup.find_by(id: rapidfire_question_group_id)
  end

  def survey
    Survey.find_by(id: survey_id)
  end
end
