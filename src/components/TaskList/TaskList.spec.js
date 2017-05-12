import React from 'react';
import { shallow } from 'enzyme';
import TaskList from './';
import Task from '../Task';
import noop from '../../utility/noop';

const defaultProps = {
  tasks: [
    { id: 'batmanId', title: 'Batman', text: 'The Dark Knight' },
    { id: 'supermanId', title: 'Superman', text: 'Wears red underwear' },
  ],
  onDeleteClick: noop,
};

it('should render one component per task', () => {
  const wrapper = shallow(
    <TaskList {...defaultProps} />
  );

  expect(wrapper.find(Task).length).toEqual(2);
  // snapshot test for each Task component
  for (let i = 0, sum = wrapper.find(Task).length; i < sum; i++) {
    expect(wrapper.find(Task).at(i)).toMatchSnapshot();
  }
});
