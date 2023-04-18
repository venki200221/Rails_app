import 'testHelper';
import React from 'react';
import { shallow } from 'enzyme';
import CourseNavbar from 'components/common/course_navbar';

describe('CourseNavbar', () => {
  Features = { enableGetHelpButton: true };
  const currentUser = { role: 0 };
  const slug = '/courses/foo/bar_(baz)';

  describe('for ClassroomProgramCourse', () => {
    const course = {
      type: 'ClassroomProgramCourse',
      timeline_enabled: true,
      title: 'bar',
      url: 'https://example.com'
    };
    const component = (
      <CourseNavbar
        course={course}
        location={{ pathname: slug }}
        currentUser={currentUser}
        courseLink={slug}
      />
    );
    it('includes Timeline link', () => {
      expect(shallow(component).find('#timeline-link').length).toEqual(1);
    });
    it('includes correct Home link', () => {
      expect(shallow(component).find('NavLink').getElements()[0].props.to).toEqual(`${slug}/home`);
    });
  });

  describe('for BasicCourse without timeline enabled', () => {
    const course = {
      type: 'BasicCourse',
      timeline_enabled: false
    };
    const component = (
      <CourseNavbar
        course={course}
        location={{ pathname: slug }}
        currentUser={currentUser}
        courseLink={slug}
      />
    );
    it('does not include Timeline link', () => {
      expect(shallow(component).find('#timeline-link').length).toEqual(0);
    });
    it('includes correct Home link', () => {
      expect(shallow(component).find('NavLink').getElements()[0].props.to).toEqual(`${slug}/home`);
    });
  });
});
