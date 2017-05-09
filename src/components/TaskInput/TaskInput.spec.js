import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import noop from '../../utility/noop';
import TaskInput from './';

const defaultProps = {
  value: 'Learn Marko',
  onSubmit: noop,
  onChange: noop,
};

it('should render', () => {
  const wrapper = shallow(
    <TaskInput {...defaultProps} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should run callback when typing in textarea', () => {
  const cb = jest.fn();
  const wrapper = mount(
    <TaskInput
      {...defaultProps}
      onChange={cb}
    />
  );
  const textarea = wrapper.find('textarea');
  const newText = 'Learn more Marko';
  textarea.simulate('change', { target: { value: newText } });

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0].target.value).toEqual(newText);
});

it('should run callback when clicking on button', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <TaskInput
      {...defaultProps}
      onSubmit={cb}
    />
  );
  const button = wrapper.find('button');
  button.simulate('click');

  expect(cb).toHaveBeenCalledTimes(1);
});
