import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ByStudentsStats from './by_students_stats.jsx';
import StudentStats from './student_stats.jsx';
import CoursesTaughtGraph from './graphs/as_instructor_graphs/courses_taught_graph.jsx';
import StudentsTaughtGraph from './graphs/as_instructor_graphs/students_taught_graph.jsx';
import Loading from '../common/loading.jsx';

const InstructorStats = createReactClass({
  propTypes: {
    username: PropTypes.string,
    stats: PropTypes.object,
    isStudent: PropTypes.bool,
    statsGraphsData: PropTypes.object,
    graphWidth: PropTypes.number,
    graphHeight: PropTypes.number,
    maxProject: PropTypes.string
  },

  getInitialState() {
    return {
      selectedGraph: 'courses_count',
      coursesGraph: true
    };
  },

  setCoursesCountGraph() {
    this.setState({
      selectedGraph: 'courses_count',
      coursesGraph: true
    });
  },

  setStudentsCountGraph() {
    this.setState({
      selectedGraph: 'students_count',
      coursesGraph: false
    });
  },

  render() {
    let asStudent;
    let statsVisualizations;
    const byStudents = (
      <ByStudentsStats
        username = {this.props.username}
        stats={this.props.stats.by_students}
        maxProject={this.props.maxProject}
      />
    );
    if (this.state.selectedGraph === 'courses_count') {
      if (this.props.statsGraphsData != null) {
        statsVisualizations = (
          <CoursesTaughtGraph
            statsData = {this.props.statsGraphsData.instructor_stats}
            graphWidth = {this.props.graphWidth}
            graphHeight = {this.props.graphHeight}
            courseStringPrefix = {this.props.stats.as_instructor.course_string_prefix}
          />
         );
      } else {
        statsVisualizations = <Loading />;
      }
    } else if (this.state.selectedGraph === 'students_count') {
      statsVisualizations = (
        <StudentsTaughtGraph
          statsData = {this.props.statsGraphsData.student_count}
          graphWidth = {this.props.graphWidth}
          graphHeight = {this.props.graphHeight}
          courseStringPrefix = {this.props.stats.as_instructor.course_string_prefix}
        />
       );
    }
    if (this.props.isStudent) {
      asStudent = (
        <StudentStats
          username = {this.props.username}
          stats={this.props.stats.as_student}
          maxProject = {this.props.maxProject}
        />
      );
    }
    return (
      <div className= "user_stats">
        <div id = "instructor-profile-stats">
          <h5>
            {I18n.t('user_profiles.instructor_impact', { username: this.props.username })}
          </h5>
          <div className= "stat-display">
            <div onClick={this.setCoursesCountGraph} className={`stat-display__stat button${this.state.coursesGraph ? ' active-button' : ''}`}>
              <div className="stat-display__value">
                {this.props.stats.as_instructor.courses_count}
              </div>
              <small>
                {I18n.t(`${this.props.stats.as_instructor.course_string_prefix}.courses_taught`)}
              </small>
            </div>
            <div onClick={this.setStudentsCountGraph} className ={`stat-display__stat tooltip-trigger button${this.state.coursesGraph ? '' : ' active-button'}`}>
              <div className="stat-display__value">
                {this.props.stats.as_instructor.user_count}
                <img src ="/assets/images/info.svg" alt = "tooltip default logo" />
              </div>
              <small>
                {I18n.t(`${this.props.stats.as_instructor.course_string_prefix}.students`)}
              </small>
              <div className="tooltip dark">
                <h4>
                  {this.props.stats.as_instructor.trained_percent}
                  %
                </h4>
                <p>
                  {I18n.t('users.up_to_date_with_training')}
                </p>
              </div>
            </div>
          </div>
          <div id="visualizations">
            {statsVisualizations}
          </div>
        </div>
        {byStudents}
        {asStudent}
      </div>
    );
  }
});

export default InstructorStats;
