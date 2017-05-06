import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from './';
import noop from '../../utility/noop';

const defaultProps = {
  text: 'Play',
  onClick: noop,
};

it('should render', () => {
  const wrapper = shallow(
    <Button {...defaultProps} />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('should run callback on click', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <Button
      {...defaultProps}
      onClick={cb}
    />
  );
  const button = wrapper.find('button');
  button.simulate('click');

  expect(cb.mock.calls.length).toEqual(1);
});
