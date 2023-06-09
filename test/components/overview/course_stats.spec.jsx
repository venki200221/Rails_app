import { shallow } from 'enzyme';
import React from 'react';

import '../../testHelper';
import OverviewStats from '../../../app/assets/javascripts/components/overview/overview_stats.jsx';

describe('for view count zero and edited count greater than 0', () => {
  const course = {
    view_count: '0',
    edited_count: '1',
    upload_usages_count: 0,
    home_wiki: { language: 'en', project: 'wikipedia' }
  };
  const testStats = (
    <OverviewStats
      course={course}
    />
  );
  const msgString = I18n.t('metrics.view_data_unavailable');
  it('renders view data unavailable message', () => {
    const wrapper = shallow(testStats);
    expect(wrapper.contains(msgString)).toBeTruthy;
  });
});

describe('for view count greater than zero', () => {
  const course = {
    view_count: '3',
    upload_usages_count: 0,
    home_wiki: { language: 'en', project: 'wikipedia' }
  };
  const testStats = (
    <OverviewStats
      course={course}
    />
  );
  const msgString = I18n.t('metrics.view_data_unavailable');
  it('doesn\'t render view data unavailable message', () => {
    const wrapper = shallow(testStats);
    expect(wrapper.contains(msgString)).toBeFalsy;
  });
});
