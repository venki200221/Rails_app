import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';

import { initiateConfirm } from '../../../actions/confirm_actions';
import { randomPeerAssignments } from '../../../actions/assignment_actions';
import { REVIEWING_ROLE } from '../../../constants';
import ArticleUtils from '../../../utils/article_utils';

const RandomPeerAssignButton = createReactClass({
  displayName: 'RandomPeerAssignButton',

  propTypes: {
    randomPeerAssignments: PropTypes.func,
    course: PropTypes.object,
    current_user: PropTypes.object,
    initiateConfirm: PropTypes.func
  },

  randomPeerAssign() {
    const peerReviewCount = this.props.course.peer_review_count || 1;
    const currentlyReviewing = this.props.assignments.filter(assignment => assignment.role === REVIEWING_ROLE).length;
    const randomAssignmentsCount = (this.props.students.length * peerReviewCount) - currentlyReviewing;

    let confirmMessage;
    let onConfirm;
    if (randomAssignmentsCount <= 0) {
      confirmMessage = I18n.t(`assignments.random_peer_review.${ArticleUtils.projectSuffix(this.props.course.home_wiki.project, 'limit_exceeded')}`, { maximum: peerReviewCount });
      onConfirm = () => {};
    } else {
      confirmMessage = I18n.t(`assignments.random_peer_review.${ArticleUtils.projectSuffix(this.props.course.home_wiki.project, 'confirm_addition')}`, { count: randomAssignmentsCount, maximum: peerReviewCount });
      onConfirm = () => this.props.randomPeerAssignments({ course_slug: this.props.course.slug });
    }

    this.props.initiateConfirm({ confirmMessage, onConfirm });
  },

  render() {
    if (!this.props.current_user.isAdvancedRole) {
      return <div/>;
    }

    return (
      <div className="tooltip-trigger">
        <button className="button border small assign-button" onClick={this.randomPeerAssign}>
          {I18n.t('assignments.random_peer_review.heading')} {<span className="tooltip-indicator" />}
        </button>
        <div className="tooltip">
          <p>
            {I18n.t(`assignments.random_peer_review.${ArticleUtils.projectSuffix(this.props.course.home_wiki.project, 'tooltip_message')}`)}
          </p>
        </div>
      </div>
    );
  }
}
);

const mapDispatchToProps = {
  randomPeerAssignments,
  initiateConfirm
};

export default connect(null, mapDispatchToProps)(RandomPeerAssignButton);
