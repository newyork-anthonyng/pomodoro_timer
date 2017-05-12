import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Task from './';
import noop from '../../utility/noop';

const defaultProps = {
  id: 'superSecretId',
  title: 'Task 1',
  text: 'Watch Netflix',
  onDeleteClick: noop,
};

it('should render', () => {
  const wrapper = shallow(
    <Task {...defaultProps} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should run callback when clicking on delete button', () => {
  const cb = jest.fn();
  const wrapper = mount(
    <Task
      {...defaultProps}
      onDeleteClick={cb}
    />
  );
  const button = wrapper.find('button');
  button.simulate('click');

  expect(cb.mock.calls.length).toEqual(1);
  expect(cb.mock.calls[0][0]).toEqual(defaultProps.id);
});
