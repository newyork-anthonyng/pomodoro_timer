import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeDisplay from './';

const defaultProps = {
  timeInMs: 1500000, // 25 minutes
};

it('should render correctly', () => {
  const wrapper = shallow(
    <TimeDisplay {...defaultProps} />
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});


