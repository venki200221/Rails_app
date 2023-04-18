import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import StatisticsUpdateModal from './statistics_update_modal';
import { getUpdateMessage } from '../../utils/statistic_update_info_utils';

const StatisticsUpdateInfo = createReactClass({
  displayName: 'StatisticsUpdateInfo',

  propTypes: {
    course: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      showModal: false
    };
  },

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  },

  render() {
    const course = this.props.course;
    if (Features.wikiEd && !course.ended) {
      return <div />;
    }

    const [lastUpdateMessage, nextUpdateMessage, isNextUpdateAfter] = getUpdateMessage(course);

    if (this.state.showModal) {
      return (
        <StatisticsUpdateModal
          course={course}
          isNextUpdateAfter={isNextUpdateAfter}
          nextUpdateMessage={nextUpdateMessage}
          toggleModal={this.toggleModal}
        />
      );
    }

    const updateTimesMessage = isNextUpdateAfter ? `${lastUpdateMessage} ${nextUpdateMessage} ` : `${lastUpdateMessage} `;

    // Render update time information and if some updates were made a 'See More' link to open modal
    return (
      <div className="statistics-update-info pull-right mb2">
        <small>
          {updateTimesMessage} {(course.flags.first_update || course.flags.update_logs) && <a onClick={this.toggleModal} href="#">{I18n.t('metrics.update_statistics_link')}</a>}
        </small>
      </div>
    );
  }
});

export default StatisticsUpdateInfo;
