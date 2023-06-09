# frozen_string_literal: true

# == Schema Information
#
# Table name: alerts
#
#  id             :integer          not null, primary key
#  course_id      :integer
#  user_id        :integer
#  article_id     :integer
#  revision_id    :integer
#  type           :string(255)
#  email_sent_at  :datetime
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  message        :text(65535)
#  target_user_id :integer
#  subject_id     :integer
#  resolved       :boolean          default(FALSE)
#  details        :text(65535)
#

# Alert for a survey response that meets conditions
# specified in the survey question. See SurveyResponseAlertManager.
class SurveyResponseAlert < Alert
  def main_subject
    "#{question_text_excerpt} - #{user.username}"
  end

  def url
    user_profile_url
  end

  private

  def question_text_excerpt
    question.question_text[0..100]
  end

  def question
    Rapidfire::Question.find subject_id
  end
end
