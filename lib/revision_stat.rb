# frozen_string_literal: true

#= Provides a count of recent revisions by a user(s)
class RevisionStat
  REVISION_TIMEFRAME = 7

  def self.get_records(date: RevisionStat::REVISION_TIMEFRAME.days.ago.to_date,
                       course:)
    Revision.where.not(article_id: course.articles_courses.not_tracked.pluck(:article_id))
            .where(user: course.students)
            .joins(article: { articles_courses: :course })
            .where(courses: { id: course.id })
            .where('date >= ?', date)
            .count
  end

  def self.recent_revisions_for_courses_user(courses_user)
    Revision.where
            .not(article_id: courses_user.course.articles_courses.not_tracked.pluck(:article_id))
            .where(user_id: courses_user.user_id)
            .where('date >= ?', REVISION_TIMEFRAME.days.ago.to_date)
  end
end
