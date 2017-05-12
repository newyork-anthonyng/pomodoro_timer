import React from 'react';
import { mount } from 'enzyme';
import Title from './';

const defaultProps = {
  text: 'Pomodoro Timer',
};

it('should update the title of window', () => {
  const wrapper = mount(
    <Title {...defaultProps} />
  );

  const newTitle = 'New title';
  wrapper.setProps({ text: newTitle });

  expect(window.document.title).toEqual(newTitle);
});
