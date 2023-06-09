import React from 'react';
import PropTypes from 'prop-types';

// components
import Actions from './Actions/Actions.jsx';
import MyArticlesAssignmentLinks from './MyArticlesAssignmentLinks.jsx';

const isEnglishWikipedia = ({ assignment, course }) => () => {
  const { language, project } = assignment;
  const { home_wiki } = course;

  // If the assignment language and project match with English Wikipedia
  if (language === 'en' && project === 'wikipedia') return true;
  // Or the home wiki matches, return true
  if (
    home_wiki.language === 'en'
    && home_wiki.project === 'wikipedia'
    && typeof language === 'undefined'
  ) {
    return true;
  }

  // Otherwise, return false
  return false;
};

const isClassroomProgram = course => (course.type === 'ClassroomProgramCourse');

const unassign = ({ assignment, course, initiateConfirm, deleteAssignment }) => {
  const body = { course_slug: course.slug, ...assignment };
  const confirmMessage = I18n.t('assignments.confirm_deletion');
  const onConfirm = () => deleteAssignment(body);

  return () => initiateConfirm({ confirmMessage, onConfirm });
};

export const Header = ({
  article, articleTitle, assignment, course, current_user, isComplete, username,
  deleteAssignment, fetchAssignments, initiateConfirm, updateAssignmentStatus
}) => (
  <header aria-label={`${articleTitle} assignment`} className="header-wrapper">
    <MyArticlesAssignmentLinks
      articleTitle={articleTitle}
      project={article.project}
      assignment={assignment}
      courseType={course.type}
      current_user={current_user}
    />
    <Actions
      article={article}
      assignment={assignment}
      courseSlug={course.slug}
      current_user={current_user}
      isEnglishWikipedia={isEnglishWikipedia({ assignment, course })}
      isClassroomProgram={isClassroomProgram(course)}
      isComplete={isComplete}
      refreshAssignments={fetchAssignments}
      unassign={unassign({ assignment, course, initiateConfirm, deleteAssignment })}
      handleUpdateAssignment={updateAssignmentStatus}
      username={username}
    />
  </header>
);

Header.propTypes = {
  // props
  article: PropTypes.object.isRequired,
  articleTitle: PropTypes.string.isRequired,
  assignment: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  current_user: PropTypes.object.isRequired,
  isComplete: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  // actions
  deleteAssignment: PropTypes.func.isRequired,
  fetchAssignments: PropTypes.func.isRequired,
  initiateConfirm: PropTypes.func.isRequired,
  updateAssignmentStatus: PropTypes.func.isRequired,
};

export default Header;
